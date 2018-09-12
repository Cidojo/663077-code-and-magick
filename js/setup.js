'use strict';

// СТРУКТУРА:
// @DATA 1. Константы (магические числа, строки, объекты, массивы)
// @NODES 2. Многократно используемые ноды (получаемые через querySelector)
// @FUNC 3. Методы
// @EVT 4. Обработчики событий
// @INIT 5. Исполняемый код (вызов методов).

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ИСХОДНЫЕ ДАННЫЕ
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@DATA Раздел 3.1

var WIZARD_PARTS = {
  names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var WIZARDS_QTY = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAME_MAX_LENGTH = 25;
var WIZARD_NAME_MIN_LENGTH = 2;

// @@@DATA Раздел 3.2

var SIMILAR_WIZARD_TEMPLATE = {
  template: '#similar-wizard-template',
  nest: '.setup-similar-item',
  title: '.setup-similar-label',
  coat: '.wizard-coat',
  eyes: '.wizard-eyes'
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// НОДЫ
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@NODES Раздел 3

var setup = document.querySelector('.setup');
var similarList = document.querySelector('.setup-similar-list');

document.querySelector('.setup-similar').classList.remove('hidden');

// @@@NODES Раздел 4

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var setupUserCoatColor = document.querySelector('.setup-wizard .wizard-coat');
var setupUserEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var setupUserFireballColor = document.querySelector('.setup-fireball');
var userCoatColorInput = document.querySelector('.setup-player input[name = coat-color]');
var userEyesColorInput = document.querySelector('.setup-player input[name = eyes-color]');
var userFireballColorInput = document.querySelector('.setup-player input[name = fireball-color]');

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ФУНКЦИИ И МЕТОДЫ
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@FUNC Раздел 3.1

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

function getWizard(obj) {
  var wizards = [];
  var namesClone = obj.names.slice(0);
  var surnamesClone = obj.surnames.slice(0);

  for (var i = 0; i < WIZARDS_QTY; i++) {
    var wizard = {
      name: getWizardName(namesClone),
      surname: getWizardName(surnamesClone),
      coatColor: obj.coatColors[getRandomInt(0, obj.coatColors.length - 1)],
      eyesColor: obj.eyesColors[getRandomInt(0, obj.eyesColors.length - 1)]
    };
    wizards.push(wizard);
  }
  return wizards;
}

// @@@FUNC Раздел 3.2

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

// @@@FUNC Раздел 3.3

// Генерирует заданное количество волшебников, использую разработанные методы в Ч1 и Ч2

function renderSimilarWizards(obj, data) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_QTY; i++) {
    documentFragment.appendChild(generateFragment(new BuildTemplate(obj), data[i]));
  }

  similarList.appendChild(documentFragment);
}

// @@@FUNC Раздел 4. Функции обработки событий

function openSetupWindow() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);
}

function closeSetupWindow() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);
}

function onSetupWindowEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupWindow();
  }
}

function userNameValidity(evt) {
  var target = evt.target.validity;
  if (target.tooShort) {
    target.setCustomValidity('Имя должно состоять минимум из ' + WIZARD_NAME_MIN_LENGTH + ' символов');
  } else if (target.tooLong) {
    target.setCustomValidity('Имя не должно превышать ' + WIZARD_NAME_MAX_LENGTH + ' символов');
  } else if (target.missingValue) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
}

function onClickChangeCoatColor(evt) {
  var randomIndex = getRandomInt(0, WIZARD_PARTS.coatColors.length - 1);

  evt.target.style.fill = WIZARD_PARTS.coatColors[randomIndex];
  userCoatColorInput.value = WIZARD_PARTS.coatColors[randomIndex];
}

function onClickChangeEyesColor(evt) {
  var randomIndex = getRandomInt(0, WIZARD_PARTS.coatColors.length - 1);

  evt.target.style.fill = WIZARD_PARTS.eyesColors[randomIndex];
  userEyesColorInput.value = WIZARD_PARTS.eyesColors[randomIndex];
}

function onClickChangeFireballColor(evt) {
  var randomIndex = getRandomInt(0, WIZARD_PARTS.fireballColors.length - 1);

  evt.target.style['background-color'] = WIZARD_PARTS.fireballColors[randomIndex];
  userFireballColorInput.value = WIZARD_PARTS.fireballColors[randomIndex];
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Обработка событий
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

setupOpenButton.addEventListener('click', openSetupWindow);
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});
setupCloseButton.addEventListener('click', closeSetupWindow);
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onSetupWindowEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onSetupWindowEscPress);
});

userNameInput.addEventListener('invalid', userNameValidity);

setupUserCoatColor.addEventListener('click', onClickChangeCoatColor);
setupUserEyesColor.addEventListener('click', onClickChangeEyesColor);
setupUserFireballColor.addEventListener('click', onClickChangeFireballColor);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ИСПОЛНЕНИЕ
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@INIT Раздел 3.1

var similarWizards = getWizard(WIZARD_PARTS);

// @@@INIT Раздел 3.3 вызов результата

renderSimilarWizards(SIMILAR_WIZARD_TEMPLATE, similarWizards);
