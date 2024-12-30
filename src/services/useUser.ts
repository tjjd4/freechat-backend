import User from '../orm/entity/user.entity';
import Friend from '../orm/entity/friend.entity';
import { AppDataSource } from '../orm/data-source';



export const checkLoginInfo = async (username: string, password: string): Promise<User | null> => {
  return await AppDataSource.manager.findOneBy(User, { username: username, password: password });
};

export const getUserInfoById = async (userId: number) => {
  return await AppDataSource.manager.findOneBy(User, { id: userId });
};

export const getFriendPairsById = async (userId: number) => {
  return await AppDataSource.manager.findBy(Friend, { userId: userId });
};