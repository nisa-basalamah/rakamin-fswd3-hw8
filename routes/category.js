const express = require("express");
const router = express.Router();
const pool = require("../config/config.js");

// display list categories
router.get("/", (request, response) => {
  const query = "SELECT * FROM category";

  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    response.status(200).json(result.rows);
  });
});

module.exports = router;
