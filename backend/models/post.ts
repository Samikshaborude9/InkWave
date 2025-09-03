import mongoose, {Document, Schema} from "mongoose";

//Interface for post
export interface IPost extends Document{
    user: mongoose.Types.ObjectId; // reference to user
    title: string;
    content: string;
    tags?: string[];
    author: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}

//schema

const postSchema = new Schema<IPost>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true}
);

export const Post = mongoose.model<IPost>("Post",postSchema);
