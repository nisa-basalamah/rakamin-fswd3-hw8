const express = require("express");
const router = express.Router();
const pool = require("../config/config.js");

// display the entire list of films
router.get("/", (request, response) => {
  const query = "SELECT * FROM film";

  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    response.status(200).json(result.rows);
  });
});

// display specific film based on id
router.get("/id/:id", (request, response) => {
  const { id } = request.params;
  const query = `
    SELECT * FROM film
    WHERE film_id = $1;
  `;

  pool.query(query, [id], (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result.rows.length === 0) {
        response
          .status(404)
          .json({ message: "No film was found with the specified ID." });
      } else {
        response.status(200).json(result.rows[0]);
      }
    }
  });
});

// display the film list by category
router.get("/category/:category", (request, response) => {
  const { category } = request.params;
  const query = `
    SELECT
        f.film_id,
        f.title,
        f.description,
        f.release_year,
        f.language_id,
        f.rental_duration,
        f.rental_rate,
        f.length,
        f.replacement_cost,
        f.rating,
        f.special_features,
        f.fulltext,
        c.category_id,
        c.name AS category_name
    FROM film_category fc
    JOIN film f
    ON fc.film_id = f.film_id
    JOIN category c
    ON fc.category_id = c.category_id
    WHERE c.name = $1
  `;

  pool.query(query, [category], (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result.rows.length === 0) {
        response.status(404).json({
          message: "No films were found with the specified category.",
        });
      } else {
        response.status(200).json(result.rows);
      }
    }
  });
});

module.exports = router;
