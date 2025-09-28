// server/index.js
import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import { createTransport } from "nodemailer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Safe CORS using your frontend URL
const frontendUrl = process.env.FRONTEND_URL || "https://ritik-portfolio-1.onrender.com";
app.use(
  cors({
    origin: frontendUrl,
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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      replyTo: email,
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
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Email sending failed", details: error.message });
  }
});

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
