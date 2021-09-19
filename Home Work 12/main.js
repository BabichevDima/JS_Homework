// Практическое задание:
// Создать GET-запрос по адресу https://reqres.in/api/users?page=2. Проверить, получаются ли данные с сервера.
// Описать свой блок try/catch в обработчике успешного запроса. В try попытаться распарсить JSON-ответ с сервера.
// Если исключения не возникает - породить его самостоятельно (попробовать 2 способа порождения).
// Если возникает исключение (строка некорректная) - в блоке catch вывести в консоль информацию об ошибке.
// Протестировать оба варианта. Убедиться, что код после блока try/catch продолжает выполняться.

var practice = document.getElementById('btn__practice');

function sendRequestPractice() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://reqres.in/api/users?page=2');

  xhr.send();

  xhr.onload = function () {
    try {
      var data = JSON.parse(this.response).data;
      // throw { name: 'SyntaxError', message: 'Проброшенная ошибка!' };
      throw new SyntaxError('Проброшенная ошибка!');
      console.log(data);
    } catch (e) {
      if (e.name === 'SyntaxError') {
        console.log(e.name + ': ' + e.message);
      } else {
        throw e;
      }
    } finally {
      console.log('Блок finally выполняется в любом случае.');
    }
  };
  xhr.onerror = function () {
    console.log('неверный домен');
  };
}

practice.addEventListener('click', function () {
  sendRequestPractice();
  setTimeout(function () {
    console.log('Код работает дальше');
  }, 2000);
});

// Задание 1:

var btn = document.getElementById('btn');
var block = document.getElementById('block');
var head = document.createElement('div');

function sendRequest(target) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://reqres.in/api/users?page=1');

  xhr.send();

  xhr.onload = function () {
    if (Math.round(this.status / 100) === 2) {
      localStorage.setItem(
        'users',
        JSON.stringify(JSON.parse(this.response).data)
      );
      drawMarkup(JSON.parse(this.response).data);
    } else {
      var error = document.createElement('div');
      error.innerHTML = 'ERROR!!! Статус ответа: ' + this.status;
      error.classList.add('error');
      block.append(error);
    }
  };

  xhr.onerror = function () {
    var error = document.createElement('div');
    error.innerHTML = '- Error - Error - Error -';
    error.classList.add('error');
    block.append(error);
  };

  xhr.onloadend = function () {
    target.innerHTML = 'Пользователи получены';
  };
}

btn.addEventListener('click', function (event) {
  if (localStorage.getItem('users') === null) {
    event.target.innerHTML = 'Loading...';
    setTimeout(function () {
      sendRequest(event.target);
    }, 2000);
  } else {
    drawMarkup(JSON.parse(localStorage.getItem('users')));
    event.target.innerHTML = 'Пользователи получены';
  }
  btn.disabled = true;
});

function drawMarkup(users) {
  head.classList.add('header');
  block.append(head);

  for (var i = 0; i < users.length; i++) {
    var item = document.createElement('div');
    var about = document.createElement('div');
    var img = document.createElement('img');
    img.classList.add('img');
    img.setAttribute('src', users[i].avatar);
    about.setAttribute('id', users[i].id);
    about.classList.add('about__description');

    if (i === 0) {
      item.classList.add('active');
      about.classList.add('visible');
    }
    item.classList.add('header__item');
    item.setAttribute('data_id', users[i].id);
    item.innerHTML = 'User ' + users[i].id;
    head.append(item);

    about.append(img);
    var description = document.createElement('div');
    description.classList.add('description__user');
    var firstName = document.createElement('p');
    firstName.innerHTML = 'First Name: ' + users[i].first_name;
    description.append(firstName);

    var lastName = document.createElement('p');
    lastName.innerHTML = 'Last Name: ' + users[i].last_name;
    description.append(lastName);
    about.append(description);

    block.append(about);
  }
}

var listUsers = document.getElementsByClassName('header__item');
var descriptionUser = document.getElementsByClassName('about__description');

function activeDescription(n) {
  for (var i = 0; i < descriptionUser.length; i++) {
    if (descriptionUser[i].getAttribute('id') === n) {
      descriptionUser[i].classList.add('visible');
    }
  }
}

function removeActiveUser() {
  for (var i = 0; i < listUsers.length; i++) {
    listUsers[i].classList.remove('active');
    descriptionUser[i].classList.remove('visible');
  }
}

head.addEventListener('click', function (event) {
  var target = event.target;
  if (target.className === 'header__item') {
    removeActiveUser();
    target.classList.add('active');
    activeDescription(target.getAttribute('data_id'));
  }
});
