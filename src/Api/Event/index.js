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
            message: Events
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
Router.post("/", async (req, res) => {
    const { data } = req.body;
    const eventCreate = await EventModel.create({
        ...data
    });
    return res.status(201).json({
        success: true,
        data: eventCreate
    });
})

/*
*Route    /
*Desc     Update a Event
*Params   id
*Method   PUT
*Access   Public
*/
Router.put("/:id", async (req, res) => {
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
Router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const event = await EventModel.deleteOne({
        _id: id
    });
    return res.status(202).json({
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
        city: city
    });
    if (!Event) {
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
Router.get("/coordinator/:coordinator", async (req, res) => {
    const { coordinator } = req.params;
    const Event = await EventModel.find({
        coordinator: coordinator
    });
    if (!Event) {
        return res.status(404).json({
            success: false,
            message: "No Events with Coordinator " + coordinator
        });
    }
    return res.status(200).json({
        success: true,
        message: "Events with Coordinator " + coordinator,
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
        certificate: certificate
    });
    if (!Event) {
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