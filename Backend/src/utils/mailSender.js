import nodemailer from "nodemailer";

const mailSender = async(email,title,body,attachments = [])=>{

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
      
      
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    
        const info = await transporter.sendMail({
        from: 'HRMS || Aman Kumar Verma',
        to: `${email}`,
        subject: `${title}`,
        
        html: `${body}`, // HTML version of the message
        attachments
      });
    
      console.log("Message sent:", info.messageId);
      return info;

    } catch (error) {
        console.log(error.message);
    }
}

export default mailSender;