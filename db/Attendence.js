const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  studentId: String,
  status: String,
});

const batchSchema = new mongoose.Schema({
  batchName: String,
  records: [recordSchema],
});

const attendanceSchema = new mongoose.Schema({
  date: String,
  batches: [batchSchema],
}, { collection: 'attendance' });

module.exports = mongoose.model('attendance', attendanceSchema);
