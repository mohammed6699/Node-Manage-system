import nodemailer from "nodemailer";

const sendReminderEmail =async (task)=>{

    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.MAIL_USER, 
            pass: process.env.MAIL_PASS,  
        }
    });

    const mailOptions ={
    from: "mena.maherqw@gmail.com",
    to: "menamosadef5@gmail.com",
    subject: `Reminder: ${task.Title}`,
    html: `
       <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0;">
        <h2 style="text-align: center; color: #4A90E2;">📝 Task Reminder</h2>
        
        <p style="font-size: 16px; color: #333;">
            Hello,<br><br>
            This is a reminder for your upcoming task. Make sure to get it done before the due date.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">📌 Title:</td>
                <td style="padding: 8px; color: #333;">${task.title}</td>
        </tr>
        <tr style="background-color: #f1f1f1;">
            <td style="padding: 8px; font-weight: bold; color: #555;">📝 Description:</td>
            <td style="padding: 8px; color: #333;">${task.description}</td>
        </tr>
        <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">📂 Category:</td>
            <td style="padding: 8px; color: #333;">${task.category}</td>
        </tr>
        <tr style="background-color: #f1f1f1;">
            <td style="padding: 8px; font-weight: bold; color: #555;">⚡ progress:</td>
            <td style="padding: 8px; color: #e74c3c; font-weight: bold;">${task.progress}</td>
        </tr>
        <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">⏰ Due Date:</td>
            <td style="padding: 8px; color: #333;">${new Date(task.dueDate).toLocaleString("en-EG", {
                timeZone: "Africa/Cairo"
            })}</td>
        </tr>
        </table>

        <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="background-color: #4A90E2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View Task
            </a>
        </div>

            <p style="font-size: 13px; color: #999; margin-top: 30px; text-align: center;">
                You are receiving this reminder because you set a task in the system.<br>
                Task Manager © 2025
            </p>
        </div>`,
    };
    await transport.sendMail(mailOptions);
    console.log("done")
}

export default sendReminderEmail;