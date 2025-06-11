const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Add path module

// Routes imports
const studentFormRoutes = require("./routes/studentFormRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const studentProgressRoutes = require("./routes/studentProgressRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const occupiedBedRoutes = require("./routes/occupiedBedRoutes"); 
const hostelRoutes = require("./routes/hostelRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

// Load environment variables
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://your-vercel-frontend-url.vercel.app', // Replace with your actual Vercel URL
    /\.vercel\.app$/, // Allow all Vercel subdomains
    /\.railway\.app$/ // Allow all Railway subdomains
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDirs = ['./uploads', './uploads/warden-photos', './uploads/profile-photos'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve static files - make sure these paths match what's being returned to the client
app.use('/api/warden/uploads/warden-photos', express.static(path.join(__dirname, 'uploads/warden-photos')));
app.use('/api/students/uploads/profile-photos', express.static(path.join(__dirname, 'uploads/profile-photos')));

// Also serve from root paths for direct access
app.use('/uploads/warden-photos', express.static(path.join(__dirname, 'uploads/warden-photos')));
app.use('/uploads/profile-photos', express.static(path.join(__dirname, 'uploads/profile-photos')));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});