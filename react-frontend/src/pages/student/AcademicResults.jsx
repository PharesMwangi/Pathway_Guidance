import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"

export default function AcademicResults(){
    const [subjects, setSubjects ] = useState ([])
    const [ selectedGrade, setSelectedGrade ] = useState(7)
    const [ grades, setGrades ] = useState({})
    const [ studentId, setStudentId ] = useState(null)

    const gradeMap = {
        EE1: 95,
        EE2: 82,
        ME1: 66,
        ME2: 49,
        AE1: 35, 
        AE2: 25,
        BE1: 15,
        BE2: 5
    }

    useEffect(() =>{
        fetchSubjects()
        fetchStudents()
    }, [])

    async function fetchSubjects(){
        const {data} = await supabase
            .from("subjects")
            .select("*")

        setSubjects(data)
    }

    async function fetchStudents(){
        const { data: userData } = await supabase.auth.getUser()
        const userId = userData.user.id

        const { data, error } = await supabase
            .from("students")
            .select("id")
            .eq("user_id", userId)
            .single()

        if (error) {
            console.log("fetchStudents error:", error.message)
            return  // 👈 stop here instead of crashing
        }

        if (data) setStudentId(data.id)  // 👈 only set if data exists
    }

    function handleGradeChange(subjectId, grade){
        setGrades({
            ...grades,
            [subjectId]: grade
        })
    }

    async function handleSubmit(){
        if (!studentId) {
            alert("Student record not found. Please contact your administrator.")
            return
        }
        const rows = subjects.map(subject => ({
            student_id: studentId,
            grade_level: selectedGrade,
            subject_id: subject.id,
            score: gradeMap[grades[subject.id]]
        }))

        const {error} = await supabase
        .from("academic_results")
        .insert(rows)

        if(error){
            alert(error.message)
        }else{
            alert("Results saved successfully.")
        }
    }

    return(
        <div>
            <h2>Academic Results</h2>

            <h4>Input your academic results. They will help to give insight on recommendation.</h4>

            <label>Select Grade : </label>

            <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(Number(e.target.value))}>
                <option value={7}>Grade 7</option>
                <option value={8}>Grade 8</option>
                <option value={9}>Grade 9</option>
            </select>

            <br /><br />

            {subjects.map(subject => (
                <div key={subject.id}>
                    <label> {subject.name} : </label>

                    <select
                    onChange={(e) =>
                        handleGradeChange(subject.id, e.target.value)
                    }
                    >
                        <option>Select Grade</option>
                        <option>EE1</option>
                        <option>EE2</option>
                        <option>ME1</option>
                        <option>ME2</option>
                        <option>AE1</option>
                        <option>AE2</option>
                        <option>BE1</option>
                        <option>BE2</option>
                    </select>
                </div>

            ))}

            <br />

            <button onClick={handleSubmit}>
                Save Results
            </button>
        </div>
    )
}