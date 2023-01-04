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
        if (!medData) return res.status(404).json({ Failed: "No Medicines found" })
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

/*
*Route    /
*Desc     Get Medicine by search string
*Params   searchstring
*Method   GET
*Access   Public
*/
Router.get("/search/:searchstring", async (req, res) => {
    try {
        const { searchstring } = req.params;
        const medicines = await MedicineModel.find({
            name: { $regex: searchstring, $options: "i" }
        });
        if (medicines.length === 0) return res.status(404).json({ error: `No Medicines found by ${searchstring}` })
        return res.status(200).json({ medicines })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router