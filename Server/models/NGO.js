const mongoose=require("mongoose");

const NGOSchema=new mongoose.Schema({
    OrganizationName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
    },
    Post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    Notification:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification"
    }]

})


module.exports=mongoose.model("NGO",NGOSchema);