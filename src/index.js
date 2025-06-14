import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from "express";
const app = express()
dotenv.config()
const corsOptions = {
  // origin: process.env.FRONTEND_URL, // Allow only this origin
  origin: process.env.FRONTEND_URL, // Allow only this origin
 
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// app.listen(process.env.PORT, () => {

//   console.log(`Server is starting on http://localhost:${process.env.PORT}`);
// });

import authRoute from './route/auth.route.js'
import moviesRoute from "./route/movies.route.js"
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/movies",moviesRoute)


app.get('/', (req,res) => {
  
res.send('working fine')
});

export default app;