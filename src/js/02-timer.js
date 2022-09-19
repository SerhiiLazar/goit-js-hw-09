
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    input: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('button[data-start]'),
    timerEl: document.querySelector('.timer'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
}


const currentTime = Date.now();
const ONE_SECONDS = 1000;
let selectedTime = null;
let deltaTime = null;
let intervalId = null;

refs.buttonStart.addEventListener('click', onStartButtonClick);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < currentTime) {
            return Notify.failure('Please choose a date in the future');
        }

        enabledButtonStart();

        selectedTime = selectedDates[0].getTime();
        deltaTime = selectedTime - currentTime;

        updateClockFace(0);
        
    },
    onChange() {
        clearInterval(intervalId);
    }   
};

flatpickr(refs.input, options);

disabledButtonStart();

function onStartButtonClick() {
    disabledButtonStart();
    clearInterval(intervalId);
    
    intervalId = setInterval(() => {
        if(deltaTime < ONE_SECONDS) {
            return;
        }

        deltaTime -= ONE_SECONDS;

        updateClockFace(deltaTime);
    }, ONE_SECONDS);
};

function pad(value) {
    return String(value).padStart(2, '0');
    }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


  function updateClockFace(deltaTime) {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.daysEl.textContent = pad(days);
    refs.hoursEl.textContent = pad(hours);
    refs.minutesEl.textContent = pad(minutes);
    refs.secondsEl.textContent = pad(seconds);
  }
  


  function disabledButtonStart(){
    refs.buttonStart.setAttribute('disabled', '');
  }

  function enabledButtonStart(){
    refs.buttonStart.removeAttribute('disabled');
  }

  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
 
