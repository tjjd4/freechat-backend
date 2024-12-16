import db from '../db/models/index.js';

export const checkLoginInfo = async (username: string, password: string) => {
  return await db.User.findOne({ where: { username: username, password: password } });
};

export const getUserInfoById = async (userId: number) => {
  return await db.User.findOne({ where: { id: userId }});
};

export const getFriendPairsById = async (userId: number) => {
  return await db.FriendPair.findAll({ where: { user_id: userId }});
};