import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Questions(){
    const [question, setQuestion] = useState("");

    const [ option1, setOption1] = useState("");
    const [ option2, setOption2] = useState("");
    const [ option3, setOption3] = useState("");
    const [ option4, setOption4] = useState("");

    const [ path1, setPath1] = useState("");
    const [ path2, setPath2] = useState("");
    const [ path3, setPath3] = useState("");
    const [ path4, setPath4] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        try{
            //insert question
            const{ data: questionData, error: qError} = await supabase
            .from("assessment_questios")
            .insert([{question_text: question}])
            .select()
            .single();

            if(qError) throw qError;

            const questionId = questionData.id;

            //insert options
            const {error: optionError} = await supabase
            .from("assessment_options")
            .insert([
                {question_id: questionId, option_test: option1, pathway: path1},
                {question_id: questionId, option_test: option2, pathway: path2},
                {question_id: questionId, option_test: option3, pathway: path3},
                {question_id: questionId, option_test: option4, pathway: path4}
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
        </div>
    )
}