import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// Create a new room
router.post('/create', authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = (req as any).user.userId;

    // Generate unique 6-digit room code
    let roomCode: string;
    let isUnique = false;
    
    while (!isUnique) {
      roomCode = Math.floor(100000 + Math.random() * 900000).toString();
      const existingRoom = await prisma.room.findUnique({
        where: { code: roomCode }
      });
      if (!existingRoom) {
        isUnique = true;
      }
    }

    const room = await prisma.room.create({
      data: {
        name,
        code: roomCode!,
        ownerId: userId,
        members: {
          connect: { id: userId }
        }
      },
      include: {
        owner: {
          select: { id: true, username: true, name: true }
        },
        members: {
          select: { id: true, username: true, name: true }
        }
      }
    });

    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create room'
    });
  }
});

// Join room by code
router.post('/join', authenticate, async (req, res) => {
  try {
    const { code } = req.body;
    const userId = (req as any).user.userId;

    const room = await prisma.room.findUnique({
      where: { code },
      include: {
        owner: {
          select: { id: true, username: true, name: true }
        },
        members: {
          select: { id: true, username: true, name: true }
        }
      }
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (!room.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Room is not active'
      });
    }

    if (room.members.length >= room.maxMembers) {
      return res.status(400).json({
        success: false,
        message: 'Room is full'
      });
    }

    // Check if user is already a member
    const isMember = room.members.some((member: { id: string; username: string; name: string }) => member.id === userId);
    
    if (!isMember) {
      await prisma.room.update({
        where: { id: room.id },
        data: {
          members: {
            connect: { id: userId }
          }
        }
      });
    }

    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Join room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to join room'
    });
  }
});

// Get user's rooms
router.get('/my-rooms', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const rooms = await prisma.room.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } }
        ]
      },
      include: {
        owner: {
          select: { id: true, username: true, name: true }
        },
        members: {
          select: { id: true, username: true, name: true }
        },
        _count: {
          select: { matches: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      rooms
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get rooms'
    });
  }
});

// Get room details
router.get('/:code', authenticate, async (req, res) => {
  try {
    const { code } = req.params;

    const room = await prisma.room.findUnique({
      where: { code },
      include: {
        owner: {
          select: { id: true, username: true, name: true }
        },
        members: {
          select: { id: true, username: true, name: true }
        },
        matches: {
          include: {
            solves: {
              include: {
                user: {
                  select: { id: true, username: true, name: true }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Get room details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get room details'
    });
  }
});

// Delete room (owner only)
router.delete('/:code', authenticate, async (req, res) => {
  try {
    const { code } = req.params;
    const userId = (req as any).user.userId;

    const room = await prisma.room.findUnique({
      where: { code }
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (room.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only room owner can delete the room'
      });
    }

    await prisma.room.update({
      where: { id: room.id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete room'
    });
  }
});

export default router;
