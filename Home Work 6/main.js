// ДОМАШНЕЕ ЗАДАНИЕ 6:
// 1.1
// Написать единый геттер-сеттер dailyNorm для установки/получения количества корма (foodAmount).
// Оно не должно быть меньше 50 и больше 500 грамм. В случае некорректного количества возвращать сообщение об ошибке.
// Если функция вызывается как геттер - она должна возвращать уже отформатированное значение foodAmount.
// Протестировать метод dailyNorm с разными значениями параметра и без него. Метод feed должен оперировать актуальной
// информацией (использовать внутри метода вызов геттера).

function Cat(name) {
  var foodAmount = 0;

  function formatFoodAmount() {
    return foodAmount + ' гр.';
  }

  this.name = name;

  this.feed = function () {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
  };

  this.dailyNorm = function (norm) {
    if (!arguments.length) {
      return formatFoodAmount();
    }
    if (norm < 50) {
      throw Error('Количество корма должно быть больше 50 грамм.');
    }
    if (norm > 500) {
      throw Error('Количество корма должно быть меньше 500 грамм.');
    }
    foodAmount = norm;
  };
}

var barsik = new Cat('Барсик');

barsik.dailyNorm(58);
console.log(barsik.dailyNorm());
barsik.feed();

// 1.2
// Создать класс Animal. Перенести в него все свойства и методы. Отнаследоваться внутри Cat от Animal.
// Расширить метод feed для кошек. Теперь он должен выводить в консоль информацию вида:
//   "Насыпаем в миску (количество гр.) корма.
//   Кот доволен ^_^"
// Использовать вызов родительского метода вида animalFeed() и сохранение контекста this через переменную.
// Все вызовы, которые работали ранее, должны по-прежнему работать корректно.

// 1.3
// Добавить публичный метод stroke, который будет выводить в консоль информацию "Гладим кота.".
// Доделать метод feed таким образом, чтобы можно было цепочкой вызывать его и метод stroke в любой
// последовательности и сколько угодно раз.
// (Лишние логи можно убрать, делать всё в том же задании).

function Animal(name) {
  var foodAmount = 0;
  var self = this;

  function formatFoodAmount() {
    return foodAmount + ' гр.';
  }

  self.name = name;

  self.feed = function () {
    console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
  };

  self.dailyNorm = function (norm) {
    if (!arguments.length) {
      return formatFoodAmount();
    }
    if (norm < 50) {
      throw Error('Количество корма должно быть больше 50 грамм.');
    }
    if (norm > 500) {
      throw Error('Количество корма должно быть меньше 500 грамм.');
    }
    foodAmount = norm;
  };
}

function Cat(name) {
  Animal.apply(this, arguments);

  var animalFeed = this.feed;

  this.feed = function () {
    animalFeed.apply(this);
    console.log('Кот доволен ^_^');
    return this;
  };

  this.stroke = function () {
    console.log('Гладим кота.');
    return this;
  };
}

var barsik = new Cat('Барсик');

barsik.dailyNorm(500);
barsik.stroke().feed().stroke();
