import db from '../db/models/index.js';

export const checkLoginInfo = async (username, password) => {
  return await db.User.findOne({ where: { username: username, password: password } });
};

export const getUserInfoById = async (userId) => {
    return await db.User.findOne({ where: { id: userId }});
}