import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// Extend Express Request type
declare module 'express' {
  interface Request {
    validatedData?: any;
  }
}

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      
      // Add validated data to request
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
