import express from 'express';
import passport from 'passport';
import session from "express-session";
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import privateRouteConfig from "./Config/route.config";
dotenv.config()
//files
import dbconnect from "./Database/dbconnection.js";
//Routes
import User from "./Api/User";
import Event from "./Api/Event";
import Medical from "./Api/Medical";
import Medicine from "./Api/Medicine";
import Comment from "./Api/Comment"
import Request from "./Api/Request"

const meddonor = express()

meddonor.use(cors());
meddonor.use(helmet());

meddonor.use(express.json())

//sessions and token config
privateRouteConfig(passport)
meddonor.use(session({ secret: process.env.JWTSECRET }));
meddonor.use(passport.initialize());
meddonor.use(passport.session());

//default route
meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})
//routes
meddonor.use("/user", User)
meddonor.use("/event", Event)
meddonor.use("/medical", Medical)
meddonor.use("/medicine", Medicine)
meddonor.use("/comment", Comment)
meddonor.use("/request", Request)

const PORT = process.env.PORT || 4000;
meddonor.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`)
    dbconnect()
        .then(() => {
            console.log("Database connected")
        })
        .catch((error) => {
            console.log("Db not connected")
            console.log(error)
        })
})