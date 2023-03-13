/**
 * Функция для проверки длины строки
 * @param {string} string проверяемая строка
 * @param {number} characters Количество символов, которое не должна превышать строка
 * @returns {boolean}
 */
const checkStringLength = (string, characters) => string.length <= characters;
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

/**
 * Функция для проверки слова или строки на палиндром
 * @param {string} string проверяемая строка
 * @returns {boolean}
 */
const checkPalindrome = (string) => {
  string = string
    .toLowerCase()
    .replaceAll(' ', '');
  return string === string
    .split('')
    .reverse()
    .join('');
};
checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

/**
 * Функция для нахождения всех цифр в строке
 * @param string проверяемая строка
 * @returns {string|number}
 */
const findNumbers = (string) => string.toString().match(/\d+/ig) ?
  string.toString().match(/\d+/ig).join('') : NaN;

findNumbers('2023 год');
findNumbers('ECMAScript 2022');
findNumbers('1 кефир, 0.5 батона');
findNumbers('а я томат');
findNumbers(2023);
findNumbers(-1);
findNumbers(1.5);

/**
 * Функция, которая возвращает исходную строку, дополненную указанными символами до заданной длины.
 * @param {string} string исходная строка
 * @param {number} length минимальная длина строки
 * @param {string} extraLine - добавочные символы
 * @returns {string}
 */
const getFileAddress = (string, length, extraLine) => {
  const extraLineLength = length - string.length;
  const remainder = extraLineLength % extraLine.length;
  let resultString = extraLine.slice(0, remainder);
  for (let i = 0; i < extraLineLength - remainder; i++) {
    extraLine += extraLine[i];
    resultString += extraLine[i];
  }
  resultString += string;
  return resultString;
};

getFileAddress('1', 2, '0');
getFileAddress('1', 4, '0');
getFileAddress('q', 4, 'werty');
getFileAddress('q', 4, 'we');
getFileAddress('qwerty', 4, '0');
