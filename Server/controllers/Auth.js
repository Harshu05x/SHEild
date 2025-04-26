const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGeneration=require("otp-generation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

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

        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);
        // validate OTP
        if(recentOTP.length == 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found."
            });
        }else if(otp !== recentOTP[0].otp){
            // OTP not matching
            return res.status(400).json({
                success: false,
                message: "Invalid OTP."
            });

        }
        const hashedPassword = await bcrypt.hash(password,10);
        
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
        const profile = await Profile.create({
            gender: null, 
            dateOfBirth: null, 
            about: null,
            contactNumber: null, 
        })

        // save entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // send response 
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully."
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered."
        });

    }

}


exports.login = async(req,res) => {
    try {
        // fetch data
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // check user exists 
        const user = await User.findOne({email}).populate("additionalDetails").exec();
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
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        const token = JWT.sign(payload,process.env.JWT_SECERT,{
            expiresIn: "24h"
        })

        user.token = token;
        user.password = undefined;

        // send response with cookie
        const options = {
            expires: new Date (Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token",token,options).status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully"
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


