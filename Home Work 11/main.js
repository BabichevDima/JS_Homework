// Задание 1:
var container = document.getElementById('container');
var button = document.getElementsByTagName('button');

var firstPar = document.createElement('p');
var lastPar = document.createElement('p');

firstPar.innerHTML =
  'Первый абзац <a href="http:vk.com">vk</a> и еще ссылка <a href="http:facebook.com">facebook</a>';
lastPar.innerHTML =
  'Последний абзац <a href="http:instagram.com">instagram</a> и еще ссылка <a href="http:google.com">google</a>';

container.appendChild(firstPar);
container.appendChild(lastPar);

button[0].addEventListener('click', function () {
  var links = firstPar.children;

  for (var i = 0; i < links.length; i++) {
    links[i].classList.toggle('red');
  }
});

lastPar.onclick = function (event) {
  event.preventDefault();
  var target = event.target;

  if (target.tagName === 'A') {
    alert(target.getAttribute('href'));

    if (localStorage.getItem(target.innerText) === null) {
      localStorage.setItem(
        target.innerText,
        JSON.stringify({ path: target.href })
      );
      target.href = '#';
      alert('Ссылка была сохранена в LS по ключу "' + target.innerText + '".');
    } else {
      alert(JSON.parse(localStorage.getItem(target.innerText)).path);
    }
  }
};

window.addEventListener('load', function () {
  localStorage.clear();
});

// Задание 2:

var x = document.getElementById('x');
var y = document.getElementById('y');
var createBoard = document.querySelector('.btn__create');
createBoard.disabled = true;
var board = document.querySelector('.board');

function disableButton(x, y) {
  if (x.value.trim() === '' || y.value.trim() === '') {
    createBoard.disabled = true;
    createBoard.classList.remove('active');
  } else {
    createBoard.disabled = false;
    createBoard.classList.add('active');
  }
}

x.addEventListener('keyup', function () {
  disableButton(x, y);
});

y.addEventListener('keyup', function () {
  disableButton(x, y);
});

function checkInput() {
  var inputs = document.getElementsByTagName('input');
  var flag = true;
  for (var i = 0; i < inputs.length; i++) {
    if (
      +inputs[i].value > 0 &&
      +inputs[i].value <= 10 &&
      !(+inputs[i].value % 1)
    ) {
    } else {
      alert(
        'Некорректно ввели число "' +
          inputs[i].id +
          '". Введите число от 1 до 10.'
      );
      inputs[i].value = '';
      flag = false;
    }
  }
  return flag;
}

function drawBoard(x, y) {
  var flag = true;
  for (var i = 0; i < y; i++) {
    var row = document.createElement('div');
    row.className = 'board__row';
    for (var j = 0; j < x; j++) {
      var cell = document.createElement('div');
      if (flag) {
        cell.className = 'board__cell white';
      } else {
        cell.className = 'board__cell black';
      }
      row.append(cell);
      flag = !flag;
    }
    board.append(row);
    if (x % 2 === 0) {
      flag = !flag;
    }
  }
}

function clearInput(x, y) {
  x.value = '';
  y.value = '';
  disableButton(x, y);
}

createBoard.addEventListener('click', function () {
  board.innerHTML = '';
  if (checkInput()) {
    drawBoard(x.value, y.value);
    clearInput(x, y);
  }
  disableButton(x, y);
});

board.addEventListener('click', function () {
  var cells = board.querySelectorAll('.board__cell');
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.toggle('white');
    cells[i].classList.toggle('black');
  }
});
