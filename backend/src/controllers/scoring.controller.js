const supabase = require ("../config/db");
const { calculatePathway } = require("../services/scoring.service");

async function getRecommendation(req, res){
    try {
        
        const { studentId } = req.body;

        //academic results
        const{ data: academicResults, error: academicError } = await supabase
        .from("academic_results")
        .select(`
            score,
            subject_id,
            subjects(name)`)
        .eq("student_id", studentId)

        if( academicError ) throw academicError

        const formattedAcademic = academicResults.map(r =>({
            score: r.score,
            subject_name: r.subjects?.name
        }))

        //assessment responses
        const{data: responses, error: responseError} = await supabase
        .from("assessment_responses")
        .select(`
            assessment_options(pathway)`)
        .eq("student_id", studentId)

        if( responseError) throw responseError

        const formattedAnswers = responses.map(r =>({
            pathway: r.assessment_options.pathway
        }))

        //calculate pathway
        const result = calculatePathway(
            formattedAcademic,
            formattedAnswers
        )

        res.json(result)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { getRecommendation }