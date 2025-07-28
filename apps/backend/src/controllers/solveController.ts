import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const prisma = new PrismaClient();

export const addSolve = async (req: AuthenticatedRequest, res: Response) => {
  const { time, scramble, penalty } = req.body;
  const userId = (req as any).user.userId;

  try {
    const solve = await prisma.solve.create({
      data: {
        time,
        scramble,
        penalty,
        userId,
      },
    });
    res.status(201).json(solve);
  } catch (err) {
    res.status(500).json({ message: 'Error adding solve' });
  }
};

export const getSolves = async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const solves = await prisma.solve.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(solves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching solves' });
  }
};

export const deleteSolve = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.userId;

  try {
    // First check if the solve exists and belongs to the user
    const solve = await prisma.solve.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!solve) {
      return res.status(404).json({ message: 'Solve not found or you do not have permission to delete it' });
    }

    await prisma.solve.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: 'Solve deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting solve' });
  }
};
