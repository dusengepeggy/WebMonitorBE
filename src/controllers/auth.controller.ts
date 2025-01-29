import { Request, Response } from "express";
import UserService from "../repository/user";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const loginUser: (req: Request, res: Response) => Promise<Response> = async (req, res) => {
    try {
        const { email, password }: { email: string; password: string } = req.body;

        const user = await UserService.getUserBEmail(email);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }


        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET ,
            { expiresIn: "48h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
