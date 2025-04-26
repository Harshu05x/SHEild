//initiate server
const express= require('express');
const app=express();
require("dotenv").config();
const {connect}=require("./config/database");
const cors=require("cors");
const cron = require("node-cron");
const CronJob = require("./services/CronJob");

// Import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

// Define port
const PORT = process.env.PORT || 5000;



// // Connect with Cloudinary 
// cloudinaryConnect();

// Add middlewares
app.use(express.json());


app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Mount the routes
app.use("/api/v1/auth", userRoutes); 
app.use("/api/v1/profile", profileRoutes);

//activate the server on port
app.listen(process.env.PORT,(req,res)=>
{
    console.log(`Server started at port ${process.env.PORT}`);

    // schedule cron job at 12 noon every day
    cron.schedule("0 12 * * *", () => {
        console.log("Cron job started");
        const cronJob = new CronJob();
        // cronJob.createPeriodNotification();
    });
})

connect();
//route
app.get('/',(req,res)=>
{
    res.send("Server started successfully");
})