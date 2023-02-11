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
    const updateMedical = await EventModel.findOneAndUpdate(
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
        success: true,
        message: "One Medical updated",
        data: updateMedical
    });
})
