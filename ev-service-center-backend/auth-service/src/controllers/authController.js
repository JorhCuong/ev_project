import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import RefreshToken from "../models/refreshToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = await RefreshToken.create({
      token: jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" }),
      userId: user.id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({ token, refreshToken: refreshToken.token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

  const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });

  if (storedToken.expiryDate < new Date()) {
    await storedToken.destroy();
    return res.status(403).json({ message: "Refresh token expired" });
  }

  const newAccessToken = jwt.sign({ id: storedToken.userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token: newAccessToken });
};
