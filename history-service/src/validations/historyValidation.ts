import { z } from 'zod';
import { ActionType } from '@prisma/client';

// Convert enum to union type for Zod
const actionTypes = Object.values(ActionType) as [string, ...string[]];

export const createHistorySchema = z.object({
  productId: z.string().uuid({
    message: 'Product ID must be a valid UUID',
  }),
  action: z.enum(actionTypes, {
    errorMap: () => ({ message: 'Invalid action type' }),
  }),
  quantity: z.number().int().min(0, {
    message: 'Quantity must be a non-negative integer',
  }),
  location: z.string().min(1, {
    message: 'Location is required',
  }),
  oldValue: z.any().nullable().optional(),
  newValue: z.any().nullable().optional(),
  userId: z.string().optional(),
});

export const getHistoryQuerySchema = z.object({
  productId: z.string().uuid().optional(),
  startDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Start date must be a valid date string',
    })
    .transform((date) => new Date(date))
    .optional(),
  endDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'End date must be a valid date string',
    })
    .transform((date) => new Date(date))
    .optional(),
});
