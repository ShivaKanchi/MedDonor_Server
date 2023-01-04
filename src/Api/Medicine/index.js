import express from "express";
import passport from "passport";
import { MedicineModel } from "../../Database/allmodels";
const Router = express.Router();
/*
*Route    /
*Desc     Get All Medicines
*Params   None
*Method   GET
*Access   Public
*/
Router.get("/", async (req, res) => {
    try {
        const medData = await MedicineModel.find();
        return res.status(200).json({ Medicines: medData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
/*
*Route    /new
*Desc     Create a new medicine
*Params   _id
*Method   POST
*Access   Private
*/
Router.get("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.user;
        const { medData } = req.body;
        const newMed = await MedicineModel.create({
            ...reviewData, donor: _id
        })
        return res.status(200).json({ Medicines: medData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
