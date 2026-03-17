import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Subjects(){
    const [subjects, setSubjects] = useState([])
    const [subjectName, setSubjectName] = useState("")

    useEffect(() =>{
        fetchSubjects()
    }, [])

    async function fetchSubjects(){
        const { data, error } = await supabase
        .from ("subjects")
        .select("*")
        .order("id", {ascending: true})

        if(error) {
            alert(error.message)
        }else{
            setSubjects(data)
        }
    }

    async function addSubject(){
        if(!subjectName){
            alert("Please enter a subject name");
            return;
        }

        const { error } =await supabase
        .from ("subjects")
        .insert ([{ name: subjectName}])

        if (error){
            alert(error.message)
        }else{
            setSubjectName("")
            fetchSubjects()
        }
    }

    async function deleteSubject(id){
        const { error } = await supabase
        .from("subjects")
        .delete()
        .eq("id", id)

        if(error){
            alert(error.message)
        }else{
            fetchSubjects()
        }
    }

    return(
        <div>
            <h2>Manage Subjects</h2>

            <input 
            type="text"
            placeholder="subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)} />

            <button onClick={addSubject}>Add Subject</button>

            <hr />

            <h3>Subjects</h3>

            {subjects.map((subject) => (
                <div key={subject.id}>

                    {subject.name}

                    <button onClick={() =>deleteSubject(subject.id)}>Delete</button>

                </div>
            ))}
        </div>
    )
}