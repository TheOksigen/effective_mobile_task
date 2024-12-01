import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import historyService from '../services/historyService';

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { productId, startDate, endDate } = req.query;
    const history = await historyService.getHistory({
      productId: productId as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

export const createHistoryEntry = async (req: Request, res: Response) => {
  try {
    const entry = await historyService.createEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create history entry' });
  }
};
