require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const appointmentRoutes = require("./routes/appointmentRoutes");
const careInfoRoutes = require("./routes/careInfoRoutes");

const app = express();

// Middleware
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/care-info", careInfoRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "healthcare-backend" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
