import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  followers: (mongoose.Types.ObjectId | string)[];
  following: (mongoose.Types.ObjectId | string)[];
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String, // store image URL
      default: "",
    },
    followers: [
      {
        type: String,
        ref: "User",
      },
    ],
    following: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
