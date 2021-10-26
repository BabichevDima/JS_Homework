// ПРАКТИЧЕСКИЕ ЗАДАНИЯ ПО ES6

//   Задание 1:
//     Имеется следующий объект - {a: 1, b: 2, c: 3, d: 4}. Необходимо сделать так, чтобы в переменные a и b записались
//     соответствующие значения, а все, что осталось - в объект obj.

(() => {
  const { a, b, ...obj } = { a: 1, b: 2, c: 3, d: 4 };
  console.log(a);
  console.log(b);
  console.log(obj);
})();

//   Задание 2:
//     Запросить у пользователя имя и сохранить его в переменную.
//     Создать объект со свойством name, куда записать короткой записью значение имени пользователя, и методом sayHi,
//     который будет возвращать строку вида:
//       "Hi, (имя пользователя)!"
//     Имя пользователя получать уже из объекта.
//     Проверить работу метода. Убедиться в уместном использовании способов задания переменной.

(() => {
  let name = prompt(' Введите имя: ');

  const obj = {
    name,
    sayHi() {
      console.log(`Hi ${this.name}!`);
    },
  };

  obj.sayHi();
})();

//   Задание 3:
//     Написать функцию, которая будет принимать параметры x, y, z.

//     При вызове функции передать в неё первым параметром объект вида {a: 2, b: 3}, вторым параметром целое число.

//     X и y получаем из свойств переданного в функцию объекта a и b. У z значение по-умолчанию должно быть 1.
//     Функция должна возвращать результат возведения в степень y числа x, умноженный на z.
//     Валидацию опустить.

(() => {
  const foo = ({ a: x, b: y }, z = 1) => Math.pow(x, y) * z;

  console.log(foo({ a: 2, b: 3 }, 2));
})();

//   Задание 4:
//     Создать массив с именем и возрастом. Передать его в функцию. Функция должна принять его как два отдельных параметра
//     name и age и вернуть строку вида:
//       "Hello, I'm (имя) and I'm (возраст) years old."
//     Не использовать деструктуризацию.

(() => {
  const arr = ['Dima', 27];

  const foo = (name, age) => `Hello, I'm ${name} and I'm ${age} years old.`;

  console.log(foo(...arr));
})();

//   Задание 5:
//     Написать функцию, принимающую массив чисел. При вызове числа передаются в функцию отдельными параметрами, не массивом.
//     Вывести в консоль числа последовательно.

(() => {
  const foo = (...arr) => {
    for (number of arr) {
      console.log(number);
    }
  };

  foo(1, 3, 5, 9);
})();

//   Задание 6:
//     Переписать решение задачи с поиском гласных на новый синтаксис. Использовать перебирающий метод массива и поиск
//     элемента в массиве.

(() => {
  const countVowelLetters = (text) => {
    text = [...text.toLowerCase()];
    const vowelLetters = [
      'а',
      'я',
      'ы',
      'и',
      'о',
      'ё',
      'у',
      'ю',
      'э',
      'е',
      'a',
      'e',
      'i',
      'o',
      'u',
      'y',
    ];

    return text.filter((letter) => vowelLetters.includes(letter)).length;
  };
  console.log(countVowelLetters('Шла Саша по шоссе И сосала сУшку'));
})();

// Задание 7:
// Написать функцию, принимающую массив объектов вида:
//   [
//       {name: 'Vasya Pupkin', age: 25},
//       {name: 'Ivan Petrov', age: 30},
//       {name: 'Fedor Ivanov', age: 42}
//   ]
// и возвращающую объект вида:
//   {
//       Пользователи младше 40: [
//           {name: 'Vasya Pupkin', age: 25},
//           {name: 'Ivan Petrov', age: 30}
//       ],
//       Пользователь с именем Федор: {name: 'Fedor Ivanov', age: 42}
//   }
// Для свойства "Пользователь с именем Федор" осуществлять поиск объекта по имени, которое начинается с подстроки Fedor.

(() => {
  const arr = [
    { name: 'Vasya Pupkin', age: 25 },
    { name: 'Ivan Petrov', age: 30 },
    { name: 'Fedor Ivanov', age: 42 },
  ];

  const changeArray = (arr) => ({
    ['Пользователи младше 40']: arr.filter((user) => user.age < 40),
    ['Пользователь с именем Федор']: arr.find((user) =>
      user.name.startsWith('Fedor')
    ),
  });

  console.log(changeArray(arr));
})();

// Задание 8:
// Написать функцию, принимающую массив имен пользователей и возвращающую массив объектов вида:
//   [
//       {Пользователь 1: 'Вася'},
//       {Пользователь 2: 'Петя'}
//   ]

(() => {
  function createArray(arr) {
    return arr.map((item, index) => ({ [`Пользователь ${++index}`]: item }));
  }

  console.log(createArray(['Вася', 'Петя']));
})();

// Задание 9:
// Написать функцию, принимающую массив объектов и объединяющую их в один новый объект. Например:
//   [
//       {name: 'Vasya'},
//       {name: 'Piotr', age: 25},
//       {salary: '2000$'}
//   ]
// необходимо преобразовать в
//   {
//       name: 'Piotr',
//       age: 25,
//       salary: '2000$'
//   }
// Spread-оператор не использовать. Использовать перебирающий метод массивов. Старые объекты не должны преобразовываться.

(() => {
  function createArray(arr) {
    return arr.reduce((newObj, obj) => Object.assign(newObj, obj), {});
  }

  console.log(
    createArray([
      { name: 'Vasya' },
      { name: 'Piotr', age: 25 },
      { salary: '2000$' },
    ])
  );
})();

// Задание 10:
// Переписать последнее задание с ООП на новый синтаксис. Проверить работоспособность всех методов.

(() => {
  class Animal {
    constructor(name) {
      this.name = name;
      this._foodAmount = 50;
    }

    _formatFoodAmount() {
      return this._foodAmount + ' гр.';
    }

    dailyNorm(amount) {
      if (!arguments.length) return this._formatFoodAmount();

      if (amount < 50 || amount > 500) {
        return 'Недопустимое количество корма.';
      }

      this._foodAmount = amount;
    }

    feed() {
      console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
    }
  }

  class Cat extends Animal {
    feed() {
      super.feed();
      console.log('Кот доволен ^_^');
      return this;
    }

    stroke() {
      console.log('Гладим кота.');
      return this;
    }
  }

  var barsik = new Cat('Барсик');

  console.log(barsik.feed().stroke().stroke().feed());

  barsik = null;
})();

// Задание 11:
// Написать функцию-промис, которая принимает в себя 2 целых числа и выводит в консоль числа, входящие в диапазон,
// каждую секунду. После окончания работы интервала в консоль должно вывестись последнее запомненное число.
// Если в функцию первым параметром было передано бОльшее число - значения параметров следует поменять местами.
// В случае, если в функцию были переданы не целые числа - промис должен быть завершен неуспешно.

(() => {
  function createPromise(paramA, paramB) {
    return new Promise((resolve, reject) => {
      console.log(`Промис запущен с параметрами A: ${paramA} и B: ${paramB}`);

      if (!Number.isInteger(paramB) || !Number.isInteger(paramA)) {
        reject('были переданы не целые числа');
        return;
      }
      if (paramB < paramA) {
        [paramA, paramB] = [paramB, paramA];
      }

      setInterval(() => {
        paramA < paramB ? console.log(paramA++) : resolve(paramA);
      }, 1000);
    });
  }

  createPromise(1, 5)
    .then((result) => console.log(`Результат промиса: ${result}`))
    .catch((error) => console.log(`Возникла ошибка в промисе: ${error}`))
    .finally(() => console.log('Работа промиса завершена'));
})();
