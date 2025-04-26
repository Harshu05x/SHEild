import { Complaint } from "../models/Complaint.js";
import {Police} from "../models/Police.js";

const getComplaints = async (req, res) => {
    try {
      const stationId = req.body._id;
      console.log("Station ID:", stationId);
  
      const complaints = await Complaint.find({ policeStationId: stationId });
  
      if (!complaints || complaints.length === 0) {
        return res.status(404).json({ message: "No complaints found for this police station" });
      }
  
      return res.status(200).json({ complaints });
    } catch (error) {
      console.error("Error retrieving complaints:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

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

export {getComplaints , markProcessed , markRead}