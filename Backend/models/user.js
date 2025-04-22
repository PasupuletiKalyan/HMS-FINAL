const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Add this field
  applicationNo: { type: String, unique: true, sparse: true }, // For students
  email: { type: String, unique: true, sparse: true }, // For wardens
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "warden", "admin"], required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
