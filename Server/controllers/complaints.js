const Complaint = require("../models/Complaint");
const User = require("../models/User");

const markProcessed = async (req, res) => {
    const { _id  } = req.body._id; 
    console.log(req.body);
    
    try {
        
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.body._id, 
            { status: 'processed' }, 
            { new: true }
        );

        
        if (!updatedComplaint) {
            return res.status(404).json({ message: req.body._id });
        }

        
        res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating complaint status" });
    }
};

const markRead = async (req, res) => {
    const { _id  } = req.body._id; 
    console.log(req.body);
    
    try {
        
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.body._id, 
            { status: 'read' }, 
            { new: true }
        );

        
        if (!updatedComplaint) {
            return res.status(404).json({ message: req.body._id });
        }

        
        res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating complaint status" });
    }
};


exports.createComplaint = async (req, res) => {
    try {
        const {user} = req;
        console.log("User -->", user)
        if(!user || !user.id){
            return res.status(401).json({message: "Unauthorized", forceLogout: true});
        }
        const userData = await User.findById(user.id);
        console.log("User Data -->", userData)
        if(!userData){
            return res.status(401).json({message: "Unauthorized", forceLogout: true});
        }
        const {title, description, category, priority} = req.body;

        const complaint = await Complaint.create({
            title, description, category, priority, userId: userData._id
        })

        if(!complaint){
            return res.status(400).json({message: "Failed to create complaint"});
        }

        return res.status(200).json({message: "Complaint created successfully", complaint});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating complaint" });
    }
}

exports.getComplaints = async (req, res) => {
    try {
        const {user} = req;
        if(!user || !user.id){
            return res.status(401).json({message: "Unauthorized", forceLogout: true});
        }
        const userData = await User.findById(user.id);
        if(!userData){
            return res.status(401).json({message: "Unauthorized", forceLogout: true});
        }
        const complaints = await Complaint.find({userId: userData._id});
        return res.status(200).json({complaints});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error getting complaints" });
    }
}

// export {getComplaints , markProcessed , markRead, createComplaint}