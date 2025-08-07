const AnswerModels = require('../models/Answer.models');
const UserModel = require('../models/user.model');
const QuestionModel = require("../models/Question.models");


const addAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId, answer } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const newAnswer = await AnswerModels.create({
      questionId,
      answer,
      answeredBy: userId,
      answeredByName: user.name
    });
    res.status(200).json({
      success: true,
      message: "Answer added successfully",
      data: newAnswer,
    });
  } catch (err) {
    console.error("Add answer error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAnswersByQuestionId = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await AnswerModels.find({ questionId }).populate('answeredBy', 'name');
    res.status(200).json({ success: true, data: answers });
  } catch (err) {
    console.error("Get answers error:", err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update Anser
const updateAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const userId = req.user.id;
    const { answer } = req.body;
    const existingAnswer = await AnswerModels.findById(answerId);
    if (!existingAnswer) {
      return res.status.json({ success: false, message: 'Answer not found ' })
    }
    if (existingAnswer.answeredBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' })
    }
    existingAnswer.answer = answer;
    await existingAnswer.save();
    res.status(200).json({
      success: true,
      message: "Answer updated successfully",
      data: existingAnswer
    })
  }
  catch (err) {
    console.error("Update answer error:", err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

// Delete Answer
const deleteAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    const existingAnswer = await AnswerModels.findById(answerId);
    if (!existingAnswer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }
    if (existingAnswer.answeredBy.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this answer' });
    }
    await AnswerModels.findByIdAndDelete(answerId);
    res.status(200).json({
      success: true,
      message: "Answer deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Get all answer 
const getAllAnswers = async (req, res) => {
  try {
    const ansewer = await AnswerModels.find().populate('answeredBy', 'name');
    res.status(200).json({ success: true, data: ansewer })
  }
  catch (err) {
    console.error("Get all answer error ", err);
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

getMyAnswers = async (req, res) => {
  try {
    console.log("User from token:", req.user);
    const userId = req.user.id;
    const answers = await AnswerModels.find({ answeredBy: userId })
      .populate("questionId", "title");
    return res.status(200).json({
      success: true,
      data: answers
    });
  } catch (error) {
    console.error("❌ Error fetching user's answers:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//name or name or email
GetNameAndemail = async (req, res) => {

  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).select('name email createdAt');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
  catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// search api 
const searchAnswers = async (req, res) => {
  const { q } = req.query;
  console.log("answer", q);
  if (!q) {
    return res.status(400).json({ success: false, message: "Query 'q' is required" });
  }
  console.log("Q: ", q);
  try {
    const results = await AnswerModels.find({
      answer: q
    })
      .populate("questionId", "title")
      .populate("answeredBy", "name");
    res.status(200).json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


module.exports = {
  getMyAnswers,
  addAnswer,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer,
  getAllAnswers,
  GetNameAndemail,
  searchAnswers
};
