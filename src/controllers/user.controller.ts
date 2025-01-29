import {Request,Response} from "express"
import UserService from "../repository/user"
const bcrypt = require("bcryptjs")

export const createUser : (req: Request, res: Response) => Promise<Response> = async (req, res) =>{
    try {
        const {email,password}:{email:string,password:string} = req.body
        const alreadyExist = await UserService.getUserBEmail(email)
        if (alreadyExist){
            return res.status(401).json({
                message:"User already exist",
            })
        }
        const userName = email.split("@")[0]
        const newPassword = await bcrypt.hashSync(password, 16)
        const newUser = await UserService.createUser(email,newPassword,userName)
        return res.status(200).json({
            message:"User created successfully",
            user:newUser
        })
        
    } catch (error:any) {
       return res.status(500).json({
            message:error.message
       })
    }

}


