import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    profilepic: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: [{ type: Number }],
    donations: [{ type: mongoose.Types.ObjectId, ref: "medicines" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }]
}, {
    timestamps: true
})

//Model Methods
//creating token
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "MedDonor")
}

//if email already exists
UserSchema.statics.findByEmail = async ({ email }) => {
    const checkUserEmail = await UserModel.findOne({ email });
    if (checkUserEmail) {
        throw new Error("User already exists with that Email");
    }
    return false;
}

//login check
UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exists");
    const pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch) throw new Error("Incorrect Password")
    return user;
}

//hashing/Salting the password before save
UserSchema.pre('save', function (next) {
    const user = this;
    // password encrypted
    if (!user.isModified('password')) return next();
    // generating salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            user.password = hash;
            return next()
        })
    })
})

export const UserModel = mongoose.model("users", UserSchema)