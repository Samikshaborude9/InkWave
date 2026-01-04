import type { Request, Response } from "express";
import { Comment } from "../models/comment.js"
import { Post } from "../models/post.js";

export const createComment = async(req: Request, res: Response) => {
    try{
        const {content} = req.body;
        const UserId = (req as any).user.id; // from authMiddleware
        const postId = req.params.postId;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        const newComment = new Comment({
            content,
            author: UserId,
            post: postId,
        });

        await newComment.save();
        res.status(201).json({message: "Comment created successfully", comment: newComment});
    }catch (err){
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const getCommentsForPost = async(req: Request, res: Response) => {
    try{
        const comments = await Comment.find({ post : req.params.postId}).populate("author", "username avatar").sort({ createdAt: -1});
        res.json(comments);
    }catch (err){
        res.status(500).json({ error: "Something went wrong" });
    }
}

//delet comment
export const deleteComment = async(req: Request ,res:Response) =>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }

        //only comment auther can delete
        if (comment.author.toString() !== (req as any).user.id.toString()){
            return res.status(403).json({message: "You are not authorized to delete this comment"});
        }

        await comment.deleteOne();
        res.json({message: "Comment deleted Successfully"});
} catch(err){
    res.status(500).json({error: "Something went wrong"})

}
}
