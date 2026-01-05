import { type Request, type Response } from "express";
import { createUser, loginUser } from "../services/authService.js";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "please fill out the required fields" });
    }
    const user = await createUser({ fullName, userName, email, password });
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
    if (password !== user.password) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    res.status(200).json({ message: "login succesful", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
