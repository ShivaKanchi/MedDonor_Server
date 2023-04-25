import express from "express";
import passport from "passport";
import { EventModel } from "../../Database/Event";
const Router = express.Router();

/*
*Route    /
*Desc     Get all events
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/", async (req, res) => {
    const Events = await EventModel.find();
    if (Events.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Events available yet"
        })
    }
    return res.status(200).json(
        {
            success: true,
            data: Events
        }
    );
})

/*
*Route    /
*Desc     Get event by id
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const Event = await EventModel.findById(id);
    if (!Event) {
        return res.status(404).json({
            success: false,
            message: "Event by id " + id + " not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: Event,
    });
})

/*
*Route    /
*Desc     Create a Event
*Params   body(data)
*Method   POST
*Access   Public
*/
Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { data } = req.body;
        const { _id, firstname, lastname, profilepic, phone } = req.user;
        const eventCreate = await EventModel.create({
            ...data,
            coordinator: _id,
            coordinatorimage: profilepic,
            coordinatorname: data?.coordinatorname ? data.coordinatorname : firstname + " " + lastname,
            coordinatorphno: data?.coordinatorphno ? data.coordinatorphno : phone
        });
        return res.status(200).json({ data: eventCreate });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*
*Route    /
*Desc     Update a Event
*Params   id
*Method   PUT
*Access   Public
*/
Router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updateEvent = await EventModel.findOneAndUpdate(
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
        message: "One Event updated",
        data: updateEvent
    });
})

/*
*Route    /
*Desc     Delete a events
*Params   id
*Method   DELETE
*Access   Public
*/
Router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
    const event = await EventModel.deleteOne({
        _id: id
    });
    return res.status(200).json({
        success: true,
        message: "Deleted a event",
        data: event,
    });
})

/*
*Route    /
*Desc     Getevents by city
*Params   city
*Method   GET
*Access   Public
*/
Router.get("/city/:city", async (req, res) => {
    const { city } = req.params;
    const Event = await EventModel.find({
        city: { $regex: city, $options: "i" }
    });
    if (Event.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Events found in " + city
        });
    }
    return res.status(200).json({
        success: true,
        message: "Events in city " + city,
        data: Event,
    })
})
/*
*Route    /
*Desc     Get events by coordinator
*Params   coordinator
*Method   GET
*Access   Public
*/
Router.get("/coordinator/:coordinatorname", async (req, res) => {
    const { coordinatorname } = req.params;
    const Event = await EventModel.find({
        coordinatorname: { $regex: coordinatorname, $options: "i" }
    });
    if (Event.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Events with Coordinator " + coordinatorname
        });
    }
    return res.status(200).json({
        success: true,
        message: "Events with Coordinator " + coordinatorname,
        data: Event,
    })
})

/*
*Route    /
*Desc     Get events on certificate (yes/no)
*Params   certficate(yes/no)
*Method   GET
*Access   Public
*/
Router.get("/certificate/:certificate", async (req, res) => {
    const { certificate } = req.params;
    const Event = await EventModel.find({
        certificate: { $regex: certificate, $options: "i" }
    });
    if (Event.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Events with Certificate " + certificate
        });
    }
    return res.status(200).json({
        success: true,
        message: "Events with Certificate " + certificate,
        data: Event,
    })
})

export default Router