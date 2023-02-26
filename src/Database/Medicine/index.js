import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medname: { type: String, required: true },
    medimage: { type: String, required: true },
    category: { type: String },
    desc: { type: String, required: true },
    donor: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    donorname: { type: String },
    donorimage: { type: String },
    expiry: { type: String, required: true },
    quantity: { type: String, required: true },
    address: { type: String, required: true },
    donatedmedical: { type: mongoose.Types.ObjectId, ref: "medicals" },
    phone: { type: String, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }]
}, {
    timestamps: true
})

export const MedicineModel = mongoose.model("medicines", medicineSchema)