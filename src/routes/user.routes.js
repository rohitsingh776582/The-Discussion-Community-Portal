const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth.middleware');
const validateQuestion = require('../validation/question.validator');
const validateAnswer = require('../validation/validateAnswer');

const {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    deleteUserAndData,
    QuestionSearch
} = require('../controllers/question.controller');

const {
    addAnswer,
    getAnswersByQuestionId,
    updateAnswer,
    deleteAnswer,
    getAllAnswers,
    getMyAnswers,
    GetNameAndemail,
    searchAnswers

} = require('../controllers/answer.Controller');



// testing 
router.post('/question/add', verifyToken, validateQuestion, addQuestion);
router.post('/answer/add', verifyToken, validateAnswer, addAnswer);
router.get('/questions', verifyToken, getAllQuestions);
router.get('/question/:id', getQuestionById);
router.get('/answers/:questionId', getAnswersByQuestionId);
router.get('/getAllAnswer', verifyToken, getAllAnswers);
router.get('/my-answers', verifyToken, getMyAnswers);
router.get('/my-question', verifyToken, getQuestion);

router.put('/updateAnswer/:id', verifyToken, validateAnswer, updateAnswer);
router.delete('/deleteAnswer/:id', verifyToken, deleteAnswer)
// update date question
router.put('/updatedquestion/:id', verifyToken, updateQuestion);
router.delete('/deletequestion/:id', verifyToken, deleteQuestion);

// get name and email
router.get('/getName_and_Email/:id', verifyToken, GetNameAndemail)

// User Delete API with Cascade:
router.delete('/deleteUserAndData/:id', verifyToken, deleteUserAndData)

// searching Api
router.get('/searchAnswer', verifyToken, searchAnswers);

// question search api
router.get('/questionSearch', QuestionSearch);





module.exports = router;

