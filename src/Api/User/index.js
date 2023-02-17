import express from "express";
import passport from "passport";
import { UserModel } from "../../Database/User";
const Router = express.Router();

/*
*Route    /all
*Desc     Get All Users
*Params   None
*Method   GET
*Access   Public
*/
Router.get("/all", async (req, res) => {
    try {
        const userData = await UserModel.find();
        if (userData.length === 0) return res.status(404).json({ Failed: "No Users found" })
        return res.status(200).json({ data: userData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


/*
*Route    /register
*Desc     Register a User
*Params   credentials(firstname,lastname,username,password)
*Method   POST
*Access   Public
*/
Router.post("/register", async (req, res) => {
    try {

        await UserModel.findByEmail(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({
            status: "Registered", token
        })
    } catch (Error) {
        return res.status(500).json({ error: Error.message })
    }
})

/*
*Route    /login
*Desc     log in a existing user
*Params   credentials(email,password)
*Method   POST
*Access   Public
*/
Router.post("/login", async (req, res) => {
    try {
        const newUser = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "Logged In" })
    } catch (Error) {
        return res.status(500).json({ error: Error.message })
    }
})

/*
*Route    /
*Desc     Get user details with token
*Params   token
*Method   GET
*Access   Private
*/
Router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id, email, firstname, lastname, phone, address } = req.user;
        return res.json({ user: { _id, email, firstname, lastname, address, phone } })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


/*
*Route    /
*Desc     Get user details with token
*Params   token
*Method   GET
*Access   Private
*/
Router.get("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await UserModel.findById(_id)
        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    /
*Desc     Get user details with token
*Params   token
*Method   GET
*Access   Private
*/
Router.put("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.user._id;
        const { userData } = req.body;
        userData.password = undefined;//cannot update password
        const updatedUser = await UserModel.findByIdAndUpdate(_id, {
            $set: userData
        }, {
            new: true
        })
        return res.json({ user: updatedUser })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


export default Router





/*
*Route
*Desc
*Params
*Method
*Access   Public
*/
// Router.post("/", async (req, res) => {
//     try {

//     } catch (error) {
//         return res.status(500).json({ error: error.message })
//     }
// })