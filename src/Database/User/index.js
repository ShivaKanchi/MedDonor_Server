import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: [{ type: Number }],
    donations: [{ type: mongoose.Types.ObjectId, ref: "medicines" }]
}, {
    timestamps: true
})

//creating token
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "MedDonor")
}


export const UserModel = mongoose.model("users", UserSchema)