const express = require('express');
const router = express.Router();

const academicController = require('../controllers/academic.controller');

router.post('/academic_scores', academicController.addAcademicScores);

module.exports = router;