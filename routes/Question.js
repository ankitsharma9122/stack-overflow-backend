const express = require("express");
const Questions = require("../models/questions");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("ask", auth, async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Questions(postQuestionData);
  try {
    await postQuestion.save();
    res.status(200).json("Question successfully posted");
  } catch (error) {
    console.log(error);
    res.status(409).json("Error in posting question");
  }
  ``;
});

router.get("/all", async (req, res) => {
  try {
    const questionList = await Questions.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question not available");
  }
  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "Question successfully deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
