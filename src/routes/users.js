import express from 'express';
import { getUserInfoById } from '../services/useUser.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const userInfo = await getUserInfoById(req.session.user.userId);
  if (userInfo) {
    res.status(200).json({
      success: true,
      message: 'found.',
      user: userInfo,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'User not found!',
    });
  }
});

export default router;