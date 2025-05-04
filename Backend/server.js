const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Remove the User model import from here as it's used in multiple files
// and should be imported only where needed
const studentFormRoutes = require("./routes/studentFormRoutes");
const studentRoutes = require("./routes/studentRoutes"); // Add this for student routes
const userRoutes = require("./routes/userRoutes"); // Add the user routes
const complaintRoutes = require("./routes/complaintRoutes");
const studentProgressRoutes = require("./routes/studentProgressRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const occupiedBedRoutes = require("./routes/occupiedBedRoutes"); 
const hostelRoutes = require("./routes/hostelRoutes"); // Add this for hostel routes
const announcementRoutes = require("./routes/announcementRoutes"); // Add this for announcement routes
// Load environment variables
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Use environment variables for the connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://OmSaiVikranth:HMS_SE_CodeMonkeys@cluster0.zvkzt5n.mongodb.net/hostelDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Login Route
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Import the User model only in this handler
    const User = require("./models/user");
    const user = await User.findOne({
      $or: [{ applicationNo: identifier }, { email: identifier }],
      password,
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      name: user.name,
      role: user.role,
      userId: user._id,
      applicationNo: user.applicationNo
    });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});
// Form Routes
app.use("/api/form", studentFormRoutes);

// Student Routes
app.use("/api/students", studentRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Complaint Routes
app.use("/api/complaints", complaintRoutes);

// Student Progress Routes
app.use("/api/progress", studentProgressRoutes);

// Warden Routes
app.use("/api/warden", wardenRoutes);

// Occupied Beds Routes
app.use("/api/occupied-beds", occupiedBedRoutes);

// Hostel Routes
app.use("/api/hostels", hostelRoutes);

// Announcement Routes
app.use("/api/announcements", announcementRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});