const container = document.querySelector('.container');
const buttonStart = document.querySelector('.btn');
const timer = document.querySelector('.timer');
const minContainer = document.querySelector('.min');
const secContainer = document.querySelector('.sec');
const msecContainer = document.querySelector('.msec');
let timerId = null;

const time = {
  msec: 0,
  sec: 0,
  min: 0,
};

function initTimer(state) {
  switch (state) {
    case 'initial':
      buttonStart.dataset.state = 'running';
      localStorage.setItem('state', JSON.stringify(buttonStart.dataset.state));
      buttonStart.innerHTML = 'Stop';

      createBtns();
      startTimer(time);
      break;
    case 'running':
      buttonStart.dataset.state = 'stopped';
      localStorage.setItem('state', JSON.stringify(buttonStart.dataset.state));
      buttonStart.innerHTML = 'Run';
      buttonStart.classList.remove('animate');
      stopTimer(timerId);
      break;
    case 'stopped':
      buttonStart.dataset.state = 'running';
      localStorage.setItem('state', JSON.stringify(buttonStart.dataset.state));
      buttonStart.innerHTML = 'Stop';
      startTimer(time);
      break;
  }
}

function startTimer(time) {
  buttonStart.classList.add('animate');

  timerId = setInterval(function () {
    time.msec++;
    if (time.msec === 100) {
      time.msec = 0;
      time.sec++;
      if (time.sec === 60) {
        time.sec = 0;
        time.min++;
        if (time.min === 60) {
          buttonStart.remove();
          stopTimer(timerId);
          removeBtns('Save');
          localStorage.clear();
          return;
        }
        minContainer.innerHTML = formatTimeParam('min', time.min);
      }
      secContainer.innerHTML = formatTimeParam('sec', time.sec);
    }
    msecContainer.innerHTML = formatTimeParam('msec', time.msec);
  }, 10);
}

function createBtn(btn) {
  const button = document.createElement('button');
  button.innerHTML = `${btn}`;
  button.classList.add(`btn`);
  button.classList.add(button.innerHTML);

  const results = document.createElement('div');
  results.classList.add('list');
  let count = 1;

  button.addEventListener('click', function (event) {
    switch (event.target.innerHTML) {
      case 'Reset':
        stopTimer(timerId);
        container.insertAdjacentElement('afterbegin', buttonStart);
        removeResult();
        removeBtns();
        clearTime();
        localStorage.clear();
        break;

      case 'Save':
        count = ++document.getElementsByClassName('result').length;

        const point = createResult(count);

        results.append(point);
        container.append(results);
        count++;

        localStorage.setItem(
          'results',
          JSON.stringify(document.querySelector('.list').innerHTML)
        );

        break;
    }
  });

  return button;
}

function createResult(count) {
  const result = document.createElement('div');
  result.classList.add('result');
  result.innerHTML = `${count}) ${minContainer.innerText} : ${secContainer.innerHTML} : ${msecContainer.innerHTML}`;
  return result;
}

function removeResult() {
  if (document.getElementsByClassName('list')[0]) {
    document.getElementsByClassName('list')[0].remove();
  }
}

function createBtns() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');
  buttonsContainer.append(createBtn('Reset'));
  buttonsContainer.append(createBtn('Save'));
  container.append(buttonsContainer);
  return buttonsContainer;
}
function clearTime() {
  msecContainer.innerHTML = '00';
  secContainer.innerHTML = '00';
  minContainer.innerHTML = '00';

  time.msec = 0;
  time.sec = 0;
  time.min = 0;
}

function removeBtns(param) {
  arguments.length > 0
    ? document.getElementsByClassName(`${param}`)[0].remove()
    : document.getElementsByClassName('buttonsContainer')[0].remove();

  buttonStart.dataset.state = 'initial';
  buttonStart.innerHTML = 'Start';
  buttonStart.classList.remove('animate');
}

function formatTimeParam(name, time) {
  localStorage.setItem(name, JSON.stringify(time));
  return time < 10 ? `0${time}` : time;
}

function stopTimer(timerId) {
  clearInterval(timerId);
}

buttonStart.addEventListener('click', function (event) {
  initTimer(event.target.dataset.state);
});

function initTime() {
  time.msec =
    localStorage.getItem('msec') === null
      ? 0
      : JSON.parse(localStorage.getItem('msec'));
  time.sec =
    localStorage.getItem('sec') === null
      ? 0
      : JSON.parse(localStorage.getItem('sec'));
  time.min =
    localStorage.getItem('min') === null
      ? 0
      : JSON.parse(localStorage.getItem('min'));

  msecContainer.innerHTML = formatTimeParam('min', time.msec);
  secContainer.innerHTML = formatTimeParam('min', time.sec);
  minContainer.innerHTML = formatTimeParam('min', time.min);
}

//// Есть баги!
window.addEventListener('load', function () {
  if (JSON.parse(localStorage.getItem('state')) === 'running') {
    initTime();
    initTimer('initial');
  }
  if (JSON.parse(localStorage.getItem('state')) === 'stopped') {
    initTime();
    buttonStart.innerHTML = 'Run';
    createBtns(); // Баг!
  }

  if (localStorage.getItem('results')) {
    const arrResult = JSON.parse(localStorage.getItem('results'));
    const results = document.createElement('div');

    results.classList.add('list');
    results.innerHTML = arrResult;
    container.append(results);
  }
});
