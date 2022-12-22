const express = require('express');

//files
import dbconnection from './Database/dbconnection'



const meddonor = express()
meddonor.use(express.json())
//all route
meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})
PORT = 4000
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