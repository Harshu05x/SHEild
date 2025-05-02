const Police = require("../models/Police");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Complaint = require("../models/Complaint");

exports.login = async (req, res) => {
    try {
        // fetch data
        console.log(req.body);
        const { mobile, password } = req.body;

        // validation
        if (!mobile || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // check user exists 
        const user = await Police.findOne({
            mobile: mobile
        });
        if (!user) {
            // create police
            const hashedPassword = await bcrypt.hash(password, 10);
            const newPolice = await Police.create({
                mobile: mobile,
                password: hashedPassword,
                name: "Police_" + mobile
            });
            return res.status(401).json({
                success: false,
                message: "Police not registered with us"
            });
        }

        // match password
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        // generate JWT token ans send in response
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })

        user.token = token;
        user.password = undefined;


        res.status(200).json({
            success: true,
            user,
            token,
            message: "logged in successfully",
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot be logged In."
        });
    }
}

exports.getStatistics = async (req, res) => {
    try {

        // fetch complaints grouped by status
        const statusCounts = await Complaint.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Initialize counts
        let total = 0;
        let pending = 0;
        let resolved = 0;
        let rejected = 0;

        // Fill counts based on aggregation result
        statusCounts.forEach(item => {
            total += item.count;
            if (item._id === "pending") pending = item.count;
            else if (item._id === "resolved") resolved = item.count;
            else if (item._id === "rejected") rejected = item.count;
        });

        // avoid division by zero
        total = total || 1;

        return res.status(200).json({
            success: true,
            total,
            pending,
            resolved,
            rejected,
            pendingPercentage: Math.round((pending / total) * 100),
            resolvedPercentage: Math.round((resolved / total) * 100),
            rejectedPercentage: Math.round((rejected / total) * 100),
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot get statistics"
        });
    }
}

exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        return res.status(200).json({
            success: true,
            complaints
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot get complaints"
        });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { id, status, comments } = req.body;
        console.log(id, status, comments);
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status, response: comments }, { new: true });
        return res.status(200).json({
            success: true,
            updatedComplaint
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot update status"
        });
    }
}

exports.getComplaintById = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(id);
        const complaint = await Complaint.findById(id).populate("userId");
        return res.status(200).json({
            success: true,
            complaint
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot get complaint"
        });
    }
}