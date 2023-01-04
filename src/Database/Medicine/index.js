import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medname: { type: String, required: true },
    donor: { type: String, required: true },
    desc: { type: String, required: true },
    expiry: { type: String, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
})

export const MedicineModel = mongoose.model("medicines", medicineSchema)