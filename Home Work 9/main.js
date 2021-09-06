// Задание 1:
// Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.

var arr = ['Vasya', 'Dima', 'Artem'];

function getNewArrObject(arr) {
  return arr.map(function (item) {
    return { name: item };
  });
}

console.log(getNewArrObject(arr));

// Задание 2:
// Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
// Для решения использовать перебирающий метод массивов (не метод join).

var arr = ['00', '13', '24'];

function getString(arr) {
  return arr.reduce(function (string, item) {
    return (string + ' : ' + item);
  }, 'Текущее время');
}

console.log(getString(arr));

// Задание 3:
// Написать функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
// должно быть "топорным".

var text = 'НАПИСАТЬ функцию';

function findVowels(text) {
  var arrVowels = ['у', 'е', 'ы', 'а', 'о', 'э', 'я', 'и', 'ю'];
  var newArr = text.toLowerCase().split('');
  var n = 0;
  arrVowels.forEach(function (item) {
    var result = newArr.filter(function (j) {
      return j === item;
    });
    n += result.length;
  });
  return 'В переданном тексте "' + text + '" - ' + n + ' гласных.';
}

console.log(findVowels(text));

// Задание 4:
// Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
// восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
// вопросительным знакам - убрав их).
// Для каждого из предложений - отдельно вывести текст предложения и рядом количество букв в нем (без учета пробелов,
// запятых и т.д. - именно букв). Из ранее непройденных методов разрешается использовать только (!!!) регулярное выражение
// в методе split.

// Функция должна работать следущим образом (потестировать на данном тексте):
//   countSentencesLetters('Привет, студент! Студент... Как дела, студент?');
//   // Привет, студент: Letters quantity is: 13
//   // Студент: Letters quantity is: 7
//   // Как дела, студент: Letters quantity is: 14

function countSentencesLetters(text) {
  var regExp = /[\?\.!]/;
  var arr = text.split(regExp);

  arr.forEach(function (item) {
    if (item.length > 0) {
      var regExp = /[,\s]/;
      console.log(
        item.trim() +
          ': Letters quantity is ' +
          item.split(regExp).join('').length
      );
    }
  });

  return arr;
}

countSentencesLetters('Привет, студент! Студент... Как дела, студент?');

// Задание 5 *:
// Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать
// информацию вида:
//   "Максимальное число повторений у слова "привет" - 8"
// При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
// Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное
// выражение в методе split.

function countRepeatedWord(text) {
  var regExp = /[\?\.!\s,]/;

  var arr = text.split(regExp).filter(function (elem) {
    return elem !== '';
  });

  var resultObj = arr.reduce(function (obj, elem) {
    var n = 0;
    arr.forEach(function (item) {
      if (elem.toLocaleLowerCase() === item.toLocaleLowerCase()) {
        n++;
      }
    });
    obj[elem] = n;
    return obj;
  }, {});

  var maxCount = 0;
  var maxValue = '';
  for (key in resultObj) {
    if (resultObj[key] > maxCount) {
      maxCount = resultObj[key];
      maxValue = key;
    }
  }
  return (
    'Максимальное число повторений у слова "' + maxValue + '" - ' + maxCount
  );
}

console.log(
  countRepeatedWord('Привет, студент! Студент... Как дела, студент?')
);
