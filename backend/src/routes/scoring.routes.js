const express = require("express");
const router = express.Router();

const { getRecommendation } = require("../controllers/scoring.controller")

router.post("/calculate", getRecommendation)

module.exports = router