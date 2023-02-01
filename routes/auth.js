const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//register endpoint
router.post("/register", async (req, res) => {
  const confirm = await User.findOne({
    email: req.body.email,
  });
  if (confirm) {
    return res.status(400).json("this email exist");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ eamil: req.body.email });
    if (!user) {
      return res.status(400).json("wrong user");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json("wrong password");
    }

    const token = crypto.randomBytes(24).toString("hex");
    user.token = token;
    user.save();

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
