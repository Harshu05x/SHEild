const User = require("../models/User");
const Notification = require("../models/Notification");
const NotificationService = require("../services/NotificationService");

exports.updateProfile = async (req, res) => {
    try {
        const { user } = req;
        if(!user || !user.id){
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }
        
        const { firstName, lastName, contactNumber, address, lastPeriodDate } = req.body;

        // get user details from database
        const userDetails = await User.findById(user.id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
                forceLogout: true
            });
        }
        if(lastPeriodDate){
            if(lastPeriodDate < 1 || lastPeriodDate > 31){
                return res.status(400).json({
                    success: false,
                    message: "Invalid last period date"
                });
            }
        }       
        // update user details
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        userDetails.contactNumber = contactNumber;
        if(address) userDetails.address = address;
        if(lastPeriodDate) userDetails.lastPeriodDate = lastPeriodDate;

        // save user details
        await userDetails.save();
        console.log("User details: ",userDetails);

        const notifications = await Notification.find({ user: user.id });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userDetails,
            notifications: notifications
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { user } = req;
        if(!user || !user.id){
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }
        const userDetails = await User.findById(user.id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
                forceLogout: true
            });
        }

        const notifications = await Notification.find({ user: user.id });
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: userDetails,
            notifications: notifications
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const { user } = req;
        if(!user || !user.id){  
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }

        const userDetails = await User.findById(user.id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
                forceLogout: true
            });
        }
        const notificationService = new NotificationService();
        const notifications = await notificationService.markAsRead(notificationId, userDetails.id);
        return res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notifications: notifications
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

