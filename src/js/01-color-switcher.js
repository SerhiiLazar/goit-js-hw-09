const refs = {
    bodyElement: document.querySelector('body'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
};

refs.buttonStart.addEventListener('click', onClickStart);
refs.buttonStop.addEventListener('click', onClickStop);


let timerId = null;

function onClickStart() {
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;

    timerId = setInterval(() => {
        refs.bodyElement.style.background = getRandomHexColor()
    }, 1000);
};

function onClickStop() {
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
 
    clearInterval(timerId);

};


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
