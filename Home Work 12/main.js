// Задание 1:

var btn = document.getElementById('btn');
var block = document.getElementById('block');
var head = document.createElement('div');

function sendRequest() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '8https://reqres.in/api/users?page=1');

  xhr.send();

  xhr.onload = function () {
    console.log(JSON.parse(this.response).data);
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
    console.log('Запрос завершен.');
  };
}

btn.addEventListener('click', function () {
  if (localStorage.getItem('users') === null) {
    sendRequest();
  } else {
    drawMarkup(JSON.parse(localStorage.getItem('users')));
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
