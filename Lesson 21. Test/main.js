const container = document.querySelector('.container');
const form = document.querySelector('.form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMessage = document.querySelector('.error');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  sendRequest();
});

function sendRequest() {
  let xhr = new XMLHttpRequest();

  let newUser = JSON.stringify({
    email: form.email.value,
    password: form.password.value,
  });

  xhr.open('POST', 'https://reqres.in/api/register');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(newUser);

  xhr.onload = function () {
    if (Math.round(this.status / 100) === 2) {
      try {
        let userId = JSON.parse(this.response).id;
        localStorage.setItem('userId', JSON.stringify(JSON.parse(userId)));
        showMessage(userId);
      } catch {
        container.innerHTML = `Ошибка на сервере!!!`;
        container.classList.add('error_text');
      }
    } else {
      showError(JSON.parse(xhr.response).error);
    }
  };

  xhr.onerror = function () {
    container.innerHTML = `Hеверный домен!!!`;
    container.classList.add('error_text');
  };
}

function showError(error) {
  if (error === 'Missing password') {
    if (email.classList.contains('red')) {
      email.classList.remove('red');
    }
    password.classList.add('red');
    errorMessage.innerHTML = error;
    errorMessage.classList.add('error_text');
  } else if (error === 'Note: Only defined users succeed registration') {
    if (password.classList.contains('red')) {
      password.classList.remove('red');
    }
    email.classList.add('red');
    errorMessage.innerHTML = error;
    errorMessage.classList.add('error_text');
  } else {
    email.classList.add('red');
    password.classList.add('red');
    errorMessage.innerHTML = error;
    errorMessage.classList.add('error_text');
  }
}

function showMessage(id) {
  container.innerHTML = `User ${id} has been successfully registered.`;
}

window.addEventListener('load', function () {
  if (localStorage.getItem('userId')) {
    showMessage(localStorage.getItem('userId'));
  }
});
