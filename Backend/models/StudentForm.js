const mongoose = require("mongoose");

const studentFormSchema = new mongoose.Schema({
  admission_no: String,
  hall_ticket_no: String,
  batch: String,
  programme: String,
  date_of_occupation: String,
  school: String,
  student_name: String,
  student_email: String,
  father_name: String,
  mother_name: String,
  parent_email: String,
  nationality: String,
  dob: String,
  dob_place: String,
  blood_group: String,
  medical_history: String,
  student_mobile: String,
  permanent_address: String,
  father_mobile: String,
  mother_mobile: String,
  local_guardian: String,
  emergency_contact: String,
});

module.exports = mongoose.model("StudentForm", studentFormSchema);
