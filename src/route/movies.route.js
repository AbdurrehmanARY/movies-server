import express from "express";
import { addMovie, editMovie, fetchAllMovies, handleImageUpload } from "../controller/movies.controller.js";
import {upload} from '../middleware/multer.middleware.js'
const router = express.Router();
 
router.post("/upload", upload.single("movieImage"),handleImageUpload)
router.post("/add",addMovie)
router.put("/edit/:id",editMovie)
router.get("/all-movies",fetchAllMovies)



export default router