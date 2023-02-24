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

const IMAGE_DESCRIPTIONS_COUNT = 25;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomNoRepeatInt = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if(previousValues.length >= (max - min) + 1) {
      return null;
    }
    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length)];

const getRandomId = getRandomNoRepeatInt(1, 25);
const getRandomCommentId = getRandomNoRepeatInt(1, 1000);
const getRandomUrl = getRandomNoRepeatInt(1, 25);

const createImageDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: {
    id: getRandomCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  }
});

const imageDescriptions = Array.from({length: IMAGE_DESCRIPTIONS_COUNT}, createImageDescription);

// eslint-disable-next-line no-console
console.log(imageDescriptions);


