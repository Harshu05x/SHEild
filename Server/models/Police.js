const express=require("express");
const mongoose=require("mongoose");

const PoliceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Police",PoliceSchema);