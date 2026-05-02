const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/projects", require("./routes/project"));

// --- HEALTH CHECK ---
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// --- GLOBAL ERROR HANDLER (must be last) ---
// Ensures CORS headers are always present, even on crashes
app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    console.error("Server Error:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error("MongoDB connection error ❌:", err));

// --- SERVER START ---
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});