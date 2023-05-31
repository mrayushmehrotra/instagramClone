const express = require("express");
const router = express.Router();
const  mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");


router.post("/createPost", requireLogin,(req,res)=>{
    const {title, body} = req.body

    if(!title || !body){
        return res.status(422).json({
            success:false,
            error:"Please Add All The fields"
        });
    }
    console.log(req.user);
    res.send("Okauy")

//     const post = new post({
//         title,
//         body,
//         postedBy
//  })
})

module.exports = router