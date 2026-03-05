const express = require('express');
const router = express.Router();

const assessmentController = require('../controllers/assessment.controller');

//create question
router.post('/questions', assessmentController.createQuestions);

//create subject
router.post('/subjects', assessmentController.createSubject);

module.exports = router;