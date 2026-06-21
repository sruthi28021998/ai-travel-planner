require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
// Added 'credentials: true' to ensure cookies/auth headers are handled properly
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));
app.use(express.json());

// 3. Health Check
app.get("/", (req, res) => {
    res.send("AI Travel Planner API Running");
});

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// 5. Global Error Handler
// This catches unexpected crashes and sends a JSON response instead of HTML
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({ message: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("JWT_SECRET is loaded:", process.env.JWT_SECRET ? "YES" : "NO");
});