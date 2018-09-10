'use strict';

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Часть 1. Создание массива из 4-х объектов - похожих волшебников
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ИСХОДНЫЕ ДАННЫЕ

var WIZARD_PARTS = {
  names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var WIZARDS_QTY = 4;

// НОДЫ

document.querySelector('.setup').classList.remove('hidden');

// ФУНКЦИИ И МЕТОДЫ

// возвращает случайное число из интервала, необязательный параметр round - окончание числа, д.б. кратным 5 (пример 50, 100, 150 и т.п.).

function getRandomInt(min, max, round) {
  round = round || 1;
  return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
}

// возвращает имя из массива имен и удалет отобранное имя из исходного массива.

function getWizardName(names) {
  var randomIndex = getRandomInt(0, names.length - 1);
  var name = names[randomIndex];

  names.splice(randomIndex, 1);

  return name;
}

// РЕЗУЛЬТАТ - функция возвращает массив объектов - волшебников с уникальными именами и произвольно раскрашеными.

function getWizard(obj) {
  var wizards = [];
  var namesClone = obj.names.slice(0);
  var surnamesClone = obj.surnames.slice(0);

  for (var i = 0; i < WIZARDS_QTY; i++) {
    var wizard = {
      name: getWizardName(namesClone),
      surname: getWizardName(surnamesClone),
      coatColor: obj.coatColor[getRandomInt(0, obj.coatColor.length - 1)],
      eyesColor: obj.eyesColor[getRandomInt(0, obj.eyesColor.length - 1)]
    };
    wizards.push(wizard);
  }
  return wizards;
}

// Часть 1 Вызов результата

var similarWizards = getWizard(WIZARD_PARTS);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Часть 2. Создание функции создания фрагмента DOM - дерева, соответствующего волшебнику.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ИСХОДНЫЕ ДАННЫЕ

var SIMILAR_WIZARD_TEMPLATE = {
  template: '#similar-wizard-template',
  nest: '.setup-similar-item',
  title: '.setup-similar-label',
  coat: '.wizard-coat',
  eyes: '.wizard-eyes'
};

// НОДЫ

var similarList = document.querySelector('.setup-similar-list');

// ФУНКЦИИ И МЕТОДЫ

// заполнить свойство TextContent переданного DOM - элемента переданным значением

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// шаблон/конструктор объекта с заданными методами

function BuildTemplate(Obj) {
  Object.assign(this, Obj);

  this.getTemplate = function () {
    return document.querySelector(this.template).cloneNode(true).content;
  };
  this.getNest = function () {
    this.fragment = this.getTemplate().querySelector(this.nest);
  };
  this.getDomElement = function (selector) {
    return this.fragment.querySelector(selector);
  };
}

// создает любой новый или меняет старый стиль DOM - элемента.

function addStyle(owner, styleName, styleValue) {
  owner.style[styleName] = styleValue;
}

// РЕЗУЛЬТАТ - Функция, создает фрагмент DOM - дерева, соответствующий волшебнику

function generateFragment(obj, data) {
  obj.getNest();

  fillTextContent(obj.getDomElement(obj.title), data.name + ' ' + data.surname);
  addStyle(obj.getDomElement(obj.coat), 'fill', data.coatColor);
  addStyle(obj.getDomElement(obj.eyes), 'fill', data.eyesColor);

  return obj.fragment;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ЧАСТЬ 3
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// НОДЫ

document.querySelector('.setup-similar').classList.remove('hidden');

// ФУНКЦИИ И МЕТОДЫ

// Генерирует заданное количество волшебников, использую разработанные методы в Ч1 и Ч2

function renderSimilarWizards(obj, data) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_QTY; i++) {
    documentFragment.appendChild(generateFragment(new BuildTemplate(obj), data[i]));
  }

  similarList.appendChild(documentFragment);
}

// Часть 3 вызов результата

renderSimilarWizards(SIMILAR_WIZARD_TEMPLATE, similarWizards);
