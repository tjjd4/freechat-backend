import express from 'express';
import { getUserInfoById, getFriendPairsById } from '../services/useUser.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const userInfo = await getUserInfoById(req.session.user.userId);
  if (userInfo) {
    res.status(200).json({
      success: true,
      message: 'found.',
      data: userInfo,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'User not found!',
    });
  }
});

router.get('/friends', async (req, res) => {
  const friendPairs = await getFriendPairsById(req.session.user.userId);

  res.status(200).json({
    success: true,
    message: 'found.',
    data: friendPairs,
  });
});

export default router;