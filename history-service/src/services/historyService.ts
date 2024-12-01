import { PrismaClient, InventoryHistory, ActionType, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface HistoryQuery {
  productId?: string;
  startDate?: Date;
  endDate?: Date;
}

class HistoryService {
  async getHistory(query: HistoryQuery): Promise<InventoryHistory[]> {
    const where: any = {};
    
    if (query.productId) {
      where.productId = query.productId;
    }
    
    if (query.startDate || query.endDate) {
      where.timestamp = {};
      if (query.startDate) where.timestamp.gte = query.startDate;
      if (query.endDate) where.timestamp.lte = query.endDate;
    }

    return prisma.inventoryHistory.findMany({
      where,
      orderBy: {
        timestamp: 'desc'
      }
    });
  }

  async createEntry(data: {
    productId: string;
    action: ActionType;
    quantity: number;
    location: string;
    oldValue?: Prisma.InputJsonValue | null;
    newValue?: Prisma.InputJsonValue | null;
    userId?: string;

  }): Promise<InventoryHistory> {
    return prisma.inventoryHistory.create({
      data: {
        ...data,
        oldValue: data.oldValue ?? Prisma.DbNull, // Handle null explicitly
        newValue: data.newValue ?? Prisma.DbNull, // Handle null explicitly
      },
    });
  }
}

export default new HistoryService();
