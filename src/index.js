import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
//files
import dbconnection from './Model/dbconnection'

const meddonor = express()
meddonor.use(express.json())
//all route
meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})
const PORT = 4000;
meddonor.listen(PORT, () => {
    console.log("Server is up")
    dbconnection()
        .then(() => {
            console.log("Database connected")
        })
        .catch((error) => {
            console.log("Db didnt conneted")
            console.log(error)
        })
})