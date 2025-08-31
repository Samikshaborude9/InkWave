import mongoose, {Schema, Document} from "mongoose";

export interface Iuser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

//User schema
const UserSchema: Schema = new Schema<Iuser>(
    {
        username:{
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true,"Email is required"],
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: [true , "Password is required"],
            minlength: 6,
        },
    },
    {timestamps: true} //automatically adds the createdAt and updatedAt
);

export const User = mongoose.model<Iuser>("User", UserSchema);
