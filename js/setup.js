'use strict';

// ----------------------------------------
// PART1
// ----------------------------------------

// DATA

var WIZARD_CHARACTERISTICS = {
  names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var WIZARDS_QTY = 4;

// NODES.p1

document.querySelector('.setup').classList.remove('hidden');

// METHODS.p1

// get random number from interval

function getRandomInt(min, max, round) {
  round = round || 1;
  return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
}

// get wizard unique property

function getWizardName(names) {
  var randomIndex = getRandomInt(0, names.length - 1);
  var name = names[randomIndex];

  names.splice(randomIndex, 1);

  return name;
}

// RESULT FUNCTION - generates wizards

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

// PART1 CALLBACK

var similarWizards = getWizard(WIZARD_CHARACTERISTICS);

// ----------------------------------------
// PART2
// ----------------------------------------

// DATA

var SIMILAR_WIZARD_TEMPLATE = {
  template: '#similar-wizard-template',
  nest: '.setup-similar-item',
  title: '.setup-similar-label',
  coat: '.wizard-coat',
  eyes: '.wizard-eyes'
};

// NODES.p2

var similarList = document.querySelector('.setup-similar-list');

// METHODS.p2

// fill textContent property of an owner

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// generate new HTML fragment in DOM

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

function addFillColor(owner, styleValue) {
  owner.style.fill = styleValue;
}

// PART2 RESULT - Function generate single documentFragment

function generateFragment(obj, data) {
  obj.getNest();

  fillTextContent(obj.getDomElement(obj.title), data.name + ' ' + data.surname);
  addFillColor(obj.getDomElement(obj.coat), data.coatColor);
  addFillColor(obj.getDomElement(obj.eyes), data.eyesColor);

  return obj.fragment;
}

// ----------------------------------------
// PART3
// ----------------------------------------

// NODES.p3

document.querySelector('.setup-similar').classList.remove('hidden');

// METHODS.p3

function renderSimilarWizards(obj, data) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_QTY; i++) {
    documentFragment.appendChild(generateFragment(new BuildTemplate(obj), data[i]));
  }

  similarList.appendChild(documentFragment);
}

// PART3 CALLBACK

renderSimilarWizards(SIMILAR_WIZARD_TEMPLATE, similarWizards);
