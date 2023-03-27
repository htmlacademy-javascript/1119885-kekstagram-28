/**
 * Проверка на имя нажатой клавиши
 * @param {event} evt
 * @returns {boolean} Если нажатая клавиша совпадает со значение, то true
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicate = (array) => array.some((element) => array.indexOf(element) !== array.lastIndexOf(element));

const randomizeArray = () => Math.random() - 0.5;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, hasDuplicate, randomizeArray, debounce};
