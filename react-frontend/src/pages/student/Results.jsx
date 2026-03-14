import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Results(){

     const [studentId, setStudentId ] = useState(null);
     const [ recommendation, setRecommendation ] = useState(null);
     const [note, setNote] = useState(null);
     const [ scores, setScores] = useState(null);

     useEffect(() =>{
        fetchStudent()
     }, [])

     async function fetchStudent(){
        
        const{ data: userData } = await supabase.auth.getUser();

        const userId = userData.user.id

        const {data, error} = await supabase
        .from("students")
        .select("id")
        .eq("user_id", userId)
        .single()

        if(error){
            console.log(error);
        }else{
            setStudentId(data.id);
        }
     }

     async function getRecommendation(){

        if(!studentId){
            alert("Student not found");
            return;
        }

        const response = await fetch("http://localhost:5000/api/scoring/calculate",{
            method: "POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({
                studentId: studentId
            })
        })

        const data = await response.json()

        setRecommendation(data.recommendedPathway)
        setScores(data.scores)
        setNote(data.note);

     }

     return(
        <div style={{padding : "40px"}}>

            <h2>Pathway Recommendation</h2>

            <button onClick={getRecommendation}>Get Recommendation</button>

            {recommendation &&(
                <div style={{marginTop: "30px"}}>

                    <h3>Recommended Pathway</h3>

                    <h1 style={{color: "green"}}>
                        {recommendation}
                    </h1>

                    {note &&(
                        <p style={{marginTop: "30px"}}>
                            {note}
                        </p>
                    )}

                    <h3>Scores</h3>

                    <ul>
                        <li>STEM: {scores.STEM}</li>
                        <li>Arts & Sports: {scores["Arts & Sports"]}</li>
                        <li>Social Sciences: {scores["Social Sciences"]} </li>
                    </ul>
                </div>
            )}

        </div>
     )
}