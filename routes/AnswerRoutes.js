const express = require("express");
const Questions = require("../models/questions");
const router = express.Router();
const auth = require("../middleware/auth");

router.patch("/post/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  updateNoofQuestions(_id, noOfAnswers);
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: {
        answer: [
          {
            answerBody,
            userAnswered,
            userId,
          },
        ],
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("Error while updating");
  }
});

const updateNoofQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: {
        noOfAnswers: noOfAnswers,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

router.patch("/delete/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  updateNoofQuestions(_id, noOfAnswers);
  try {
    await Questions.updateOne(
      { _id },
      {
        $pull: {
          answer: { _id: answerId },
        },
      }
    );
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(405).json(error);
  }
});

module.exports = router;