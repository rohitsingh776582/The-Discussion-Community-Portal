
const QuestionModels = require("../models/Question.models");
const userModel = require("../models/user.model");
const Answer = require("../models/Answer.models");

// new code hai 
const addQuestion = async (req, res) => {
  try {
    const { title, mediaUrl } = req.body;
    const userId = req.user.id;
    console.log("userid", userId)
    // ✅ Get user details from DB
    const user = await userModel.findById(userId).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // ✅ Save user name/email into question
    const question = await QuestionModels.create({
      title,
      mediaUrl,
      askedBy: user._id,
      user: {
        name: user.name,
        email: user.email
      }
    });

    res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: question,
    });
  } catch (error) {
    console.error("❌ Error adding question:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionModels.find().populate('askedBy', 'name');
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error("Get all questions error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get Question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionModels.findById(req.params.id).populate('askedBy', 'name');
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error("Get question by ID error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update Question (by the user who asked it)
const updateQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, mediaUrl } = req.body;
    const question = await QuestionModels.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    // Check ownership
    if (question.askedBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this question' });
    }
    question.title = title || question.title;
    question.mediaUrl = mediaUrl || question.mediaUrl;
    await question.save();
    res.status(200).json({ success: true, message: 'Question updated', data: question });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Delete Question (by the user who asked it)
const deleteQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    console.log("userId:", userId, "role:", userRole);
    const question = await QuestionModels.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    if (question.askedBy.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this question' });
    }

    await QuestionModels.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// get my question
const getQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const question = await QuestionModels.find({ askedBy: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: question
    })
  }
  catch (error) {
    console.error("❌ Error fetching user's questions:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

//  User Delete API with Cascade:
const deleteUserAndData = async (req, res) => {
  try {
    const userId = req.params.id;
    const questionResult = await QuestionModels.deleteMany({ askedBy: userId });
    const answerResult = await Answer.deleteMany({ answeredBy: userId });
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      message: "User, questions, and answers deleted successfully",
      deletedQuestions: questionResult.deletedCount,
      deletedAnswers: answerResult.deletedCount
    });

  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// question search 

const QuestionSearch = async (req, res) => {
  const { q } = req.query;
  console.log("Question:", q);

  try {
    if (!q) {
      return res.status(400).json({ success: false, message: "Query 'q' is required" });
    }
    const question = await QuestionModels.findOne({
      title: q
    })
      .populate("askedBy", "name");
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    // Step 2: Answer find karo using question._id
    const answers = await Answer.find({
      questionId: question._id
    })
      .populate("answeredBy", "name");

    res.status(200).json({
      success: true,
      question,
      answers
    });

  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};



// admin delete question 
module.exports = {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  deleteUserAndData,
  QuestionSearch
};

