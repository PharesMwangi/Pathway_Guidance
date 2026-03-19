import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Questions(){
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);

    const [ option1, setOption1] = useState("");
    const [ option2, setOption2] = useState("");
    const [ option3, setOption3] = useState("");
    const [ option4, setOption4] = useState("");

    const [ path1, setPath1] = useState("");
    const [ path2, setPath2] = useState("");
    const [ path3, setPath3] = useState("");
    const [ path4, setPath4] = useState("");

    //fetch drafted questions
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

    async function handleDelete(questionId){
        const confirm = window.confirm("Are you sure you want to delete this question?")
        if (!confirm) return

        try {
            // delete options first (foreign key constraint)
            const { error: optionError } = await supabase
                .from("assessment_options")
                .delete()
                .eq("question_id", questionId)

            if (optionError) throw optionError

            // then delete the question
            const { error: questionError } = await supabase
                .from("assessment_questions")
                .delete()
                .eq("id", questionId)

            if (questionError) throw questionError

            // update UI without refetching
            setQuestions(questions.filter(q => q.id !== questionId))

            alert("Question deleted successfully.")
        } catch(error) {
            alert(error.message)
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        try{
            //insert question
            const{ data: questionData, error: qError} = await supabase
            .from("assessment_questions")
            .insert([{question_text: question}])
            .select()
            .single();

            if(qError) throw qError;

            const questionId = questionData.id;

            //insert options
            const {error: optionError} = await supabase
            .from("assessment_options")
            .insert([
                {question_id: questionId, option_text: option1, pathway: path1},
                {question_id: questionId, option_text: option2, pathway: path2},
                {question_id: questionId, option_text: option3, pathway: path3},
                {question_id: questionId, option_text: option4, pathway: path4}
            ]);

            if(optionError) throw optionError;
            alert("Question added successfully.");

            setQuestion("");
            setOption1(""); setOption2(""), setOption3(""); setOption4("");
        }catch(error){
            alert(error.message);
        }
    }
    return(
        <div style={{padding: "40px"}}>
            <h2>Create Assessment Questions</h2>

            <form onSubmit={handleSubmit}>

                <h3>Questions</h3>

                <input 
                    type="text"
                    placeholder="Enter question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)} 
                />

                <h3>Options</h3>

                <div>
                    <input 
                        type="text"
                        placeholder="Option 1"
                        onChange={(e) => setOption1(e.target.value)} />
                    
                    <select onChange={(e) => setPath1(e.target.value)}>
                        <option value="">Select Pathway</option>
                        <option value="STEM">STEM</option>
                        <option value="ARTs & Sports"> ARTs & Sports</option>
                        <option value="Social Sciences"> Social Sciences</option>
                    </select>
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Option 2"
                        onChange={(e) => setOption2(e.target.value)} />
                    
                    <select onChange={(e) => setPath2(e.target.value)}>
                        <option value="">Select Pathway</option>
                        <option value="STEM">STEM</option>
                        <option value="ARTs & Sports"> ARTs & Sports</option>
                        <option value="Social Sciences"> Social Sciences</option>
                    </select>
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Option 3"
                        onChange={(e) => setOption3(e.target.value)} />
                    
                    <select onChange={(e) => setPath3(e.target.value)}>
                        <option value="">Select Pathway</option>
                        <option value="STEM">STEM</option>
                        <option value="ARTs & Sports"> ARTs & Sports</option>
                        <option value="Social Sciences"> Social Sciences</option>
                    </select>
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Option 4"
                        onChange={(e) => setOption4(e.target.value)} />
                    
                    <select onChange={(e) => setPath4(e.target.value)}>
                        <option value="">Select Pathway</option>
                        <option value="STEM">STEM</option>
                        <option value="ARTs & Sports"> ARTs & Sports</option>
                        <option value="Social Sciences"> Social Sciences</option>
                    </select>
                </div>

                <br />

                <button type="submit">Save Question</button>

            </form>

            <hr style={{ margin: "32px 0" }} />

            <h2>Existing Questions</h2>

            {questions.length === 0 && (
                <p style={{ color: "gray" }}>No questions added yet.</p>
            )}

            {questions.map((q, index) => (
                <div key={q.id} style={{
                    marginBottom: "24px",
                    padding: "16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    backgroundColor: "#353434"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ margin: 0 }}>Q{index + 1}: {q.question_text}</h4>
                        <button
                            onClick={() => handleDelete(q.id)}
                            style={{
                                backgroundColor: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "6px 14px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            Delete
                        </button>
                    </div>

                    <ul style={{ marginTop: "10px", paddingLeft: "16px" }}>
                        {q.assessment_options.map((opt) => (
                            <li key={opt.id} style={{ marginBottom: "4px" }}>
                                {opt.option_text}
                                <span style={{
                                    marginLeft: "8px",
                                    fontSize: "0.75rem",
                                    backgroundColor: "#dbeafe",
                                    color: "#1d4ed8",
                                    padding: "2px 8px",
                                    borderRadius: "999px"
                                }}>
                                    {opt.pathway}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    )
}