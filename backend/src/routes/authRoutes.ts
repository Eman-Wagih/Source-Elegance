import { Router } from "express";
import { addUser, login } from "../controllers/authController.js";

const router = Router();

router.post("/users", addUser);
router.post("/login", login);

export default router;
