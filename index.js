const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    connectDB();
    console.log("db connection sucess !");
  } catch (err) {
    console.log("getting error", err);
  }
});
