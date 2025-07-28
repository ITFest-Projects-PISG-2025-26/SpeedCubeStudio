import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import solveRoutes from './routes/solveRoutes';
import statsRoutes from './routes/statsRoutes';
import roomRoutes from './routes/roomRoutes';
import { initializeSocketHandlers } from './socket/socketHandlers';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(logger);

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/solve', solveRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/rooms', roomRoutes);

app.use(errorHandler);

// Initialize socket handlers
initializeSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


