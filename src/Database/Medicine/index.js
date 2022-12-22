import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medname: { type: String, required: true },
    desc: { type: String, required: true },
    expiry: { type: String, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("medicines", medicineSchema)