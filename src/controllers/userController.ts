import { User } from "../entitys/user";
import { Request, Response } from "express";
import { AppDataSource } from "../configs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);
class userControllers {
    static async Signup(req: Request, res: Response) {
        try {
            const { firstname, lastname, email, password} = req.body;
            if (!firstname || !lastname || !email || !password ) {
                return res.status(400).json({ message: "Please add all fields" });
            }
            const checkUser = await userRepository.findOneBy({ email });
            if (checkUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userRepository.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });
            await userRepository.save(newUser);
            return res.status(200).json({ message: "User created successfully", newUser });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
    static async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please add all fields" });
            }
            const user = await userRepository.findOneBy({email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user.id, email:user.email,password:user.password }, "secret", { expiresIn: "1d" });
            return res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        } 
    }
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await userRepository.find({ relations: ["profile"] });
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
}
export default userControllers