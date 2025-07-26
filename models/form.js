const { Schema, model } = require('mongoose');

const formSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNo: { type: String, required: true },
  year: { type: String, required: true },
  course: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = model('form', formSchema);