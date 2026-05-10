const express = require("express");

const router = express.Router();

const pool = require("../config/db");



/* =========================
   GET ALL VEHICLES
========================= */

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM vehicles ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching vehicles",
    });

  }

});



/* =========================
   ADD VEHICLE
========================= */

router.post("/", async (req, res) => {

  try {

    const {
      vehicle_number,
      vehicle_type,
      fastag_id,
    } = req.body;

    const result = await pool.query(

      `INSERT INTO vehicles
      (vehicle_number, vehicle_type, fastag_id)

      VALUES ($1, $2, $3)

      RETURNING *`,

      [
        vehicle_number,
        vehicle_type,
        fastag_id,
      ]

    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error adding vehicle",
    });

  }

});



/* =========================
   DELETE VEHICLE
========================= */

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM vehicles WHERE id = $1",
      [id]
    );

    res.json({
      message: "Vehicle deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error deleting vehicle",
    });

  }

});

module.exports = router;