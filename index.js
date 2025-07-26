const express = require('express');
const { json } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const Form = require('./models/form');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ["https://join-smlra.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(json());

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
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

    if (!name || !email || !rollNo || !year || !course || !department || !phone || !age) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const form = new Form({ name, email, rollNo, year, course, department, phone, age });
    await form.save();

    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/email', async (req, res) => {
  try {
    const forms = await Form.find({}, 'email');
    if (!forms || forms.length === 0) {
      return res.status(200).json({ message: 'No emails found' });
    }
    res.status(200).json({ message: "Email exists" });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});