import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Assessment(){
    const [ questions, setQuestions ] = useState([]);
    const [ answers, setAnswers ] = useState({});

    useEffect(() =>{
        fetchQuestions()
    }, [])

    async function fetchQuestions(){
        const {data, error} = await supabase
            .from("assessment_questions")
            .select(`
                id,
                question_text,
                assessment_options(
                    id,
                    option_text,
                    pathway
                    )
                `);
            if(error){
                console.log(error)
            }else{
                setQuestions(data);
            }
    }

    function handleSelect(questionId, optionId){
        setAnswers({
            ...answers,
            [questionId]: optionId
        });
    }

    async function handleSubmit() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
        alert(userError.message);
        return;
    }

    // Look up the student record that matches this auth user
    const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (studentError) {
        alert(studentError.message);
        return;
    }

    const studentId = studentData.id;

    const responses = Object.entries(answers).map(([questionId, optionId]) => ({
        student_id: studentId,
        question_id: questionId,
        option_id: optionId
    }));

    const { error } = await supabase
        .from("assessment_responses")
        .insert(responses);

    if (error) {
        alert(error.message);
        } else {
            alert("Assessment submitted successfully");
        }
    }


    return(
        <div style={{padding: "40px"}}>
            <h2>Career Pathway Assessment</h2>

            {questions.map((q) =>(
                <div key={q.id} style={{marginBottom: "30px"}}>

                    <h4>{q.question_text}</h4>

                    {q.assessment_options.map((opt) =>(

                        <div key={opt.id}>

                            <label htmlFor="">
                                <input 
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={opt.id}
                                    onChange={() => handleSelect(q.id, opt.id)}
                                 />
                                 {opt.option_text}
                            </label>
                        </div>
                    ))}

                </div>
            ))}

            <button onClick={handleSubmit}>Submit Assessment</button>
        </div>
    )

}