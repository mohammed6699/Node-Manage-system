import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/:id", verifyToken,getUserById);
userRouter.patch("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);

export default userRouter;
