import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    // const user = req.body;
    const { user: userData } = req.body;

    const result = await UserServices.createUserintoDB(userData);
    // console.log(userData);
    // console.log(result);

    res.status(200).json({
      sucess: true,
      message: 'User is created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
};
