// server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/KnitRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes); // 👈 Add auth route

// Connect to DB & Start server
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
});
