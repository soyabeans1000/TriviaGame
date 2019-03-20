//set global variables
let totalCorrect = 0
let totalWrong = 0
let qCount = 0
let selectedAnswer = ""
let gameMessage
let missed = 0

//Initialize Game
function init(){ 
  displayQuestion(0)
 }

//Display Question by Array Index
 function displayQuestion(index)
 {
     compTime();

   console.log("inside display Q" + qCount)
 
     document.querySelector('#game-content').innerHTML = `<h1>Biology Trivia Game</h1>          
 <div class = "remaining_time">Time Remaining
 </div>
 <div id="display">00:00
 </div>
 <div id="content">
 </div>`   
     
     let questionDiv = document.createElement('div')
  questionDiv.innerHTML = `Q${qCount+1}: ${questions[index].question}`
 questionDiv.className = 'Q'
 document.querySelector('#content').append(questionDiv)
 
 
 for (let i = 0; i < questions[index].choiceList.length; i++) 
    {
     let btnElm = document.createElement('a')
     btnElm.innerHTML = questions[index].choiceList[i]
    btnElm.className = 'waves-effect waves-light btn choiceBtn'
     btnElm.setAttribute('value', 'Q' + index + ' ' + i)
     btnElm.setAttribute('name', 'Q' + index)
       document.querySelector('#game-content').append(btnElm)
       document.querySelector('#game-content').append(document.createElement('br'))
    }
   
   let submitBtn = document.createElement('button')
   submitBtn.className = 'red center btn submit'
  submitBtn.innerHTML = 'Submit Answer'
  submitBtn.id = "SubmitButton"
   document.querySelector('#game-content').append(submitBtn)
 
 }
 


function checkAnswer(index)
{
  clearInterval(timer)

 if (selectedAnswer === "")
 {
   missed++
 displayAnswer("NO SELECTION!!!")
 }
 


  let answerArray = selectedAnswer.split(' ')
  
  let answerCode
  let QuestionCode = answerArray[0].substring(1)

  console.log("QCode=> " + QuestionCode)

  switch (questions[QuestionCode].answer)
{
  case 'a': 
  {
    answerCode = '0';
  break;
  }
  case 'b':  
  {answerCode = '1';
  break;
}
  case 'c': 
  {
    answerCode = '2';
  break;
    }
      case 'd':
  {answerCode = '3';
  break;
  }
  }

let realAnswer = "Q" + QuestionCode  + " " + answerCode


console.log("Cryptic Real Answer=>" + realAnswer + "QCount=>" + qCount)
let correct = false;
if (selectedAnswer === realAnswer)
{
  gameMessage = "YOU ARE CORRECT!!!"
    totalCorrect++
}
else
{

  gameMessage = "YOU ARE WRONG!!!"  
  totalWrong++
 
}
displayAnswer(gameMessage)

}


function displayAnswer(message){
  clearInterval(timer)


    document.querySelector('#game-content').innerHTML = `<div id="content"><h2>${message}</h2><div id="explaination">${questions[qCount].explaination}</div></div>`   


setTimeout(function(){
  
  console.log("inside display Answer " + qCount + " " + questions.length)

  qCount++
  
  if (qCount === questions.length)
  {
    displayScore() 
  }
  else { 
    selectedAnswer = ""

    displayQuestion(qCount) } 
},2000)  



}


function displayScore()
{

document.querySelector('#game-content').innerHTML = `<div class="score_board"><h2>YOUR SCORE</h2>
Total Questions:${questions.length}<br><br>
Total Correct:${totalCorrect}<br><br>
Total wrong: ${totalWrong}<br><br>
Total Missed:${missed}<br><br></div><br><br>` 

 let newgameBtn = document.createElement('button')
  newgameBtn.innerHTML = 'New Trivia Quiz'
   document.querySelector('#game-content').append(newgameBtn)
   newgameBtn.addEventListener('click',init)
 }



document.addEventListener('click', e => {
  // make sure thing clicked is random number button and that the game has not ended yet
  if (e.target.className === 'waves-effect waves-light btn choiceBtn') {
  selectedAnswer =  e.target.getAttribute('value') 



  let btnArray = document.querySelectorAll('.choiceBtn')

  btnArray.forEach(element => {

    if (element.getAttribute('value') === selectedAnswer)
    element.className = "waves-effect waves-light btn choiceBtn blue"
    else 
    element.className = "waves-effect waves-light btn choiceBtn"
    
  });

  console.log(btnArray)

}


    if (e.target.id === "SubmitButton"){
          checkAnswer(qCount)
    }


})

init()
