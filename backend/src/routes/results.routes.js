const express = require('express');
const router = express.Router();

const resultController = require('../controllers/results.controller');

//get results for student
router.get('/:studentId', resultController.getResults);

module.exports = router;