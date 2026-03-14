function calculatePathway(academicResults, assessmentAnswers){

    const pathwayScores ={
        STEM: 0,
        "Arts & Sports": 0,
        "Social Sciences": 0
    }

    const pathwayCounts ={
        STEM: 0,
        "Arts & Sports": 0,
        "Social Sciences" : 0
    }

    const subjectGroups={
        STEM: ["Mathematics", "Integraded Science & Technology", "Agriculture"],
        "Arts & Sports" : ["Pre-Technical Studies", "Creative Arts"],
        "Social Sciences" : [ "English", "Kiswahili", "Social Studies", "Religioes Studies"]
    }

    //academic scoring
    academicResults.forEach(result =>{

        const subject = result.subject_name
        const score = result.score

        Object.keys(subjectGroups).forEach(pathway =>{

            if(subjectGroups[pathway].includes(subject)){
                pathwayScores[pathway] += score
                pathwayCounts[pathway] +=1
            }

        })
    })

    //calculate averages
    Object.keys(pathwayScores).forEach(pathway =>{

        if(pathwayCounts[pathway] >0){
            pathwayScores[pathway] =
                pathwayScores[pathway] /pathwayCounts[pathway]
        }

    })

    //assessment scoring
    assessmentAnswers.forEach(answer =>{

        pathwayScores[answer.pathway] += 10

    })

    //find best pathway
    let recommended = null
    let highest = -Infinity

    Object.entries(pathwayScores).forEach(([pathway, score])=>{

        if(score > highest){
            highest = score
            recommended = pathway
        }

    })

    // add explanation
    let note = ""
    switch(recommended){
        case "STEM":
            note = "This recommendation was made because your average scores in STEM subjects were the highest, and your assessment answers also aligned with STEM interests."
            break
        case "Arts & Sports":
            note = "This recommendation was made because you performed strongly in creative and technical subjects, and your assessment responses showed interest in arts and sports."
            break
        case "Social Sciences":
            note = "This recommendation was made because your language and social studies scores were strong, and your assessment answers leaned toward social sciences."
            break
    }

    return{
        scores: pathwayScores,
        recommendedPathway: recommended,
        note: note
    }
}

module.exports = { calculatePathway };