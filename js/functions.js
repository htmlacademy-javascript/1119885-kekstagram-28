const checkStringLength = (string, characters) => string.length <= characters;
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

const checkPalindrome = (string) => {
  string = string
    .toLowerCase()
    .replaceAll(' ', '');
  const reverseString = Array.from(string)
    .reverse()
    .join('');
  return string === reverseString;
};
checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

const findNumbers = (string) => string
  .toString()
  .match(/\d+/ig) ? string
    .toString()
    .match(/\d+/ig)
    .join('') : NaN;

findNumbers('2023 год');
findNumbers('ECMAScript 2022');
findNumbers('1 кефир, 0.5 батона');
findNumbers('а я томат');
findNumbers(2023);
findNumbers(-1);
findNumbers(1.5);

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
