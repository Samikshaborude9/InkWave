import mongoose, {Document, Schema} from "mongoose";

export interface IList extends Document {
    name: string;
    owner: mongoose.Types.ObjectId;
    postIds: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const ListSchema = new Schema<IList>({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postIds: [{ type: Schema.Types.ObjectId, ref: "Post" }],
},{
    timestamps: { createdAt: "createdAt", updatedAt: false },
});

export const List = mongoose.model<IList>("List", ListSchema);