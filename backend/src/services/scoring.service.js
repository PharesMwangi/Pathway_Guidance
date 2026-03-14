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

    return{
        scores: pathwayScores,
        recommendedPathway: recommended
    }
}

module.exports = { calculatePathway };