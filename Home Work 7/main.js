// Задание 1:
// Переписать предыдущий пример с кошками на прототипный стиль ООП.

function Animal(name) {
  this._foodAmount = 0;
  this._name = name;
  this._foodAmount = null;
}

Animal.prototype._formatFoodAmount = function () {
  return this._foodAmount + ' гр.';
};

Animal.prototype.feed = function () {
  console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
};

Animal.prototype.dailyNorm = function (norm) {
  if (!arguments.length) {
    return this._formatFoodAmount();
  }
  if (norm < 50) {
    throw Error('Количество корма должно быть больше 50 грамм.');
  }
  if (norm > 500) {
    throw Error('Количество корма должно быть меньше 500 грамм.');
  }
  this._foodAmount = norm;
};

function Cat(name) {
  Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function () {
  Animal.prototype.feed.apply(this, arguments);
  console.log('Кот доволен ^_^');
  return this;
};
Cat.prototype.stroke = function () {
  console.log('Гладим кота.');
  return this;
};

var barsik = new Cat('Барсик');

barsik.dailyNorm(500);
barsik.stroke().feed().stroke();

// Задание 2:
// Написать функцию, возвращающую глубокую копию объекта - его клон. Клонироваться должны значения всех типов данных
// (+ массивы и функции), а также любого уровня вложенности. Метод isArray использовать можно.

function deepClone(obj) {
  var cloneObj = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (typeof obj[key] !== 'object' || obj[key] === null) {
      cloneObj[key] = obj[key];
    } else if (Array.isArray(obj[key])) {
      cloneObj[key] = deepClone(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key]) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}

var initialObj = {
  string: 'Vasya',
  number: 30,
  boolean: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3],
  object: {
    string2: 'Petrov',
    object2: {
      array2: [{}, {}],
    },
    object3: {},
  },
  method: function () {
    alert('Hello');
  },
};

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(200);
clonedObj.string = 'Dima';

console.log(initialObj);
console.log(clonedObj);

// Задание 3:
// Написать функцию глубокого сравнения объектов, возвращающую boolean. Сравниваться должны значения всех типов данных
// (+ массивы и функции), а также любого уровня вложенности. Для определения длины объектов разрешается использовать
// метод Object.keys(). Хорошо протестировать работу функции (можно на объекте из пред. задания).

function compareObj(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for (var key in obj1) {
      if (!obj2.hasOwnProperty(key)) {
        return false;
      } else {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
          if (!compareObj(obj1[key], obj2[key])) {
            return false;
          }
        } else if (
          typeof obj1[key] === 'object' &&
          obj1[key] &&
          typeof obj2[key] === 'object' &&
          obj2[key] &&
          !Array.isArray(obj1[key]) &&
          !Array.isArray(obj2[key])
        ) {
          if (!compareObj(obj1[key], obj2[key])) {
            return false;
          }
        } else if (
          typeof obj1[key] === 'function' &&
          typeof obj2[key] === 'function'
        ) {
          if (obj1[key].toString() !== obj2[key].toString()) {
            return false;
          }
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
  }

  return true;
}

var obj = {
  string7: 'Vasya',
  number: 30,
  boolean8: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3, {}],
  object: {
    string2: 'Petrov',
    object2: {
      array2: [{}, 5],
    },
    object3: {},
  },
  method: function () {
    alert('Hello');
  },
};

var obj1 = {
  string7: 'Vasya',
  number: 30,
  boolean8: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3, {}],
  object: {
    string2: 'Petrov',
    object2: {
      array2: [{}, 5],
    },
    object3: {},
  },
  method: function () {
    alert('Hello');
  },
};

console.log(compareObj(obj, obj1));
