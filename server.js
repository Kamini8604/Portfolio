const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path= require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Allows cross-origin requests

app.use(express.static(path.join(__dirname, "Portfolio"))); 

// Route to handle contact form submission
app.post("/contactForm", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  // Email transporter setup using Nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider or SMTP details
    auth: {
      user: "kamini8604@gmail.com", // Replace with your email
      pass: "perumal_/78", // Replace with your email app password
    },
  });

  // Mail options
  let mailOptions = {
    from: email,
    to: "your-email@gmail.com", // Your receiving email address
    subject: `New Message from ${name} via Portfolio`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    if (response.ok) {
      // Show success panel
      togglePanel();
      form.reset(); // Reset form fields
    } else {
      alert("Failed to send message. Please try again.");
    }

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send the message. Try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
