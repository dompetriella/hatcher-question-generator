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

//YUCK but ina  hurry
const cycleNature = (e) => {

    if (e.classList.contains("null")) {
        e.classList.replace("null","main")
        e.setAttribute('data-nature', 'main')
    }
    else if (e.classList.contains("main")) {
        e.classList.replace("main","secondary")
        e.setAttribute('data-nature', 'secondary')
    }
    else if (e.classList.contains("secondary")) {
        e.classList.replace("secondary","tertiary")
        e.setAttribute('data-nature', 'tertiary')
    }
    else if (e.classList.contains("tertiary")) {
        e.classList.replace("tertiary","null")
        e.setAttribute('data-nature', 'null')
    }

}

for (let i = 0; i < totalAnswers; i++) {
    const naturesHook = document.getElementById(`natures${i+1}-hook`)
    naturesList.forEach(nature => {
        let element = document.createElement("div")
        element.textContent = nature
        element.classList.add('nature-item', 'null')
        element.setAttribute("data-number", i+1)
        element.setAttribute('data-nature', 'null')
        element.addEventListener('click', (() => cycleNature(element)))
        naturesHook.appendChild(element)
    })

    const selectHook = document.getElementById(`select${i+1}`)
    backgrounds.forEach(bg => {
        element = document.createElement("option")
        element.textContent = bg
        element.value = bg
        selectHook.appendChild(element)
    })

}

const getNatureData = index => {
    let returnString = ""
    let mainList = []
    let secondaryList = []
    let tertiaryList = []
    const natureChildren = document.getElementById(`natures${index}-hook`).children
    const natureArray = [...natureChildren];
    natureArray.forEach((item) => {
        if (item.getAttribute("data-nature") === "main") mainList.push(item.textContent)
        if (item.getAttribute("data-nature") === "secondary") secondaryList.push(item.textContent)
        if (item.getAttribute("data-nature") === "tertiary") tertiaryList.push(item.textContent)
    })

    let mainString = "first: ["
    mainList.forEach(nature => {
        mainString += `"${nature}",`
    })
    mainString += "]"
    // h8 u javascript
    mainString =  mainString.slice(0, mainString.length-2) + mainString.slice(mainString.length-1);

    let secondaryString = "second: ["
    secondaryList.forEach(nature => {
        secondaryString += `"${nature}",`
    })
    secondaryString += "]"
    secondaryString =  secondaryString.slice(0, secondaryString.length-2) + secondaryString.slice(secondaryString.length-1);

    let tertiaryString = "third: ["
    tertiaryList.forEach(nature => {
        tertiaryString += `"${nature}",`
    })
    tertiaryString += "]"
    tertiaryString =  tertiaryString.slice(0, tertiaryString.length-2) + tertiaryString.slice(tertiaryString.length-1);

    returnString = `
        ${mainString},
        ${secondaryString},
        ${tertiaryString},`
    return returnString
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
        let bgValue = ""
        if (document.getElementById(`select${i+1}`).value != "") {
            bgValue = '"' + document.getElementById(`select${i+1}`).value + '"'
        }
        if (answerValue != "") {
            answerString += 
`    
    a${i+1}: {
        "text": "${answerValue}",
        ${getNatureData(i+1)}
        "background": [${bgValue}],
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