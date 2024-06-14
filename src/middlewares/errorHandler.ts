import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: err.message,
    errorMessages: err.errorMessages || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
