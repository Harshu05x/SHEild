const Notification = require("../models/Notification");

class NotificationService {
    constructor() {}

    async createNotification(notification) {
        try {
            const newNotification = new Notification(notification);
            return await newNotification.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getNotifications(userId) {
        try {
            const notifications = await Notification.find({ user: userId, isRead: false });
            return notifications;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async markAsRead(notificationId, userId) {
        try {
            const notification = await Notification.findByIdAndUpdate(notificationId, { user: userId, isRead: true });
            const notifications = await Notification.find({ user: userId, isRead: false });
            return notifications;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = NotificationService;
