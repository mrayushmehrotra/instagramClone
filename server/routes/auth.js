const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");


router.get("/protected",requireLogin, (req,res)=>{
  res.json({message:"Protected Route"})
})

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
    
    const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(422).json({
      success: false,
      error: "Please Complete the left blanks",
    });
  }
  return User.findOne({ email: email }).then((savedUser) => {
    if (savedUser){
      return res.status(422).json({
        success: false,
        error: "Email Already Exist",
      });
    } 
    else {
        try{
            bcrypt.hash(password,12).then(hashedPassword=>{
                const user = new User({ name, email, password:hashedPassword });
                user.save().then(user=>{
                  return res.status(201).json({
                      success:true,
                      message:"User Created Successfully"
                  });
                });
            });
    }
      catch(err){
        console.log(err);
      }
    }
  });
});

router.post("/signin",  (req,res)=>{
    const  { email,password} = req.body;
    if(!email || !password) {
        return res.status(422).json({
            success:false,
            error:"Please Fill Email and Password"
        });
    }

    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({
              success:false,
              error:"Invalid Email Address or Password"
            })
        }

        bcrypt.compare(password, savedUser.password).then(doMatch=>{
          if(doMatch){
            const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET);
            const { _id, name, email } = savedUser;
            res.json({
              success:true,
              token,
              savedUser
            })
            // return res.json({
            //   success:true,
            //   message:"Signed in Successfully"
            // })
          } else {
            return res.status(422).json({
              success:false,
              error:"Invalid Email or Password"
            })
          }
        }).catch((err)=>{
          console.log(err);
        })
    })
})


module.exports = router;
