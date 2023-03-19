/**
 * Проверка на имя нажатой клавиши
 * @param {event} evt
 * @returns {boolean} Если нажатая клавиша совпадает со значение, то true
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicate = (array) => array.some((element) => array.indexOf(element) !== array.lastIndexOf(element));

export {isEscapeKey, hasDuplicate};
