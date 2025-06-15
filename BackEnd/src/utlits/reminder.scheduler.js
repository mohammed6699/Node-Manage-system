import schedule from 'node-schedule'
import sendReminderEmail from './email.notifications.js';
import sendWebPushNotification from './web.push.js';
import { getSubscription } from './subscriptionStore.js';
import userModel from '../models/user.model.js';
const schedularReminder = async (task) => {
    if (task.reminderTime) {
        const user = await userModel.findOne({_id:task.user});
            if (!user) {
                console.error("User not found for task:", task._id);
                return;
            }
                console.log("Scheduling reminder for task:", task.Title);
        const reminderDate2 = new Date(task.reminderTime);
        schedule.scheduleJob(task._id.toString(), reminderDate2, () => {
            console.log(`Reminder for task ${task._id}: ${task.Title} at ${task.reminderTime}`);
            sendReminderEmail(task,user.email);
            const subscription = getSubscription()
            console.log(subscription)
            sendWebPushNotification(subscription ,task);
        });
    }
};
export default schedularReminder ;