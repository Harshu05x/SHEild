const NotificationService = require("./NotificationService");
const User = require("../models/User");

class CronJob {
    constructor() {
        this.notificationService = new NotificationService();
    }
    
    async createPeriodNotification() {
        try {
          const today = new Date();
          const todayDate = today.getDate();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth(); // 0-indexed
      
          console.log("Today's date: ", todayDate);
      
          const startTarget = todayDate;
          const endTarget = Math.min(todayDate + 5, 31);
      
          console.log("Target Range: ", startTarget, "to", endTarget);
      
          const users = await User.find({
            lastPeriodDate: { $gte: startTarget, $lte: endTarget },
          });
      
          console.log("Users found: ", users.length);
      
          for (const user of users) {
            // Construct a full Date object from lastPeriodDate
            const lastPeriodFullDate = new Date(currentYear, currentMonth, user.lastPeriodDate);
      
            // Expire notification 5 days after lastPeriodDate
            const expireDate = new Date(lastPeriodFullDate.getTime() + 5 * 24 * 60 * 60 * 1000);
      
            // Calculate days remaining
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
            </div>
            `
      
            const notification = {
              title: "Period Notification",
              description: "This notification is for you to remind you about your period. Please take care of your health.",
              content: content,
              user: user._id,
              expires: expireDate,
              daysRemaining: daysRemaining,
            };
      
            await this.notificationService.createNotification(notification);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
    }
}


module.exports = CronJob;