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
    subject: `Reminder: ${task.title}`,
    html: ``,
    };
    await transport.sendMail(mailOptions);
    console.log("done")
}

export default sendReminderEmail;