const express = require("express");
const app = express();
const LoginSignup = require("./routes/UserLogin");
const QuestionRoutes = require("./routes/Question");
const AnswerRoutes = require("./routes/AnswerRoutes");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
app.use(bodyParser.json());
const PORT = process.env.PORT || 8001;

app.use("/user", LoginSignup);
app.use("/questions", QuestionRoutes);
app.use("/answer", AnswerRoutes);

app.listen(PORT, () => {
  try {
    connectDB();
    console.log("db connection sucess !");
  } catch (err) {
    console.log("getting error", err);
  }
});
