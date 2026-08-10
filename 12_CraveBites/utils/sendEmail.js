import transporter from "../config/email.js";

const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"CraveBites" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.log("Email sending failed:", error.message);
    throw new Error(error.message);
  }
};

export default sendMail;