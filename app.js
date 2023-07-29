require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index.js");

app.use(router);

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
