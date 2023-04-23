import express from "express";
import passport from "passport";
import { MedicalModel } from "../../Database/Medicals";
const Router = express.Router();

/*
*Route    /
*Desc     Get all medicals
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/", async (req, res) => {
    const Medicallist = await MedicalModel.find();
    if (Medicallist.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Medicals available yet"
        })
    }
    return res.status(200).json(
        {
            success: true,
            data: Medicallist
        }
    );
})

/*
*Route    /
*Desc     Get Medical by id
*Params   -
*Method   GET
*Access   Public
*/
Router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const oneMedical = await MedicalModel.findById(id);
    if (!oneMedical) {
        return res.status(404).json({
            success: false,
            message: "Medical by id " + id + " not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: oneMedical,
    });
})

/*
*Route    /
*Desc     Create a Medical
*Params   body(data)
*Method   POST
*Access   Public
*/
Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { data } = req.body;
    const { _id, firstname, lastname, profilepic, phone } = req.user;
    const medicalAdd = await MedicalModel.create({
        ...data,
        owner: _id,
        ownerimage: profilepic,
        ownername: data?.ownername ? data.ownername : firstname + " " + lastname,
        ownerphone: data?.ownerphone ? data.ownerphone : phone
    });
    return res.status(200).json({
        success: true,
        data: medicalAdd
    });
})

/*
*Route    /
*Desc     Update a Medical
*Params   id
*Method   PUT
*Access   Public
*/
Router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updateMedical = await MedicalModel.findOneAndUpdate(
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
        message: "One Medical updated",
        data: updateMedical
    });
})


/*
*Route    /
*Desc     Get medicals by city
*Params   city
*Method   GET
*Access   Public
*/
Router.get("/city/:city", async (req, res) => {
    const { city } = req.params;
    const Medical = await MedicalModel.find({
        city: { $regex: city, $options: "i" }
    });
    if (Medical.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Medicals found in " + city
        });
    }
    return res.status(200).json({
        success: true,
        message: "Medicals in city " + city,
        data: Medical,
    })
})

/*
*Route    /
*Desc     Delete a Medical
*Params   id
*Method   DELETE
*Access   Public
*/
Router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    if (email != "Admin@gmail.com") return res.status(500).json({ failed: "You are not Admin" })
    const DeletedMedical = await MedicalModel.deleteOne({
        _id: id
    });
    return res.status(200).json({
        success: true,
        message: "Deleted a Medical",
        data: DeletedMedical,
    });
})

/*
*Route    /
*Desc     Find nearby medical
*Params   coords
*Method   DELETE
*Access   Public
*/
Router.delete("/:coords", async (req, res) => {
    const { coords } = req.params;
    const Medicallist = await MedicalModel.find();


    const nearbyUsers = [];

    // Medicallist.forEach((user) => {
    //     const R = 6371; // Radius of the Earth in km
    //     const dLat = (user.lat - lat) * (Math.PI / 180);
    //     const dLng = (user.lng - lng) * (Math.PI / 180);
    //     const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(lat * (Math.PI / 180)) *
    //         Math.cos(user.lat * (Math.PI / 180)) *
    //         Math.sin(dLng / 2) *
    //         Math.sin(dLng / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const d = R * c; // Distance between the two points in km

    //     if (d <= 1) {
    //         nearbyUsers.push(user);
    //     }
    // });

    console.log(nearbyUsers);
    return res.status(200).json({
        success: true,
        message: "Medicals near 1 km",
        data: Medicallist,
    });
})

export default Router;



const users = [
    { name: 'User 1', lat: 51.5074, lng: -0.1278 },
    { name: 'User 2', lat: 51.5160, lng: -0.0937 },
    { name: 'User 3', lat: 51.5251, lng: -0.0804 },
    { name: 'User 4', lat: 51.5099, lng: -0.1180 },
];

// const getNearbyUsers = (lat, lng) => {
//     const nearbyUsers = [];

//     users.forEach((user) => {
//         const R = 6371; // Radius of the Earth in km
//         const dLat = (user.lat - lat) * (Math.PI / 180);
//         const dLng = (user.lng - lng) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat * (Math.PI / 180)) *
//             Math.cos(user.lat * (Math.PI / 180)) *
//             Math.sin(dLng / 2) *
//             Math.sin(dLng / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d = R * c; // Distance between the two points in km

//         if (d <= 1) {
//             nearbyUsers.push(user);
//         }
//     });

//     return nearbyUsers;
// };

// console.log(getNearbyUsers(51.5103, -0.1168)); // Returns users within 1 km of a certain location