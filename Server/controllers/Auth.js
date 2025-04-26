const User=require("../models/User");
const OTP=require("../models/OTP");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Notification = require("../models/Notification");

exports.sendOTP = async(req,res) => {
    try {
        // fetch email
        const {email} = req.body;

        // validation
        const checkUserPresent = await User.findOne({email});
        
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registered."
            });
        };

        // Import OTP generation module
        const { default: otpGenerator } = await import("otp-generation");

        // Generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("OTP generated: ", otp);

        // validate otp
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp});
        }

        // create an entry for OTP
        const response = await OTP.create({email,otp});

        // send response
        res.status(200).json({
            success: true,
            otp,
            message: "OTP sent successfully."
        });

    } catch (error) {
        console.log("Error in OTP sending: ", error.message);
        return  res.status(500).json({
            success: false,
            message: error.message
        });
    }   
}

exports.signUp=async(req,res)=>
{
    try{
        const {
            firstName,
            lastName,
            password,
            aadhaar,
            contactNumber,
            gender,
            otp
        }=req.body;

        console.log(firstName,lastName,password,aadhaar,contactNumber,gender,otp);
        //validation
        if(!firstName || !lastName || !password  || !aadhaar || !contactNumber || !gender)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
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
        const existingUser=await User.findOne({
            $or: [
                {aadhaarNumber: aadhaar},
                {contactNumber: contactNumber}
            ]
        });

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User is already registered with this Aadhaar or Contact Number',
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);


        // save entry in DB
        const user = await User.create({
            firstName,
            lastName,
            contactNumber,
            password: hashedPassword,
            gender: gender,
            aadharNumber: aadhaar,
        });

        // create a token and send in response
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: "24h" });
        
        console.log(token);

        // send response 
        return res.status(200).json({
            success: true,
            user,
            token,
            message: "User registered successfully."
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while registering the user"
        });

    }

}


exports.login = async(req,res) => {
    try {
        // fetch data
        const {mobile,password} = req.body;

        // validation
        if(!mobile || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // check user exists 
        const user = await User.findOne({
            contactNumber: mobile
        });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered with us, please sign up first."
            });
        }
        
        // match password
        const passwordMatched = await bcrypt.compare(password,user.password);
        if(!passwordMatched){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });   
        }

        // generate JWT token ans send in response
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "24h"
        })

        user.token = token;
        user.password = undefined;

        const notifications = await Notification.find({ user: user.id });

        res.status(200).json({
            success: true,
            user,
            token,
            message: "User logged in successfully",
            notifications: notifications
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be logged In."
        });
    }
}


