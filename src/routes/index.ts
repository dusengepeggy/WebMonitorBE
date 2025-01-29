import authRouter from "./authRoute"
import userRouter from "./userRoutes"
import monitoringLogRoute from "./monitoringLog"
import notificationrouter from "./notificationRoute"
import websiterouter from "./websiteRoute" 

const express = require("express")

const route = express.Router()

route.use('/user',userRouter)
route.use('/auth',authRouter)
route.use('/logs',monitoringLogRoute)
route.use('/notification',notificationrouter)
route.use('/website',websiterouter)


export default route