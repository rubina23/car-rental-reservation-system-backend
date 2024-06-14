import { TUser } from './user.interface';
import { User } from './user.model';

const createUserintoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  createUserintoDB,
};
