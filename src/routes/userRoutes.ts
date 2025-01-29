import express from "express";
import {createUser} from "../controllers/user.controller";


const userRouter = express.Router()

userRouter.post("/signup",createUser)



export default userRouter