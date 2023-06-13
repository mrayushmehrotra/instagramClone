const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,ref:"user"
    }],
    comment: { 
        type:String,
        postedBy:{
            type:ObjectId,ref:"user"
        }
        },
    postedBy:{
        type:ObjectId || "User Not Found",
        ref:"User"

    }
})

mongoose.model("Post", postSchema);