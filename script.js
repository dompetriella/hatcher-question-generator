const naturesList = [
    "Ambitious",
    "Astute",
    "Aloof",
    "Bold",
    "Brave",
    "Calm",
    "Careful",
    "Clever",
    "Contemplative",
    "Daring",
    "Decisive",
    "Deep",
    "Dutiful",
    "Easygoing",
    "Energetic",
    "Flexible",
    "Focused",
    "Forgiving",
    "Humble",
    "Intuitive",
    "Jolly",
    "Logical",
    "Naive",
    "Serious",
    "Opinionated",
    "Outgoing",
    "Quirky",
    "Quiet",
    "Rash",
    "Timid",
    "Practical",
    "Rowdy",
    "Stoic"    
]

const backgrounds = [
    "",
    "Acolyte",
    "Charlatan",
    "Criminal",
    "Entertainer",
    "Guild Artisan",
    "Hermit",
    "Noble",
    "Outlander",
    "Sage",
    "Sailor",
    "Soldier",
    "Urchin"
]

const totalAnswers = 5;

for (let i = 0; i < totalAnswers; i++) {
    const naturesHook = document.getElementById(`natures${i+1}-hook`)
    naturesList.forEach(nature => {
        console.log((i+1) + " " + nature)
        let element = document.createElement("div")
        element.textContent = nature
        element.classList.add('nature-item')
        naturesHook.appendChild(element)
    })

    const selectHook = document.getElementById(`select${i+1}`)
    backgrounds.forEach(bg => {
        console.log((i+1) + " " + bg)
        element = document.createElement("option")
        element.textContent = bg
        element.value = bg
        selectHook.appendChild(element)
    })

}

const generateJSON = () => {
    let outputString = ""

    let questionInfo = document.getElementById("question-input").value
    let answer1Info = document.getElementById("answer1-input").value
    let answer2Info = document.getElementById("answer2-input").value
    let answer3Info = document.getElementById("answer3-input").value
    let answer4Info = document.getElementById("answer4-input").value
    let answer5Info = document.getElementById("answer5-input").value

    let answerString = ""

    for (let i = 0; i < 5; i++) {
        let answerValue = document.getElementById(`answer${i+1}-input`).value
        if (answerValue != "") {
            answerString += 
`    a${i+1}: {
        "text: "${answerValue}",
        "background": "[]",
        },
    `
        }
    }

    const returnString = 
`    {    
        question: "${questionInfo}",
    ${answerString}
    },` 

    document.getElementById('json-output').textContent = returnString
}