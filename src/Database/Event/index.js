import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventname: { type: String, required: true },
    landmark: { type: String },
    address: { type: String },
    coordinator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    certificate: { type: Boolean }
}, {
    timestamps: true
})
export const EventModel = mongoose.model("events", eventSchema)
