const express=require("express");
const mongoose=require("mongoose");
const OTPSchema=new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

//premiddleware add ->for api calling for adhar verification
async function sendVerificationSMS(contactNumber,otp){
    // try(
    //     const adharResponse=await axios.post('https://api-preproduction.signzy.app/api/v3/aadhaar/verify');
    //     if(!adharResponse)
    //     {
    //         console.log("invalid data");
    //     }
    // )
    // catch(error)
    // {

    // }
}

module.exports=mongoose.model("OTP",OTPSchema);


