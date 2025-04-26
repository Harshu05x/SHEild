//initiate server
const express= require('express');
const app=express();
require("dotenv").config();
const {connect}=require("./config/database");





// Import routes
const userRoutes = require("./routes/User");

// Define port
const PORT = process.env.PORT || 5000;



// // Connect with Cloudinary 
// cloudinaryConnect();

// Add middlewares
app.use(express.json());


app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Mount the routes
app.use("/api/v1/auth", userRoutes); 

//activate the server on port
app.listen(process.env.PORT,(req,res)=>
{
    console.log("Server started at port 3000");
})

connect();
//route
app.get('/',(req,res)=>
{
    res.send("Server started successfully");
})