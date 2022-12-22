import express from 'express'

import dbconnection from './Database/dbconnection'

const meddonor = express()
meddonor.use(express.json())

meddonor.get("/", (req, res) => {
    res.json({
        message: "MedDonor server up",
    })
})

