import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register new user
export const register = async (req: Request, res: Response) => {
    try{
        const {username , email , password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        res.status(201).json({message: "User registed succesfully"});
    }
    catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) =>{
    try{
        const { email, password }= req.body;

        const user = await User.findOne({ email });
        console.log("User from DB:", user); // Add this
        if(!user) return res.status(400).json({ message : "Invalid credentials"});

        console.log("Password from request:", password); // Add this
        console.log("Password from DB:", user.password); // Add this

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1h"});

        res.json({token, user: {id: user._id, username: user.username , email: user.email}});
    } catch (err: any) {
        console.error("Login error:", err.message, err.stack); // Add this
        res.status(500).json({error: err.message});
    }
};
