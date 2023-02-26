import mongoose from 'mongoose'

const medicalSchema = new mongoose.Schema({
    medicalname: { type: String, required: true },
    medicalimage: [{ type: String }],
    owner: { type: mongoose.Types.ObjectId, ref: "users" },
    ownername: { type: String },
    ownerimage: { type: String },
    ownerphone: [{ type: Number }],
    type: { type: Boolean },
    landmark: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    medicalphone: [{ type: Number }],
    holiday: { type: String },
    workinghour: { type: String },
    coords: { type: String },
    medicines: [{ type: mongoose.Types.ObjectId, ref: "medicines" }]
}, {
    timestamps: true
})
export const MedicalModel = mongoose.model("medicals", medicalSchema)