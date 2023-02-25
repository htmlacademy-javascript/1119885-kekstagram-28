const DESCRIPTIONS = [
  'Моя лучшая фотография',
  'Только для вас мой эксклюзивный контент',
  'Не самая лучшая фотография'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Алексей',
  'Владимир',
  'Василий',
  'Григорий',
  'Евдоким',
  'Артём',
  'Илья',
  'Владислав',
  'Глеб'
];

const IMAGES_DATA_COUNT = 25;
const IMAGES_ID_COUNT = 25;
const IMAGES_URL_COUNT = 25;
const AVATARS_COUNT = 6;

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
const getRandomArrayElement = (array) => array[getRandomInt(0, array.length)];

const getRandomId = getRandomNoRepeatInt(1, IMAGES_ID_COUNT);
const getRandomCommentId = getRandomNoRepeatInt(1, 1000);
const getRandomUrl = getRandomNoRepeatInt(1, IMAGES_URL_COUNT);

/**
 * Функция для создания данных комментария
 * @returns объект с данными комментария
 */
const generateComment = () => ({
  id: getRandomCommentId(),
  avatar: `img/avatar-${getRandomInt(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

/**
 * Функция для создания данных изображения
 * @returns Объект с данными изображения
 */
const generateImageData = () => ({
  id: getRandomId(),
  url: `photos/${getRandomUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(0, 5)}, generateComment)
});

const imagesData = Array.from({length: IMAGES_DATA_COUNT}, generateImageData);

// eslint-disable-next-line no-console
console.log(imagesData);
