// Задание 1:

var regExp =
  /^[a-z]{3,10}_[a-z]{3,10}(-[\d]{4})?@[a-z\d]{1,10}(\.|-)?[a-z\d]{1,10}\.com$/;

console.log(regExp.test('name_surname-1234@gmail.com'));

// Задание 2:

var number = '+375-25-777-77-77';

function testNumber(number) {
  var regExp =
    /^(\+?375-?(44|29|33|17|25)|8-?(044|029|033|017|025))-?[1-9](\d){2}(-?(\d){2}){2}$/;
  return regExp.test(number);
}

console.log(testNumber(number));

// Задание 3:
// решение 1

var text = 'НАПИСАТЬ функцию';

function findVowels(text) {
  var result =
    text.match(/[уеыаоэяию]/gi) === null
      ? 0
      : text.match(/[уеыаоэяию]/gi).length;
  return 'В переданном тексте "' + text + '" - ' + result + ' гласных.';
}

console.log(findVowels(text));

// решение 2

var text = 'НАПИСАТЬ функцию';

function findVowels(text) {
  return (
    'В тексте ' +
    Array.from(text.matchAll(/[уеыаоэяию]/gi)).length +
    ' гласных.'
  );
}

console.log(findVowels(text));

// решение 3

var text = 'НАПИСАТЬ функцию';

function findVowels(text) {
  var regExp = /[уеыаоэяию]/i;
  var n = 0;
  for (k in text) {
    regExp.test(text[k]) ? n++ : n;
  }
  return 'В переданном тексте "' + text + '" - ' + n + ' гласных.';
}

console.log(findVowels(text));
