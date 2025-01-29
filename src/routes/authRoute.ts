import express from "express";
import { loginUser } from "../controllers/auth.controller";


const authRouter = express.Router()

authRouter.post("/signin",loginUser)



export default authRouter