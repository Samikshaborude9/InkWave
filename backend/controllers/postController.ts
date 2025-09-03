import type { Request , Response } from "express";
import { Post } from "../models/post.js";

//create new post
export const createPost = async (req: Request, res: Response ) => {
    try{
        const { title , content } = req.body;
        const userId = (req as any).user.id; //from authMiddleware
        const newPost = new Post({
            title,
            content,
            author: userId,
        });

        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).json({error : "something went wrong"});
    }
};

// Get all posts
export const getPosts = async (_req: Request, res: Response) => {
    try{
        const posts = await Post.find().populate("author", "username email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error : "Something went wrong"});
    }

};

//get one post
export const getPost = async (req: Request, res: Response) => {
    try{
        const post = await Post.findById(req.params.id).populate("author", "username email");
        if(!post) return res.status(404).json({message: "Post not found"});
        res.json(post);
    }
    catch (err) {
        res.status(500).json({error: "Something went wrong"});
    }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // only author can edit
    const userId = (req as any).user.id;
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = (req as any).user.id;
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
