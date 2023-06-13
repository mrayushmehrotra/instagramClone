const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./dataBase");
connectDB(process.env.DB);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const cors = require("cors");
app.use(cors())


require("./models/postModel");
require("./models/user");


app.use(require("./routes/auth"));
app.use(require("./routes/post"))



app.get("/", (req,res)=>{
    res.send("hellop");
})

app.listen(process.env.PORT, (()=>{
    console.log(`server is on port ${process.env.PORT}` )
}));