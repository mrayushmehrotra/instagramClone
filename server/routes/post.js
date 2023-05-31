const express = require("express");
const router = express.Router();
const  mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post")

router.post("/createPost", requireLogin,(req,res)=>{
    const {title, body} = req.body

    if(!title || !body){
        return res.status(422).json({
            success:false,
            error:"Please Add All The fields"
        });
    }
   
    const post = new Post({
        title,
        body,
        postedBy:req.user._id
 });
 post.save().then(result=>{
    res.status(201).json({
        success:true,
        message:"Post Created Successfullt",
        result
    })
 }).catch(err=>{
    console.log(err)
 })
})

module.exports = router