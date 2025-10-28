import type { Request, Response } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";

// Get posts from people the logged-in user follows
export const getFollowingFeed = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all posts from users the current user follows
    const posts = await Post.find({ user: { $in: user.following } })
      .populate("user", "username avatar bio")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err: any) {
    console.error("Error fetching following feed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
