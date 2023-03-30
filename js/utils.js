/**
 * Проверка на имя нажатой клавиши
 * @param evt
 * @returns {boolean} если нажатая клавиша совпадает со значение, то true
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Проверка на дубликаты в массиве
 * @param array массив для проверки
 * @returns {boolean} если дубликаты присутствуют, то true
 */
const hasDuplicate = (array) => array.some((element) => array.indexOf(element) !== array.lastIndexOf(element));

/**
 * Функция для перемешивания всех элементов в массиве в случайном порядке
 * @returns {number}
 */
const randomizeArray = () => Math.random() - 0.5;

/**
 * Функция для устранения дребезга
 * @param callback функция, вызываемая, когда кончится время задержки
 * @param timeoutDelay время задержки перед выпонением колбек-функции
 * @returns функция, сбрасывающая время задержки и вызывающая колбек-функцию
 */
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, hasDuplicate, randomizeArray, debounce};
