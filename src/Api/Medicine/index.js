import express from "express";
import passport from "passport";
import { MedicineModel, UserModel } from "../../Database/allmodels";
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
        if (medData.length === 0) return res.status(404).json({ Failed: "No Medicines found" })
        return res.status(200).json({ data: medData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


/*
*Route    /
*Desc     Get Medicine by id
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const Medicine = await MedicineModel.findById(id);
    if (!Medicine) {
        return res.status(404).json({
            success: false,
            message: "Medicine by id " + id + " not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: Medicine,
    });
})

/*
*Route    /new
*Desc     Create a new medicine
*Params   _id
*Method   POST
*Access   Private
*/
Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id, firstname, lastname } = req.user;
        const { medData } = req.body;
        const newMed = await MedicineModel.create({
            ...medData, donor: _id, donorname: firstname + " " + lastname
        })
        const updatedUser = await UserModel.findByIdAndUpdate(_id, {
            $push: { donations: newMed._id }
        }, {
            new: true
        })
        return res.status(200).json({ Medicine: newMed, Donated_by: updatedUser })
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
        const medicines = await MedicineModel.find({ medname: { $regex: searchstring, $options: "i" } });
        if (medicines.length === 0) return res.status(404).json({ error: `No Medicines found by ${searchstring}` })
        return res.status(200).json({ data: medicines })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    /delete/:_id
*Desc     Delete a medicine
*Params   token, medicine
*Method   POST
*Access   Private
*/
Router.delete("/delete/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const { email } = req.user;
        if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
        const med = await MedicineModel.findByIdAndDelete({ _id })
        if (!med) return res.status(404).json({ failed: "No Medicine with that id" })
        return res.status(200).json({ message: "Medicine Removed", data: med })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router