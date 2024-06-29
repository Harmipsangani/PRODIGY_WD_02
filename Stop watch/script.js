const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('lapsList'); 

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let laps = [];
let stoppedTimes = [];

window.onload = function() {
  stoppedTimes = JSON.parse(localStorage.getItem('stoppedTimes')) || [];
  displayStoppedTimes(stoppedTimes);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer); 
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap); 

function startTimer() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTime, 10); 
  startBtn.disabled = true;
  stopBtn.disabled = false;
  lapBtn.disabled = false; 
}

function stopTimer() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true; 
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = '00:00:00.000';
  laps = [];
  stoppedTimes = [];
  lapsList.innerHTML = ""; 
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true; 
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;

  let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor(elapsedTime % 1000);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  milliseconds = milliseconds.toString().padStart(3, '0');

  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
  if (intervalId) { 
    const currentLap = `${display.textContent}`;
    laps.push(currentLap);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${currentLap}`;
    lapsList.appendChild(lapItem);
  }
}

function displayStoppedTime(time) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.textContent = time;
  row.appendChild(cell);
  stoppedTimesBody.appendChild(row);
}
