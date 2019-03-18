//set global variables
let totalQuestions = 3
let totalCorrect = 0
let totalWrong = 0
let qCount = 0
let selectedAnswer
let gameMessage

questions = [{
  question: "The energy used by most living beings on the earth to feed, move, and reproduce all comes from what original source?",
  choiceList: ["the soil","the sun", "the water", "Twinkies"],
  answer: 'a',
  explaination:`To Do`
},
{
  question: "Which of the following is composed of nervous tissue?",
  choiceList: ["the skin", "a paper mache statue of Jerry Lewis", "the spinal cord", "the liver"],
  answer: 'a',
  explaination:"The spinal cord is really a direct extension of the brain."

},
{
  question: "A leech survives by feeding off the blood of other, larger beings. What is this type of behavior known as?",
  choiceList: ["working for the IRS", "mutualism", "parasitism","heterophagism"],
  answer: 'c',
  explaination:"Parasitism"
},
{
  question: "Where are you more likely to find the largest number of living organisms (including microbes) in one gallon of water?",
  choiceList: ["Arctic Ocean","Caspian Sea", "Caribbean Sea", "Mick Jagger's swimming pool"],
  answer: 'b',
  explaination:"To Do"
},
{
  question: "Which of the following lives in a cocoon for part of its life cycle?",
  choiceList: [ "Dick Clark", "a mollusk","a moth","a crab"],
  answer: 'c',
  explaination:"A cocoon protects the pupa of some insects during metamorphosis."
},
{
  question: "Why do fish swim in schools?",
  choiceList: [
    "to get to college", "to chase away larger fish", "to confuse predators","to surround prey"
   ],
  answer: 'c',
  explaination:"Apparently, predators must focus on just one fish in order to strike successfully. Distracted by the school, they lose focus."
},

{
  question: "Which of the following animals are gutless?",
  choiceList:  ["sea cucumbers",  "salamanders",  "earthworms",  "tapeworms" ],
  answer: 'd',
  explaination:"Because the tapeworm lives inside the gut of a host, it has evolved to absorb nutrients directly from outside its body."
},
{
  question: "What is the scientific term for a 'cold-blooded' animal?",
  choiceList: ["a homeotherm", "a prosecuting attorney", "a cryotherm", "a poikilotherm"],
  answer: 'c',
  explaination:"Poikilotherms such as reptiles aren't actually cold. Their body temperature varies and is regulated by the environment and their behavior. Perhaps more common is the term 'ectotherm,' referring to the fact that the animals must rely on external heat."
}]

//Add Listeners to the choices and check for correct answers (make a function to check for correct answers) 


function checkAnswer(index)
{
  clearInterval(timer)
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

console.log("Cryptic Real Answer=>" + realAnswer)
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


  console.log(`${questions[qCount].explaination}`)
  document.querySelector('#game-content').innerHTML = `<div id="content">${message}<br>${questions[qCount].explaination}</div>`   


setTimeout(function(){

  qCount++
  if (qCount === questions.length)
  {
    displayScore() 
  }
  else  displayQuestion(qCount)
},2000)  

}





function displayQuestion(index)
{

  compTime();

    document.querySelector('#game-content').innerHTML = `<h1>Trivia Game</h1>          
<div class = "remaining_time">Time Remaining
</div>
<div id="display">00:00
</div>
<div id="content">
</div>`   
    
    let questionDiv = document.createElement('div')
 questionDiv.innerHTML = questions[index].question
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
 submitBtn.innerHTML = 'Submit Answers'
 submitBtn.id = "SubmitButton"
  document.querySelector('#game-content').append(submitBtn)

}


document.addEventListener('click', e => {
  // make sure thing clicked is random number button and that the game has not ended yet
  if (e.target.className === 'waves-effect waves-light btn choiceBtn') {
  selectedAnswer =  e.target.getAttribute('value')  }


    if (e.target.id === "SubmitButton"){
          checkAnswer(qCount)
    }


})

function displayScore()
{
  
  document.querySelector('#game-content').textContent = "Game Score Computed here"

document.querySelector('#game-content').innerHTML = `<div class="score_board"><div class="score_title">Your Score</div> <br> Total Correct:${totalCorrect}<br>
Total wrong: ${totalWrong}</div><br>` 

 let newgameBtn = document.createElement('button')
  newgameBtn.innerHTML = 'New Game'
   document.querySelector('#game-content').append(newgameBtn)
   newgameBtn.addEventListener('click',init)
 }



function init(){ 
 displayQuestion(0)
}


init()
