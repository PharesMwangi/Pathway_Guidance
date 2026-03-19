const express = require('express');
const cors = require('cors');
require('dotenv').config();

const assessmentRoutes = require('./routes/assessment.routes');
const resultsRoutes = require('./routes/results.routes');
const academicRoutes = require('./routes/academic.routes');
const adminRoutes = require('./routes/admin.routes');
const scoringRoutes = require('./routes/scoring.routes');

const app = express();

app.use(cors({
    origin: [process.env.ALLOWED_CORS_ORIGIN]
}));
app.use(express.json());

app.use('/api/assessment', assessmentRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/scoring', scoringRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));