const express = require("express");
const router = express.Router();

// importing route handlers from other files
const categoryRoutes = require("./category.js");
const filmRoutes = require("./film.js");

// mounting the route handlers on the router
router.use("/categories", categoryRoutes);
router.use("/films", filmRoutes);

module.exports = router;
