const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 8001;
const LoginSignup = require("./routes/UserLogin");
const QuestionRoutes = require("./routes/Question");

app.use("/user", LoginSignup);
app.use("/questions", QuestionRoutes);

app.listen(PORT, () => {
  try {
    connectDB();
    console.log("db connection sucess !");
  } catch (err) {
    console.log("getting error", err);
  }
});
