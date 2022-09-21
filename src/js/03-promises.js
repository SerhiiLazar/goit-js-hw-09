import Notiflix from 'notiflix';


const refs = {
  // firstDelay: document.querySelector('label[name="delay"]'),
  // delayStep: document.querySelector('label[name="step"'),
  // amountElement: document.querySelector('label[name="amount"'),
  buttonForms: document.querySelector('.form'),
}


refs.buttonForms.addEventListener('submit', onClickSubmit);

function onClickSubmit(event) {
  event.preventDefault();

  let delay = Number(event.target.delay.value);
  let step = Number(event.target.step.value);
  let amount = Number(event.target.amount.value);

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
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }, delay);
};



