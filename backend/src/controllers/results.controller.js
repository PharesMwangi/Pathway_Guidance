const supabase = require('../config/db');

exports.getResults = async (req, res) =>{
    try{
        const {student_id} = req.params;

        const {data, error} = await supabase
        .from('pathway_results')
        .select('*')
        .eq('student_id', student_id);

        if(error) throw error;
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};