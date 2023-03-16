/**
 * Функция для получения случайного числа из диапазона
 * @param min левая граница диапазона
 * @param max правая граница диапазона
 * @returns {number} Случайное число из диапазона
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Функция для генерации ID изображений
 * @returns {function(): number} Уникальное число ID
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

/**
 * Функция для получения неповторяющихся случайных чисел из диапазона
 * @param min левая граница диапазона
 * @param max правая граница диапазона
 * @returns {function(): null|number} случайное неповторяющееся число из диапазона
 */
const getRandomNoRepeatInt = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min) + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Функция для получения случайного элемента в массиве
 * @param array исходный массив
 * @returns {*} случайный элемент исходного массива
 */
const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

/**
 *
 * @param tagName название тега
 * @param className класс тега
 * @returns {*} тег с классом;
 */
const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInt, getRandomArrayElement, getRandomNoRepeatInt, createElement, createIdGenerator, isEscapeKey};
