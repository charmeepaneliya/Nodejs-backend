import transporter from "../config/email.js";
import nodemailer from "nodemailer";

const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from:`"craveBites" cpjstudy28@gmail.com`,
      to,
      subject,
      html,
    });

    console.log("message sent:",info.messageId);

    

    console.log("Preview URL:",nodemailer.getTestMessageUrl(info));

   
  } catch (error) {
    console.log("Error while sending Email:", error);
    
  }
};

export default sendMail;