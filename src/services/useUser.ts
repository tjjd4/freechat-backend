import User from '../db/models/user';
import FriendPair from '../db/models/friendPair';

export const checkLoginInfo = async (username: string, password: string): Promise<User | null> => {
  return await User.findOne({ where: { username: username, password: password } });
};

export const getUserInfoById = async (userId: number) => {
  return await User.findOne({ where: { id: userId }});
};

export const getFriendPairsById = async (userId: number) => {
  return await FriendPair.findAll({ where: { user_id: userId }});
};