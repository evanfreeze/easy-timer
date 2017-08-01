const getTimerValue = () => document.getElementById('timerValue').innerText;
const setTimerValue = newValue => document.getElementById('timerValue').innerText = newValue;
let isRunning = false;
const alterTimerValue = (direction, minutesToAlter) => {
  let currentTimerInt = parseInt(getTimerValue(), 10);
  if (direction === 'up') {
    currentTimerInt += minutesToAlter;
  } else if (direction === 'down'){
    currentTimerInt -= minutesToAlter;
  }
  setTimerValue(currentTimerInt);
  return currentTimerInt;
};

const convertMsToMinute = milisecondValue => milisecondValue / 1000 / 60;
const convertMinutesToMs = minuteValue => minuteValue * 60 * 1000;

const convertMsToMinSecString = (milisecondValue) => {
  const decimalMinutes = convertMsToMinute(milisecondValue);
  const minutes = Math.floor(decimalMinutes);
  const decimalSeconds = decimalMinutes - minutes;
  const seconds = Math.round(decimalSeconds * 60);
  let secondsString = seconds.toString();
  if (seconds < 10) {
    secondsString = `0${secondsString}`;
  }
  const displayString = `${minutes}:${secondsString}`;
  return displayString;
};

const toggleCountdownTimerDisplay = () => {
  document.getElementById('timerPicker').className = "hidden";
  document.getElementById('timerCountdown').className = "shown";
}

const updateCountdownTimerDisplay = (currentMsValue) => {
  document.getElementById('timerCountdown').innerText = convertMsToMinSecString(currentMsValue);
}

const startTimer = (startingValueInMiliSeconds) => {
  isRunning = true;
  let timeRemaining = startingValueInMiliSeconds;
  toggleCountdownTimerDisplay();
  updateCountdownTimerDisplay(timeRemaining);
  let timer = setInterval(() => {
    timeRemaining -= 1000;
    updateCountdownTimerDisplay(timeRemaining);
    if (timeRemaining === 0) {
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
};

const handleKeyEvents = (event) => {
  const currentTimerValue = getTimerValue();
  switch (event.key) {
    case 'ArrowUp':
      alterTimerValue('up', 1);
      break;
    case 'ArrowDown':
      if (currentTimerValue > 0) {
        alterTimerValue('down', 1);
      }
      break;
    case 'Enter':
      if (!isRunning) {
        startTimer(convertMinutesToMs(currentTimerValue));
      }
      break;
    default:
      break;
  }
};

document.addEventListener('keydown', (event) => {
  handleKeyEvents(event);
});
