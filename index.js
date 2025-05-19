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
connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/submit', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});