const checkStringLength = (string, characters) => string.length <= characters;
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

const checkPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return reverseString === string;
};
checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

const findNumbers = (string) => {
  if (typeof string === 'number') {
    string += '';
  }
  string = string.replaceAll(' ', '');
  let receivedNumber = '';
  let hasNumber = false;
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(+string[i])) {
      hasNumber = true;
      receivedNumber += string[i];
    }
  }
  return hasNumber ? receivedNumber : NaN;
};
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
  let resultString = '';
  if (!remainder || extraLineLength <= 0) {
    for (let i = 0; i < extraLineLength; i++) {
      extraLine += extraLine;
      resultString += extraLine[i];
    }
  } else {
    resultString = extraLine.slice(0, remainder);
    for (let i = 0; i < extraLineLength - remainder; i++) {
      extraLine += extraLine;
      resultString += extraLine[i];
    }
  }

  resultString += string;
  return resultString;
};

getFileAddress('1', 2, '0');
getFileAddress('1', 4, '0');
getFileAddress('q', 4, 'werty');
getFileAddress('q', 4, 'we');
getFileAddress('qwerty', 4, '0');

