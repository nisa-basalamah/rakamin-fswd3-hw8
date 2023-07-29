const pool = require("../config/config.js");
const fs = require("fs");

const seedQuery = fs.readFileSync("db/seeding.sql", { encoding: "utf8" });
pool.query(seedQuery, (error, result) => {
  if (error) {
    throw error;
  }

  console.log("Seeding completed.");
  pool.end();
});
