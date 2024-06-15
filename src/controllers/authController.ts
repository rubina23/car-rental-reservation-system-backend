import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6),
  phone: z.string(),
  address: z.string(),
});

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, role, password, phone, address } = signupSchema.parse(
      req.body,
    );
    const user = new User({ name, email, role, password, phone, address });
    await user.save();
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = signinSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.send({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
