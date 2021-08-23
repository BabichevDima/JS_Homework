// Задание 1:
// Переписать задачу с использованием перебирающего метода массивов:

function filterNumbersArr(arr) {
  var result = arr.reduce(function (newArr, item, index) {
    if (item > 0) {
      newArr.push(item);
    }
    return newArr;
  }, []);

  return result;
}
console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

// Задание 2:
// Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.

function findNumber(arr) {
  var result = arr.find(function (item) {
    return item > 0;
  });
  return result;
}
console.log(findNumber([-1, 0, 2, 34, -2]));

// Задание 3:
// Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
// Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

function isPalindrome(word) {
  return word.toLowerCase() ===
    word.toLowerCase().split('').reverse().join('')
    ? true
    : false;
}

console.log(isPalindrome('шалаШ'));
console.log(isPalindrome('привет'));

// Задание 4:
// Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
// Регистр в словах учитываться не должен.

function areAnagrams(word, word2) {
  if (
    word.toLowerCase().split('').length !== word2.toLowerCase().split('').length
  ) {
    return false;
  } else {
    if (
      word.toLowerCase().split('').sort().join('') !==
      word2.toLowerCase().split('').sort().join('')
    ) {
      return false;
    }
  }
  return true;
}

console.log(areAnagrams('кот', 'оТк')); // true
console.log(areAnagrams('кот', 'атк')); // false
console.log(areAnagrams('кот', 'отко')); // false
console.log(areAnagrams('котк', 'откт')); // false

// Задание 5:
// Написать функцию, которая будет разбивать массив на под-массивы определенной длины.

function divideArr(arr, number) {
  var newArr = [];
  var firstNumber = 0;
  var initNumber = number;

  for (var i = 0; i < arr.length; i++) {
    if (arr.length <= number) {
      newArr.push(arr.slice(firstNumber));
      break;
    } else {
      newArr.push(arr.slice(firstNumber, number));
      firstNumber += initNumber;
      number += initNumber;
    }
  }

  return newArr;
}

console.log(divideArr([1, 2, 3, 4], 2));
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3));
