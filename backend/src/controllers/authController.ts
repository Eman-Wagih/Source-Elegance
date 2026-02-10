import { type Request, type Response } from "express";
import { createUser, loginUser } from "../services/authService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const addUser = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, email, password, type } = req.body;
    if (!fullName || !userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "please fill out the required fields" });
    }
    const user = await createUser({
      fullName,
      userName,
      email,
      password,
      type,
    });
    res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "23505") {
      // unique violation
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }
    const user = await loginUser(identifier);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.type },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      },
    );
    res.status(200).json({ message: "login succesful", user, token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
