import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    // req.user = user;
    // next();
  } catch (error) {
    res.status(401).send({ success: false, message: 'Please authenticate.' });
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res
    .status(403)
    .send({ success: false, message: 'Access forbidden: Admins only.' });

  // if (req.user?.role !== 'admin') {
  //   return res
  //     .status(403)
  //     .send({ success: false, message: 'Access forbidden: Admins only.' });
  // }
  next();
};
