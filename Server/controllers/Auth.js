const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGeneration=require("otp-generation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.signUp=async(req,res)=>
{
    try{
        const {
            firstName,
            lastName,
            password,
            confirmPassword,
            aadharNumber,
            contactNumber,
            gender,
            address,
            otp
        }=req.body;

        //validation
        if(!firstName || !lastName || !password || !confirmPassword || !aadharNumber || !contactNumber || !gender ||!address)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
        //confirm password match
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and Confirmpassword do not match",
            })
        }

        //Gender Should be Female
        if(gender=="male")
        {
            return res.status(400).json({
                success:false,
                message:"Gender should be Female",
            })
        }
        //check user already exist or not
        const existingUser=await User.findOne({aadharNumber});

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User is already registered',
            });
        }

        

    }   
    catch(error)    
    {

    }
}

