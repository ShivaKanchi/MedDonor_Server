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
Router.post("/new/:medid", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { medid } = req.params;
        const { _id } = req.user;
        const { cmtData } = req.body;
        const newCmt = await CommentModel.create({
            ...cmtData, cmtby: _id, cmtfor: medid
        })
        // const updatedUser = await UserModel.findByIdAndUpdate( _id, {
        //     $push: { comments: newCmt._id }
        // }, {
        //     new: true
        // })
        return res.status(200).json({ message: "Comment added", comment: newCmt, commented_by: updatedUser })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/verify
*Desc     Give a verification to comment with token only admin
*Params   token, cmt id
*Method   POST 
*Access   Private
*/
Router.put("/verify/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { cmtid } = req.params;
        const { email } = req.user;
        if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
        const newCmt = await CommentModel.findOneAndUpdate(cmtid, {
            verfied: true
        }, {
            new: true
        })
        return res.status(200).json({ message: "Comment verified", data: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/unverify
*Desc     Give a unverfication to comment with token only admin
*Params   token,cmt id
*Method   PUT 
*Access   Private
*/
Router.put("/unverify/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { cmtid } = req.params;
        const { email } = req.user;
        if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
        const newCmt = await CommentModel.findOneAndUpdate(cmtid, {
            verfied: false
        }, {
            new: true
        })
        return res.status(200).json({ message: "Comment unverified", data: newCmt })
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
        return res.status(200).json({ message: "Comment liked", data: newCmt })
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
        return res.status(200).json({ message: "Comment disliked", data: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    /
*Desc     Get comment of a medicine by id
*Params   searchstring
*Method   GET
*Access   Public
*/
Router.get("/:medid", async (req, res) => {
    try {
        const { medid } = req.params;
        if (!medid) return res.status(400).json({ failed: "No medicine id provided" })
        const commentOfMedicine = await CommentModel.find({ cmtfor: medid });
        if (commentOfMedicine.length === 0) return res.status(404).json({ error: `No Commments found on ${medid}` })
        return res.status(200).json({ data: commentOfMedicine })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    comment/delete/:medid
*Desc     Adding a new Comment with user id
*Params   cmt,token
*Method   POST
*Access   Private
*/
Router.delete("/delete/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const newCmt = await CommentModel.findByIdAndDelete({ _id })
        if (!newCmt) return res.status(404).json({ failed: "No comment with that id" })
        return res.status(200).json({ message: "Comment deleted", data: newCmt })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


/*
*Route    /
*Desc     Get Comment by id
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/comment/:id", async (req, res) => {
    const { id } = req.params;
    const Comment = await CommentModel.findById(id);
    if (!Comment) {
        return res.status(404).json({
            success: false,
            message: "Comment by id " + id + " not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: Comment,
    });
})



export default Router;