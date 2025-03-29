const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); // ✅ Use User model instead

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/hostelDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Login Route (for Students, Wardens, Admins)
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // 🔍 Find user (Student by Application No, All by Email)
    const user = await User.findOne({
      $or: [{ applicationNo: identifier }, { email: identifier }],
      password,
    });

    // ❌ If no user found
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Return user data
    res.json({ success: true, name: user.name, role: user.role, userId: user._id });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
