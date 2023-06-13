const express = require("express");
const router = express.Router();
const  mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post")
const User = mongoose.model("User");


router.get("/allpost",requireLogin, (req,res)=>{
    Post.find().populate("postedBy","_id name")
    .then(posts=>{
        res.json({
            posts
        })
    }).catch((err)=>{console.log(err)})
})

router.post("/createPost", requireLogin,(req,res)=>{
    const {title, body, pic} = req.body;
   

    if(!title || !body || !pic){
        return res.status(422).json({
            success:false,
            error:"Please Add All The fields"
        });
    }
 
    const post = new Post({
        title,
        body,
        photo:pic,
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


router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    }, {
        new:true
    }).then(result=>{
        return res.json(result);
    }).catch((err)=>{
        return res.status(422).json({
            success:false,
            message:"Failed To Like",
            err
        })
    })
})

router.put("/unlike",requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    }, {
        new:true
    }).then(result=>{
        return res.json(result);
    }).catch(err=>{
        return res.status(422).json({
            err
        })
    })

})

router.post("/comment", requireLogin, (req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    console.log(comment)
    const comment2 = String(comment)
    console.log(comment2)
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comment: comment2 }
      }, {
        new: true
      }).populate("comment.postedBy", "_id name")
    .then(result=>{
        console.log(req.user.postId)
        return res.status(201).json({
            success:true,
            result
            
        });
    }).catch(err=>{
        return res.status(422).json({
            err,
            message:"Nhi hua bhadwe"
        })
    })
})


module.exports = router