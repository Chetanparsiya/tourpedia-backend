import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User Doesn't Exists" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid Credential" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "15m",
    });
    return res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(err);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "15m",
    });
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(err);
  }
};
