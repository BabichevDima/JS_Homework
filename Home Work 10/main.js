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
    // alert(target.href);
    alert(target.getAttribute('href'));
  }
};

// Задание 1:

var table = document.getElementById('table');
table.setAttribute('border', '1');
table.classList.add('border');

for (var i = 0; i <= 3; i++) {
  if (i === 3) {
    var tableBtn = document.createElement('td');
    tableBtn.classList.add('table__btn');
    tableBtn.setAttribute('colspan', '3');
    tableBtn.innerHTML = 'Add line';
    table.append(tableBtn);
  } else {
    table.append(getRow());
  }
}

tableBtn.addEventListener('click', function (event) {
  event.stopImmediatePropagation();
  table.insertBefore(getRow(), document.getElementsByTagName('tr')[0]);
});

function getRow() {
  var row = document.createElement('tr');
  row.classList.add('table_row');
  for (var j = 1; j <= 3; j++) {
    var cell = document.createElement('td');
    cell.classList.add('table_cell');
    row.append(cell);
  }
  return row;
}

table.addEventListener('click', function (event) {
  var target = event.target;
  if (target.tagName === 'TD') {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('table_input');
    input.value = target.innerHTML;
    target.innerHTML = '';
    target.append(input);
    input.focus();

    input.addEventListener('blur', function () {
      target.innerHTML = input.value === '' ? '' : input.value;
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.target.blur();
      }
    });
  }
});
