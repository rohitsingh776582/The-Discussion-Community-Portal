  
const { body, validationResult } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const validateQuestion = [
  body('title')
    .notEmpty()
    .withMessage('question title is required')
    .isLength({ min: 3, max:1000})
    .withMessage('Question must be within 3 to 1000 words range')
    ,
    validationMiddleware
];

module.exports = validateQuestion;
