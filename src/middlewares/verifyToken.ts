import jwt from "jsonwebtoken";
import { Response, Request } from "express";
// import dotenv 

export const verifyToken = (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: "Unauthorizeds" });
        }

        const decoded = jwt.verify(token, "secret");
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
