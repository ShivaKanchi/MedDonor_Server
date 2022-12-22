import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: [{ detail: { type: String }, for: { type: String } }],
    phone: [{ type: Number }],
    donations: [{ type: mongoose.Types.ObjectId, ref: "medicines" }]
}, {
    timestamps: true
})

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "MedDonor")
}


export const UserModel = mongoose.model("users", UserSchema)