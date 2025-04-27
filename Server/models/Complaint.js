const mongoose=require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const complaintSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type: String,
        enum: [
            "abuse",
            "harassment",
            "discrimination",
            "stalking",
            "cyberbullying",
            "domestic_violence",
            "workplace_harassment",
            "sexual_harassment",
            "eve_teasing",
            "unsafe_environment",
            "transportation_safety",
            "online_safety",
            "other"
        ],
        required: true
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
        enum: ["low", "medium", "high"],
        default:"medium"
    },
    status:{
        type:String,
        enum: ["pending", "resolved", "rejected"],
        default:"pending"
    }
}, {timestamps:true});

complaintSchema.plugin(autoIncrement, { inc_field: 'complaintId' });


module.exports=mongoose.model("Complaint",complaintSchema);
