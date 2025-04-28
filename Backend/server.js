const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const studentFormRoutes = require("./routes/studentFormRoutes");
// Import the new hostel routes
const hostelRoutes = require("./routes/hostelRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://OmSaiVikranth:HMS_SE_CodeMonkeys@cluster0.zvkzt5n.mongodb.net/hostelDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Login Route
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
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

// Mount the hostel routes under /api/hostels
app.use("/api/hostels", hostelRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});