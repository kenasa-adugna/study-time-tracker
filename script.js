let seconds = 0;
let minutes = 0;
let hours = 0;

let timer;
let isRunning = false;

let totalMinutes = parseInt(localStorage.getItem("totalMinutes")) || 0;
let goalHours = parseInt(localStorage.getItem("goalHours")) || 0;

// ELEMENTS
const timerDisplay = document.getElementById("timer");
const totalTimeDisplay = document.getElementById("totalTime");
const goalText = document.getElementById("goalText");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// LOAD SAVED DATA
totalTimeDisplay.textContent = totalMinutes;
goalText.textContent = `Goal: ${goalHours} Hours`;

updateProgress();

// START
document.getElementById("start").addEventListener("click", function () {
    if (!isRunning) {
        isRunning = true;

        timer = setInterval(() => {
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;
                totalMinutes++;
                localStorage.setItem("totalMinutes", totalMinutes);
            }

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }

            updateTimer();
            totalTimeDisplay.textContent = totalMinutes;

            updateProgress();

        }, 1000);
    }
});

// PAUSE
document.getElementById("pause").addEventListener("click", function () {
    clearInterval(timer);
    isRunning = false;
});

// RESET TIMER ONLY
document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timer);
    isRunning = false;

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateTimer();
});

// SET GOAL
document.getElementById("setGoal").addEventListener("click", function () {
    let input = document.getElementById("goalInput").value;

    if (input <= 0 || input === "") {
        goalText.textContent = "Please enter valid goal";
        return;
    }

    goalHours = parseInt(input);

    localStorage.setItem("goalHours", goalHours);

    goalText.textContent = `Goal: ${goalHours} Hours`;

    updateProgress();
});

// UPDATE TIMER DISPLAY
function updateTimer() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = `${h}:${m}:${s}`;
}

// PROGRESS BAR
function updateProgress() {
    if (goalHours === 0) {
        progressBar.style.width = "0%";
        progressText.textContent = "Progress: 0%";
        return;
    }

    let percent = (totalMinutes / (goalHours * 60)) * 100;

    if (percent > 100) percent = 100;

    progressBar.style.width = percent + "%";
    progressText.textContent = `Progress: ${Math.floor(percent)}%`;
}