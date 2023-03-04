import {getRandomInt, getRandomNoRepeatInt, getRandomArrayElement} from './utils.js';

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

const ImagesCount = {
  DATA: 25,
  ID: 25,
  URL: 25
};
const AVATARS_COUNT = 6;

const getRandomId = getRandomNoRepeatInt(1, ImagesCount.ID);
const getRandomCommentId = getRandomNoRepeatInt(1, 1000);
const getRandomUrl = getRandomNoRepeatInt(1, ImagesCount.URL);

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

/**
 * Создает массив из объектов с описаниями изображений
 * @returns Массив из объектов
 */
const generateImagesData = () => Array.from({length: ImagesCount.DATA}, generateImageData);

export {generateImagesData};
