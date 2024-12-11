var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.post("/login", function (req, res) {
  const { username, password } = req.body;

  const user = {
    username: username,
  };

  if (username === "sss" && password === "bbb") {
    req.session.user = { username: username };
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

router.get("/is_login", function (req, res) {
  if (req.session.user) {
    const user = req.session.user;
    res.status(200).json({
      success: true,
      message: "Logged In",
      user,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Not logged in",
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // 清除會話 Cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
});

module.exports = router;
