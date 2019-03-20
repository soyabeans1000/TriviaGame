let minutes = 0
let seconds = 0
let count = 0
let displaySeconds = ""
let displayMinutes = ""
let totaltime = 1
let timeUp


function compTime() {

  count = 0;


    timer = setInterval(_ => {
        //Send message to game after timer is up
        timeUp = false
        //Count the next minute 
        count++

        minutes = Math.floor(count / 60) //minutes
        seconds = count % 60 // seconds

        minutes = (totaltime - minutes) - 1
        seconds = 60 - seconds

        displaySeconds = seconds
        displayMinutes = minutes

        if (seconds < 10) {
            displaySeconds = '0' + seconds
        }

        if (minutes < 10) {
            displayMinutes = '0' + minutes
        }

        //display time 
        document.querySelector('#display').textContent = `${displayMinutes}:${displaySeconds}`

        //if time is up 
        if (minutes === -1 && seconds === 60) {

            clearInterval(timer)
            timeUp = true
            //Time up! Display answer
            displayAnswer('TIME UP!')
        }
    }, 1000)
}