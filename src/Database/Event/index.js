import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventname: { type: String, required: true },
    eventimage: { type: String },
    landmark: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    //coordinator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    coordinator: { type: String },
    coordinatorimage: { type: String },
    coordinatorphno: { type: Number },
    certificate: { type: Boolean }
}, {
    timestamps: true
})
export const EventModel = mongoose.model("events", eventSchema)
