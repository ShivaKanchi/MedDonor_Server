import mongoose from 'mongoose'

const medicalSchema = new mongoose.Schema({
    medicalname: { type: String, required: true },
    medicalimage: { type: String },
    landmark: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    holiday: { type: String },
    workinghour: { type: String },
    coords: { type: String },
    medicines: [{ type: mongoose.Types.ObjectId, ref: "medicines" }]
}, {
    timestamps: true
})
export const MedicalModel = mongoose.model(medicals, medicalSchema)