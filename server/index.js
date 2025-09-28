// server/index.js
import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import { createTransport } from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000; // ✅ use Render's port if available

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ allow only your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// POST /send route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const transporter = createTransport({
      host: "smtp.gmail.com", // ✅ safer than service: 'gmail'
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL, // ✅ must be your own email
      replyTo: email, // ✅ so you can reply directly to the visitor
      to: process.env.USER_EMAIL,
      subject: `Message from ${name}`,
      text: `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message, error);
    res
      .status(500)
      .json({ error: "Email sending failed", details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
