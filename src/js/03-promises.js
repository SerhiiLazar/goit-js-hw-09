import Notiflix from 'notiflix';


const refs = {
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"'),
  amountElement: document.querySelector('input[name="amount"'),
  buttonForms: document.querySelector('.form'),
}


refs.buttonForms.addEventListener('submit', onClickSubmit);

function onClickSubmit(event) {
  event.preventDefault();
 
    let delay = Number(refs.firstDelay.value);
    let step = Number(refs.delayStep.value);
    let amount = Number(refs.amountElement.value);
  

    for (let position = 1; position <= amount; position += 1) {
      console.log('step', step);
      console.log('delay', delay);
      console.log('amount', amount);
      
        createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;   
    }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    
  }, delay);
  
});
};



