import express from 'express';
import { checkLoginInfo } from '../services/useUser.js';

const router = express.Router();

/* GET home page. */
// router.get("/", (req, res, next) => {
//   res.render("index", { title: "Express" });
// });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await checkLoginInfo(username, password);
  if (user) {
    req.session.user = { userId: user.id, name: user.name };
    console.log(req.session.user);
    res.status(200).json({
      success: true,
      message: 'Login successful',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid username or password',
    });
  }
});

router.get('/is_login', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    res.status(200).json({
      success: true,
      message: 'Logged In',
      data: user.name,
    });
  } else {
    res.status(200).json({
      success: false,
      message: 'Not logged in',
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // 清除登入 Cookie
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
});

export default router;
