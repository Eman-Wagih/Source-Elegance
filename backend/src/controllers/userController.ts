import { type Request, type Response } from "express";
import { createUser } from "../services/userService.js";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "please fill out the required fields" });
    }

    const user = await createUser({ firstName, lastName, email, password });
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
