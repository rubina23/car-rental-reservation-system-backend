import { Request, Response } from 'express';
import { UserServices } from './user.service';

const signupUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.signupUserintoDB(user);
  console.log(result);
};

// const signupUser = async (req: Request, res: Response) => {
//   try {
//     const user = req.body;
//     // const { user: userData } = req.body;

//     const result = await UserServices.signupUserintoDB(user);
//     console.log(result);
//     // const result = await UserServices.signupUserintoDB(userData);
//     // console.log(userData);
//     // console.log(result);

//     res.status(200).json({
//       sucess: true,
//       message: 'User is created successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const UserControllers = {
  signupUser,
};
