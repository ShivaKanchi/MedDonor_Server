import mongoose from 'mongoose'

const medicalSchema = new mongoose.Schema({
    medicalname: { type: String, required: true },
    medicalimage: [{ type: String }],
    type: { type: Boolean },
    landmark: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    phone: [{ type: Number }],
    holiday: { type: String },
    workinghour: { type: String },
    coords: { type: String },
    medicines: [{ type: mongoose.Types.ObjectId, ref: "medicines" }]
}, {
    timestamps: true
})
export const MedicalModel = mongoose.model("medicals", medicalSchema)