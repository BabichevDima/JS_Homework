// Задание 1:
// Переписать задачу с использованием перебирающего метода массивов:

function filterNumbersArr(arr) {
  var result = arr.filter(function (item) {
    return item > 0;
  });

  return result;
}
console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

// Задание 2:
// Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.

function findNumber(arr) {
  return arr.find(function (item) {
    return item > 0;
  });
}
console.log(findNumber([-1, 0, 2, 34, -2]));

// Задание 3:
// Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
// Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

function isPalindrome(word) {
  return word.toLowerCase() === word.toLowerCase().split('').reverse().join('');
}

console.log(isPalindrome('шалаШ'));
console.log(isPalindrome('привет'));

// Задание 4:
// Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
// Регистр в словах учитываться не должен.

function areAnagrams(word, word2) {
  return (
    word.toLowerCase().split('').sort().join('') ===
    word2.toLowerCase().split('').sort().join('')
  );
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
