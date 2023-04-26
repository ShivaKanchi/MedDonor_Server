import express from "express";
import passport from "passport";
import { RequestModel } from "../../Database/Request";

const Router = express.Router();

/*
*Route    comment/new
*Desc     Adding a request
*Params   data
*Method   POST
*Access   Private
*/
Router.post("/new", async (req, res) => {
    try {
        const { data } = req.body;
        const requested = await RequestModel.create({
            ...data
        })
        return res.status(200).json({ data: requested })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/new
*Desc     Adding a request
*Params   data
*Method   POST
*Access   Private
*/
Router.get("/", async (req, res) => {
    try {
        const requests = await RequestModel.find()
        if (requests.length === 0) return res.status(404).json({ Failed: "No Medicines found" })
        return res.status(200).json({ data: requests })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router