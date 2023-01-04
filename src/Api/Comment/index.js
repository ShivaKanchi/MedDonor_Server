import express from "express";
import passport from "passport";
import { CommentModel } from "../../Database/Comment";

const Router = express.Router();

/*
*Route
*Desc
*Params
*Method
*Access   Public
*/
Router.post("/", async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})