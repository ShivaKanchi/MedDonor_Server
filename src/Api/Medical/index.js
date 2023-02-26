import express from "express";
import passport from "passport";
import { MedicalModel } from "../../Database/Medicals";
const Router = express.Router();

/*
*Route    /
*Desc     Get all medicals
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/", async (req, res) => {
    const Medicallist = await MedicalModel.find();
    if (Medicallist.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Medicals available yet"
        })
    }
    return res.status(200).json(
        {
            success: true,
            data: Medicallist
        }
    );
})

/*
*Route    /
*Desc     Get Medical by id
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const oneMedical = await MedicalModel.findById(id);
    if (!oneMedical) {
        return res.status(404).json({
            success: false,
            message: "Medical by id " + id + " not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: oneMedical,
    });
})

/*
*Route    /
*Desc     Create a Medical
*Params   body(data)
*Method   POST
*Access   Public
*/
Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { data } = req.body;
    const medicalAdd = await MedicalModel.create({
        ...data
    });
    return res.status(201).json({
        success: true,
        data: medicalAdd
    });
})

/*
*Route    /
*Desc     Update a Medical
*Params   id
*Method   PUT
*Access   Public
*/
Router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updateMedical = await MedicalModel.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                ...data
            }
        },
        {
            new: true
        });
    return res.status(200).json({
        message: "One Medical updated",
        data: updateMedical
    });
})

/*
*Route    /
*Desc     Delete a Medical
*Params   id
*Method   DELETE
*Access   Public
*/
Router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
    const DeletedMedical = await MedicalModel.deleteOne({
        _id: id
    });
    return res.status(202).json({
        success: true,
        message: "Deleted a Medical",
        data: DeletedMedical,
    });
})

export default Router;