const User = require("./models/User.js");

async function authMiddle(req, res, next) {
  const { token } = req.body;
  if (token === undefined || token === null) {
    res.status(401).json({ message: "Invalid or missing token" });
  } else {
    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      return res.status(400).json("wrong user");
    }
    req.body.user = user;
    next();
  }
}

module.exports = authMiddle;
