const express = require("express");
const router = express.Router();
const  mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post")
const User = mongoose.model("User");


router.get("/allpost", (req,res)=>{
    Post.find().populate("postedBy","_id name")
    .then(posts=>{
        res.json({
            posts
        })
    }).catch((err)=>{console.log(err)})
})

router.post("/createPost", requireLogin,(req,res)=>{
    const {title, body} = req.body

    if(!title || !body){
        return res.status(422).json({
            success:false,
            error:"Please Add All The fields"
        });
    }
   console.log(req.user._id)
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


router.get("/mypost",requireLogin, (req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{console.log(err)})
})

module.exports = router