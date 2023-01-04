import express from "express";
import passport from "passport";
import { CommentModel } from "../../Database/Comment";

const Router = express.Router();

/*
*Route    comment/new
*Desc     Adding a new Comment with user id
*Params   cmt,token
*Method   POST
*Access   Private
*/
Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.user;
        const { cmtData } = req.body;
        const newCmt = await CommentModel.create({
            ...cmtData, cmtby: _id
        })
        return res.status(200).json({ comment: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/like 
*Desc     Give a Like to comment with token
*Params   token
*Method   POST 
*Access   Private
*/
Router.put("/like/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { cmtid } = req.params;
        const { _id } = req.user;
        const newCmt = await CommentModel.findOneAndUpdate(cmtid, {
            likes: _id,
            $pullAll: { dislikes: [_id] }
        }, {
            new: true
        })
        return res.status(200).json({ comment: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/dislike 
*Desc     Give a Dislike to comment with token
*Params   token
*Method   POST 
*Access   Private
*/
Router.put("/dislike/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { cmtid } = req.params;
        const { _id } = req.user;
        const newCmt = await CommentModel.findOneAndUpdate(cmtid, {
            dislikes: _id,
            $pullAll: { likes: [_id] }
        }, {
            new: true
        })
        return res.status(200).json({ comment: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


export default Router;