import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    cmt: { type: String, required: true },
    cmtby: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    cmtfor: { type: mongoose.Types.ObjectId, ref: "medicines", required: true },
    verfied: { type: Boolean, default: false },
    likes: [{
        type: mongoose.Types.ObjectId, ref: "users"
    }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "users" }]
}, {
    timestamps: true
})

export const CommentModel = mongoose.model("comments", CommentSchema)