//set global variables
let totalCorrect = 0
let totalWrong = 0
let qCount = 0
let selectedAnswer = ""
let gameMessage
let missed = 0

//Initialize Game
function init() {
    displayQuestion(0) //Display first Q
}

//Display Question based on Index of the array
function displayQuestion(index) {
    compTime();
    console.log("inside display Q" + qCount)
    //Set up title and timer
    document.querySelector('#game-content').innerHTML = `<h1>Biology Trivia Game</h1>          
    <div class = "remaining_time">Time Remaining</div> <div id="display">00:00</div>
      <div id="content">
      </div>`

    //Display Question
    let questionDiv = document.createElement('div')
    questionDiv.innerHTML = `Q${qCount+1}: ${questions[index].question}`
    questionDiv.className = 'Q'
    document.querySelector('#content').append(questionDiv)

    //Display Buttons for Choices
    for (let i = 0; i < questions[index].choiceList.length; i++) {
        let btnElm = document.createElement('a')
        btnElm.innerHTML = questions[index].choiceList[i]
        btnElm.className = 'waves-effect waves-light btn choiceBtn'
        btnElm.setAttribute('value', 'Q' + index + ' ' + i)
        btnElm.setAttribute('name', 'Q' + index)
        document.querySelector('#game-content').append(btnElm)
        document.querySelector('#game-content').append(document.createElement('br'))
    }

    //Display Submit Button
    let submitBtn = document.createElement('button')
    submitBtn.className = 'red center btn submit'
    submitBtn.innerHTML = 'Submit Answer'
    submitBtn.id = "SubmitButton"
    document.querySelector('#game-content').append(submitBtn)
}


//Check Answer based on user input 
function checkAnswer(index) {
    clearInterval(timer)

    //No Selection
    if (selectedAnswer === "") {
        missed++
        displayAnswer("MISSED!!")
    }

    let answerArray = selectedAnswer.split(' ') //Split answer by a space to get question code and answer code
    let answerCode
    let QuestionCode = answerArray[0].substring(1)

    //decode questioncode
    switch (questions[QuestionCode].answer) {
        case 'a':
            {
                answerCode = '0';
                break;
            }
        case 'b':
            {
                answerCode = '1';
                break;
            }
        case 'c':
            {
                answerCode = '2';
                break;
            }
        case 'd':
            {
                answerCode = '3';
                break;
            }
    }

    //Code for corrrect answer
    let realAnswer = "Q" + QuestionCode + " " + answerCode
    let correct = false;

    //check for correct answer code and selected answer code
    if (selectedAnswer === realAnswer) {
        gameMessage = "CORRECT!!"
        totalCorrect++
    } else {
        gameMessage = "WRONG!!"
        totalWrong++
    }

    //Display Answer
    displayAnswer(gameMessage)
}

function displayAnswer(message) {
    //Clear the time, not needed for answer
    clearInterval(timer)
    document.querySelector('#game-content').innerHTML = `<div id="content"><h2>${message}</h2><div id="explaination">${questions[qCount].explaination}</div></div>`
    //setTimeout for the answer for 3 seconds and then display answer
    setTimeout(function() {
        console.log("inside display Answer " + qCount + " " + questions.length)
        qCount++
        if (qCount === questions.length) {
            displayScore()
        } else {
            selectedAnswer = ""
            displayQuestion(qCount)
        }
    }, 3000)
}

//Display Score at the end of question array
function displayScore() {
    //Set Up ScoreBoard
    document.querySelector('#game-content').innerHTML = `<div class="score_board"><h2>YOUR SCORE</h2>
    Total Questions:${questions.length}<br><br>
    Total Correct:${totalCorrect}<br><br>
    Total wrong: ${totalWrong}<br><br>
    Total Missed:${missed}<br><br></div><br><br>`

    //Set up New Game Button
    let newgameBtn = document.createElement('button')
    newgameBtn.innerHTML = 'New Trivia Quiz'
    document.querySelector('#game-content').append(newgameBtn)
    newgameBtn.addEventListener('click', init)
}

//Add Event Listeners to each of the choice buttons and Submit Btn
document.addEventListener('click', e => {

    if (e.target.className === 'waves-effect waves-light btn choiceBtn') {
        selectedAnswer = e.target.getAttribute('value')
        let btnArray = document.querySelectorAll('.choiceBtn')
        btnArray.forEach(element => {
            //Change class of Button Selected
            if (element.getAttribute('value') === selectedAnswer)
                element.className = "waves-effect waves-light btn choiceBtn blue"
            else
                element.className = "waves-effect waves-light btn choiceBtn"
        });
        console.log(btnArray)
    }
    if (e.target.id === "SubmitButton") {
        checkAnswer(qCount)
    }
})

//Start Game when page loads
init()