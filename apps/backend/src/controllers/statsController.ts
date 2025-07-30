import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateStats } from '../utils/stats';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const prisma = new PrismaClient();

type Solve = {
  id: string;
  time: number;
  penalty: string | null;
  scramble: string;
  userId: string;
  createdAt: Date;
};

export const getStats = async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const solves = await prisma.solve.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const stats = calculateStats(solves.map((s: Solve) => s.time));
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error calculating stats' });
  }
};
