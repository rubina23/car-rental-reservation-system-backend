import { TUser } from './user.interface';
import { User } from './user.model';

const signupUserintoDB = async (user: TUser) => {
  // const result = await User.create;
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  signupUserintoDB,
};
