const { Schema, model } = require('mongoose');

const formSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  rollNo: String,
  year: String,
  branch: String,
  phone: String,
  resume: String,
  linkedin: String,
  github: String,
  about: String,
  preference1: String,
  preference2: String,
  preference3: String,
  whyYou: String,
  questions: String,
}, {
  timestamps: true,
});

module.exports = model('form', formSchema);