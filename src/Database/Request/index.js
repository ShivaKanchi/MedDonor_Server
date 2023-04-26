import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    request: { type: String, required: true },
    desc: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" }
}, {
    timestamps: true
})

export const RequestModel = mongoose.model("requests", RequestSchema)