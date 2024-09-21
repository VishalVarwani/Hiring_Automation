const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for port 587
  auth: {
    user: "vishalvarwani8@gmail.com",
    pass: "Tjhgt sham pdoc yoqd", // Use an app-specific password if 2FA is enabled
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: '"Vishal Varwani" <vishalvarwani8@gmail.com>', // sender address
      to: "vishalvarwani77@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

main();
