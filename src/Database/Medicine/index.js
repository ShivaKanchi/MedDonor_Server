import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medname: { type: String, required: true },
    category: { type: String },
    desc: { type: String, required: true },
    donor: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    expiry: { type: String, required: true },
    comment: { type: mongoose.Types.ObjectId, ref: "comments" }
}, {
    timestamps: true
})

export const MedicineModel = mongoose.model("medicines", medicineSchema)