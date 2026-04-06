const HOURS_DISPLAY = document.getElementById('hours')
const MINUTES_DISPLAY = document.getElementById('minutes')
const SECONDS_DISPLAY = document.getElementById('seconds')
const MILLISECOND_DISPLAY = document.getElementById('milliseconds')

const START_STOP_BTN = document.getElementById('start-stop-btn')
const RESET_BTN = document.getElementById('reset-btn')

START_STOP_BTN.addEventListener('click', start)
RESET_BTN.addEventListener('click', reset)
const startAudio = new Audio('./audio/xbox_start_up.mp3')
const stopAudio = new Audio('./audio/xbox_off.mp3')
startAudio.volume = 0.5;

let hours = 0
let minutes = 0
let seconds = 0
let milliseconds = 0
let timer

function setInitialTime() {
    const time = JSON.parse(localStorage.getItem('time'))
    if(time){
        hours = time.hours
        minutes = time.minutes
        seconds = time.seconds
        milliseconds = time.milliseconds
    }

    HOURS_DISPLAY.innerText = String(hours).padStart(2, '0')
    MINUTES_DISPLAY.innerText = String(minutes).padStart(2, '0')
    SECONDS_DISPLAY.innerText = String(seconds).padStart(2, '0')
    MILLISECOND_DISPLAY.innerText = String(milliseconds).padStart(3, '0')
}

function updateStopwatch() {
    milliseconds++
    if(milliseconds == 100){
        milliseconds = 0
        seconds++
    }
    if (seconds == 60) {
        seconds = 0
        minutes++
    }
    if (minutes == 60) {
        minutes = 0
        hours++
    }
    if (hours == 24) {
        reset()
    }
    HOURS_DISPLAY.innerText = String(hours).padStart(2, '0')
    MINUTES_DISPLAY.innerText = String(minutes).padStart(2, '0')
    SECONDS_DISPLAY.innerText = String(seconds).padStart(2, '0')
    MILLISECOND_DISPLAY.innerText = String(milliseconds).padStart(3, '0')
}


function start() {
    startAudio.play()
    START_STOP_BTN.innerText = 'Stop'
    START_STOP_BTN.removeEventListener('click', start)
    START_STOP_BTN.addEventListener('click', stop)
    timer = setInterval(updateStopwatch, 10)
}
function stop() {
    stopAudio.play()
    START_STOP_BTN.innerText = 'Resume'
    START_STOP_BTN.removeEventListener('click', stop)
    START_STOP_BTN.addEventListener('click', start)
    clearInterval(timer)
    localStorage.setItem('time',JSON.stringify({hours, minutes, seconds, milliseconds}))
}
function reset() {
    START_STOP_BTN.innerText = 'Start'
    START_STOP_BTN.removeEventListener('click', stop)
    START_STOP_BTN.addEventListener('click', start)
    clearInterval(timer)
    milliseconds = 0
    seconds = 0
    minutes = 0
    hours = 0
    HOURS_DISPLAY.innerText = String(hours).padStart(2, '0')
    MINUTES_DISPLAY.innerText = String(minutes).padStart(2, '0')
    SECONDS_DISPLAY.innerText = String(seconds).padStart(2, '0')
    MILLISECOND_DISPLAY.innerText = String(milliseconds).padStart(3, '0')
}