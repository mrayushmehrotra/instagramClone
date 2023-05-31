const mongoose = require("mongoose");

function connectDB(DB){
    try{
        mongoose.connect(DB).then((data)=>{
            console.log(`DB is connected to ${data.connection.host}`)
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;