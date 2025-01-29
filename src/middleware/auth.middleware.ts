import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        
        const secretKey = process.env.JWT_SECRET ;
        const decoded = jwt.verify(token, secretKey);

    
        if (!decoded){
            return res.status(404).json({
                message: "Access denied. Invalid token.",
            }); 
        }
          
        next();
    } catch (error: any) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};
