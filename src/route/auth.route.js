import express from "express";
import { loginUser, logoutUser, myProfile, registerUser } from "../controller/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/my-profile", isAuth, myProfile);
router.post("/logout", logoutUser);

export default router;