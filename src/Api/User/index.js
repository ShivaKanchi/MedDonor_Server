import express from "express";
import passport from "passport";
import { UserModel } from "../../Database/User";
const Router = express.Router();


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
            status: "Success", token
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

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