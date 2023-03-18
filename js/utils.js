/**
 * Проверка на имя нажатой клавиши
 * @param {event} evt
 * @returns {boolean} Если нажатая клавиша совпадает со значение, то true
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};
