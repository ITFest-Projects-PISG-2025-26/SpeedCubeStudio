import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

interface RoomData {
  id: string;
  participants: Map<string, { userId: string; username: string; ready: boolean; time?: number }>;
  currentMatch?: {
    id: string;
    scramble: string;
    startTime?: number;
    status: 'waiting' | 'preparing' | 'started' | 'finished';
  };
}

const rooms = new Map<string, RoomData>();

export const initializeSocketHandlers = (io: Server) => {
  // Authentication middleware for socket connections
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, username: true }
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user.id;
      socket.username = user.username;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.username} connected`);

    // Join room
    socket.on('join-room', async (roomCode: string) => {
      try {
        const room = await prisma.room.findUnique({
          where: { code: roomCode },
          include: { members: true, owner: true }
        });

        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        if (!room.isActive) {
          socket.emit('error', { message: 'Room is not active' });
          return;
        }

        // Add user to room members if not already
        await prisma.room.update({
          where: { id: room.id },
          data: {
            members: {
              connect: { id: socket.userId }
            }
          }
        });

        socket.join(roomCode);

        // Initialize room data if not exists
        if (!rooms.has(room.id)) {
          rooms.set(room.id, {
            id: room.id,
            participants: new Map()
          });
        }

        const roomData = rooms.get(room.id)!;
        roomData.participants.set(socket.userId!, {
          userId: socket.userId!,
          username: socket.username!,
          ready: false
        });

        // Notify room about new participant
        io.to(roomCode).emit('participant-joined', {
          userId: socket.userId,
          username: socket.username,
          participants: Array.from(roomData.participants.values())
        });

        socket.emit('room-joined', {
          room: {
            id: room.id,
            name: room.name,
            code: room.code,
            owner: room.owner
          },
          participants: Array.from(roomData.participants.values()),
          currentMatch: roomData.currentMatch
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Ready/Unready for match
    socket.on('toggle-ready', (roomCode: string) => {
      const roomData = Array.from(rooms.values()).find(r => 
        r.participants.has(socket.userId!)
      );

      if (roomData) {
        const participant = roomData.participants.get(socket.userId!);
        if (participant) {
          participant.ready = !participant.ready;
          io.to(roomCode).emit('participant-ready-changed', {
            userId: socket.userId,
            ready: participant.ready,
            participants: Array.from(roomData.participants.values())
          });

          // Check if all participants are ready
          const allReady = Array.from(roomData.participants.values()).every(p => p.ready);
          if (allReady && roomData.participants.size >= 2) {
            startMatch(roomCode, roomData);
          }
        }
      }
    });

    // Submit solve time
    socket.on('submit-time', async (data: { roomCode: string; time: number; penalty?: string }) => {
      try {
        const roomData = Array.from(rooms.values()).find(r => 
          r.participants.has(socket.userId!)
        );

        if (roomData && roomData.currentMatch) {
          const participant = roomData.participants.get(socket.userId!);
          if (participant) {
            participant.time = data.time;

            // Save solve to database
            await prisma.solve.create({
              data: {
                time: data.time,
                penalty: data.penalty,
                scramble: roomData.currentMatch.scramble,
                userId: socket.userId!,
                matchId: roomData.currentMatch.id
              }
            });

            io.to(data.roomCode).emit('participant-finished', {
              userId: socket.userId,
              username: socket.username,
              time: data.time,
              penalty: data.penalty
            });

            // Check if all participants finished
            const allFinished = Array.from(roomData.participants.values()).every(p => p.time !== undefined);
            if (allFinished) {
              endMatch(data.roomCode, roomData);
            }
          }
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to submit time' });
      }
    });

    // Leave room
    socket.on('leave-room', (roomCode: string) => {
      socket.leave(roomCode);
      const roomData = Array.from(rooms.values()).find(r => 
        r.participants.has(socket.userId!)
      );

      if (roomData) {
        roomData.participants.delete(socket.userId!);
        io.to(roomCode).emit('participant-left', {
          userId: socket.userId,
          participants: Array.from(roomData.participants.values())
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.username} disconnected`);
      // Clean up user from all rooms
      rooms.forEach((roomData, roomId) => {
        if (roomData.participants.has(socket.userId!)) {
          roomData.participants.delete(socket.userId!);
          io.emit('participant-left', {
            userId: socket.userId,
            participants: Array.from(roomData.participants.values())
          });
        }
      });
    });
  });

  const startMatch = async (roomCode: string, roomData: RoomData) => {
    try {
      // Generate scramble (simplified - you can use a more sophisticated scramble generator)
      const scramble = generateScramble();
      
      // Create match in database
      const match = await prisma.match.create({
        data: {
          roomId: roomData.id,
          scramble,
          status: 'PREPARING',
          participants: {
            connect: Array.from(roomData.participants.keys()).map(userId => ({ id: userId }))
          }
        }
      });

      roomData.currentMatch = {
        id: match.id,
        scramble,
        status: 'preparing'
      };

      // Reset participant states
      roomData.participants.forEach(participant => {
        participant.ready = false;
        participant.time = undefined;
      });

      // Notify all participants
      io.to(roomCode).emit('match-starting', {
        scramble,
        matchId: match.id
      });

      // Start countdown
      setTimeout(() => {
        if (roomData.currentMatch) {
          roomData.currentMatch.status = 'started';
          roomData.currentMatch.startTime = Date.now();
          io.to(roomCode).emit('match-started');
        }
      }, 15000); // 15 second inspection time
    } catch (error) {
      io.to(roomCode).emit('error', { message: 'Failed to start match' });
    }
  };

  const endMatch = async (roomCode: string, roomData: RoomData) => {
    if (roomData.currentMatch) {
      const results = Array.from(roomData.participants.values())
        .filter(p => p.time !== undefined)
        .sort((a, b) => a.time! - b.time!);

      // Update match in database
      await prisma.match.update({
        where: { id: roomData.currentMatch.id },
        data: {
          status: 'FINISHED',
          endedAt: new Date()
        }
      });

      io.to(roomCode).emit('match-ended', {
        results,
        matchId: roomData.currentMatch.id
      });

      roomData.currentMatch = undefined;
    }
  };
};

const generateScramble = (): string => {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  const scramble = [];
  
  for (let i = 0; i < 20; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + modifier);
  }
  
  return scramble.join(' ');
};
