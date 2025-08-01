const express = require('express');
const { json } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const Form = require('./models/form');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;
const nodemailer = require("nodemailer");

app.use(cors({
  origin: ["https://join-smlra.vercel.app", "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, rollNo, year, course, department, phone, age } = req.body;
    console.log(req.body);
    if (!name || !email || !rollNo || !year || !course || !department || !phone || !age) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const form = new Form({ name, email, rollNo, year, course, department, phone, age });
    await form.save();

    // (async () => {
    //   try {
    //     const info = await transporter.sendMail({
    //       from: '"Manik" <manik.prakash@somaiya.edu>',
    //       to: email,
    //       subject: "Google x SMLRA",
    //       html: `
    //         <img src="https://drive.google.com/uc?export=view&id=1rqxQrM8-9DyBuuHiNRBEs3IMkARasN40" 
    //         alt="Image" 
    //         style="max-width: 100%; height: auto;" />`
    //     });

    //     console.log("Message sent:", info.messageId);
    //   } catch (err) {
    //     console.error("Error sending email:", err);
    //   }
    // })();

    res.status(201).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.post('/email', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received:", email);
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const forms = await Form.find({ email });
    if (!forms || forms.length === 0) {
      return res.status(200).json({ message: 'No emails found' });
    } else {
      return res.status(200).json({ message: 'Email exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});


app.listen(PORT, () => {
  console.log("Server running");
});