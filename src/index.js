import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
//files
import dbconnect from "./Database/dbconnection.js";
//Routes
import User from "./Api/User";
const meddonor = express()
meddonor.use(express.json())
//all route
meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})
meddonor.use("/user", User)
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