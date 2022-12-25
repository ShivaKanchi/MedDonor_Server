import express from 'express';
import passport from 'passport';
import session from "express-session";
import dotenv from 'dotenv'
import privateRouteConfig from "./Config/route.config";
dotenv.config()
//files
import dbconnect from "./Database/dbconnection.js";
//Routes
import User from "./Api/User";
import Event from "./Api/Event";

const meddonor = express()
meddonor.use(express.json())

//sessions and token config
privateRouteConfig(passport)
meddonor.use(session({ secret: process.env.JWTSECRET }));
meddonor.use(passport.initialize());
meddonor.use(passport.session());


//all route
meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})

meddonor.use("/user", User)
meddonor.use("/event", Event)

const PORT = 4000;
meddonor.listen(PORT, () => {
    console.log("Server is up")
    dbconnect()
        .then(() => {
            console.log("Database connected")
        })
        .catch((error) => {
            console.log("Db didnt conneted")
            console.log(error)
        })
})