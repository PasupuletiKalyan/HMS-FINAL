const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  applicationNo: String,
  name: String,
  roomNo: String,
  email: String,
});

module.exports = mongoose.model("Student", studentSchema);
