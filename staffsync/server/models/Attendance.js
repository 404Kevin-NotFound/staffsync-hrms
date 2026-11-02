const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, checkIn: Date, checkOut: Date,
  status: { type: String, enum: ['Present','Absent','Half Day'], default: 'Present' }
}, { timestamps: true });
schema.index({ user: 1, date: 1 }, { unique: true });
module.exports = mongoose.model('Attendance', schema);
