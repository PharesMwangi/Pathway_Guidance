const supabase = require('../config/db');

exports.addAcademicScores = async (req, res) =>{
    try{
        const { student_id, subject_id, grade_level, score } = req.body;

        const {data, error } = await supabase
        .from('academic_results')
        .insert([
            {
                student_id,
                subject_id,
                grade_level,
                score
            }
        ]);

        if(error) throw error;
        res.status(200).json({ 
            message: "Academic scores added.", 
            data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
}