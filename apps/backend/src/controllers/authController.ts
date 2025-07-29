import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });
    
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, username, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      success: true,
      token, 
      user: { id: user.id, username: user.username, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ 
      success: true,
      token, 
      user: { id: user.id, username: user.username, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
