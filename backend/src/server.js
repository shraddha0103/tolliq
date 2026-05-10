const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);

pool.connect((err) => {

  if (err) {
    console.log("Database connection error", err);
  } else {
    console.log("Database connected successfully");
  }

});

app.get("/", (req, res) => {
  res.send("TollIQ Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});