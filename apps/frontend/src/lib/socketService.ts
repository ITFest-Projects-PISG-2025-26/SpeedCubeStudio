import io, { Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  connect(token: string) {
    this.token = token;
    
    if (this.socket?.connected) {
      this.socket.disconnect();
    }

    this.socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000', {
      auth: {
        token: token
      },
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Room events
  joinRoom(roomCode: string) {
    this.socket?.emit('join-room', roomCode);
  }

  leaveRoom(roomCode: string) {
    this.socket?.emit('leave-room', roomCode);
  }

  toggleReady(roomCode: string) {
    this.socket?.emit('toggle-ready', roomCode);
  }

  submitTime(roomCode: string, time: number, penalty?: string) {
    this.socket?.emit('submit-time', { roomCode, time, penalty });
  }

  // Event listeners
  onRoomJoined(callback: (data: any) => void) {
    this.socket?.on('room-joined', callback);
  }

  onParticipantJoined(callback: (data: any) => void) {
    this.socket?.on('participant-joined', callback);
  }

  onParticipantLeft(callback: (data: any) => void) {
    this.socket?.on('participant-left', callback);
  }

  onParticipantReadyChanged(callback: (data: any) => void) {
    this.socket?.on('participant-ready-changed', callback);
  }

  onMatchStarting(callback: (data: any) => void) {
    this.socket?.on('match-starting', callback);
  }

  onMatchStarted(callback: () => void) {
    this.socket?.on('match-started', callback);
  }

  onParticipantFinished(callback: (data: any) => void) {
    this.socket?.on('participant-finished', callback);
  }

  onMatchEnded(callback: (data: any) => void) {
    this.socket?.on('match-ended', callback);
  }

  // Remove event listeners
  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }
}

export const socketService = new SocketService();
