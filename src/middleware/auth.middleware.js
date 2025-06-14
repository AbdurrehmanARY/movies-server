import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";

export const isAuth = async (req, res, next) => {
  try {
   
    const token = req.cookies.token;
     res.json({
      message: "You are in work",
      token
    })
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};