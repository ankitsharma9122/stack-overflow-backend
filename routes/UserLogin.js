const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/auth");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(404).json({
        message: "User doesn't exists",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, User.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email: User.email,
        id: User._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      result: User,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const student = await UserModel.findOne({
      email,
    });
    if (student) {
      return res.status(401).json({ message: "Account already exits !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      result: newUser,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
