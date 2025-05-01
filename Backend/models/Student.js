const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  applicationNo: String,
  name: String,
  roomNo: String,
  email: String,
  profilePhoto: {
    type: String,
    default: null
  },
  documentVerification: {
    antiRagging: {
      type: Boolean,
      default: false
    },
    antiDrug: {
      type: Boolean,
      default: false
    },
    keysHandedOver: {
      type: Boolean,
      default: false
    },
    verifiedAt: {
      type: Date,
      default: null
    }
  }
});

module.exports = mongoose.model("Student", studentSchema);
