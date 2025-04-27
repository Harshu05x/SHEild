const User = require("../models/User");
const Notification = require("../models/Notification");
const NotificationService = require("../services/NotificationService");

exports.updateProfile = async (req, res) => {
    try {
        const { user } = req;
        if (!user || !user.id) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }

        const { firstName, lastName, contactNumber, address, lastPeriodDate } = req.body;

        // get user details from database
        const userDetails = await User.findById(user.id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                forceLogout: true
            });
        }
        if (lastPeriodDate) {
            if (lastPeriodDate < 1 || lastPeriodDate > 31) {
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
        if (address) userDetails.address = address;
        if (lastPeriodDate) userDetails.lastPeriodDate = lastPeriodDate;

        // save user details
        await userDetails.save();

        // create notification if lastPeriodDate is set and the date is today or in the future 5 days
        if (lastPeriodDate) {
            const lastPeriodFullDate = new Date(currentYear, currentMonth, lastPeriodDate);
            const expireDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

            if (lastPeriodFullDate >= today && lastPeriodFullDate <= expireDate) {
                const diffTime = lastPeriodFullDate.getTime() - today.getTime();
                const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const content = `<div style="padding: 10px;">
                <h2 style="color: #db2777; font-size: 20px; font-weight: bold; margin-bottom: 8px;">Period Reminder</h2>
                <p style="font-size: 16px; color: #4b5563; margin-bottom: 6px;">
                  Your next period is expected to start in <span style="font-weight: bold; color: #ef4444;">${daysRemaining}</span> days.
                </p>
                <p style="font-size: 15px; color: #6b7280;">
                  Please take care of your health. Stay hydrated, maintain a balanced diet, and don't hesitate to rest when needed. ❤️
                </p>
                </div>`
                
                const notification = {
                    title: "Period Notification",
                    description: "This notification is for you to remind you about your period. Please take care of your health.",
                    content: content,
                    user: user._id,
                    expires: expireDate,
                    daysRemaining: daysRemaining,
                };
                const notificationService = new NotificationService();
                await notificationService.createNotification(notification);
            }
        }

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
        if (!user || !user.id) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }
        const userDetails = await User.findById(user.id);
        if (!userDetails) {
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
        if (!user || !user.id) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized",
                forceLogout: true
            });
        }

        const userDetails = await User.findById(user.id);
        if (!userDetails) {
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
