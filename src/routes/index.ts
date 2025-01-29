import authRouter from "./authRoute"
import userRouter from "./userRoutes"

const express = require("express")

const route = express.Router()

route.use('/user',userRouter)
route.use('/auth',authRouter)

export default route