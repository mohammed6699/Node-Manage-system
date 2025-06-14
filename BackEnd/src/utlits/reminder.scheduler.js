import schedule from 'node-schedule'
import sendReminderEmail from './email.notifications.js';
const schedularReminder = (task) => {
    if (task.reminderTime) {
        console.log("Scheduling reminder for task:", task.title);
        const reminderDate2 = new Date(task.reminderTime);
        schedule.scheduleJob(task._id.toString(), reminderDate2, () => {
            console.log(`Reminder for task ${task._id}: ${task.title} at ${task.reminderTime}`)
            sendReminderEmail(task);
        });
    }
};
export default schedularReminder ;