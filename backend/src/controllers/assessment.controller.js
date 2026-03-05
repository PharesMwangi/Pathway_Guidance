const supabase = require('../config/db');

//get all questions
exports.getQuestions = async (req, res) =>{
    try{
        const { data, error} = await supabase
        .from('assessment_questions')
        .select('*');

        if(error) throw error;
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//submit all answers
exports.submitAnswers = async (req, res) =>{
    try{
        const { student_id, responses} = req.body;

        const { data, error } = await supabase
        .from('assessment_answers')
        .insert(responses.map(r => ({
            student_id,
            question_id: r.question_id,
            response_value: r,response_value
        })));

        if (error) throw error;
        res.status(200).json({message: "Assessment submitted successfully", data});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//create new questions (admin)
exports.createQuestions = async (req, res) =>{
    try{
        const { question_text, category_id } = req.body;

        const { data, error } = await supabase
        .from("assessment_questions")
        .insert([{ question_text, category_id }]);

        if (error) throw error;
        res.status(200).json({ message: "Question created", data});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//create subject(admin)
exports.createSubject = async( req, res) =>{
    try{
        const { subject_name} = req.body;

        const{ data, error } = await supabbase
        .from("subjects")
        .insert([{ subject_name}]);

        if(error) throw error;
        res.status(200).json({ message: "Subject created", data});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};