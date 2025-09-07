import type { Request, Response } from "express";
import { User } from "../models/user.js";

// Get user profile
export const getUserProfile = async (req: Request, res:Response) =>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch(err){
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Update user profile
export const updateUserProfile = async(req: Request, res: Response) =>{
    try{
        const {bio , avatar} = req.body;
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if( bio != undefined) user.bio = bio;
        if( avatar != undefined) user.avatar = avatar;

        await user.save();
        res.json({message: "Profile updated successfully", user});

    }catch (err){
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Follow a user
export const followUser = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user.id; // from authMiddleware
    const targetUserId = req.params.id as string;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetUserId);
      await targetUser.save();
      await currentUser.save();
    }

    res.json({ message: "User followed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Unfollow a user
export const unfollowUser = async(req: Request, res: Response) =>{
    try{
        const currentUserId = (req as any).user.id; // from authMiddleware
        const targetUserId = req.params.id ; 

        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(currentUserId);

        if(!targetUser || !currentUser){
            return res.status(404).json({message: "User not found"});
        }
        targetUser.followers = targetUser.followers.filter(
          followerId => followerId.toString() !== currentUserId); 
        
        currentUser.following = currentUser.following.filter(
          followingId => followingId.toString() !== targetUserId
        );
        await targetUser.save();
        await currentUser.save();
        res.json({message: "User unfollowed succesfully"})  
    }catch(err){
      res.status(500).json({ error: "Something went wrong" });
    }
};
