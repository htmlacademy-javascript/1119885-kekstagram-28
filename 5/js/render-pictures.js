import {generateImagesData, ImagesCount} from './data.js';

const picturesData = generateImagesData(ImagesCount.DATA);
const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();
picturesData.forEach((pictureData) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = pictureData.url;
  picture.querySelector('.picture__comments').textContent = pictureData.comments.length;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picturesContainerFragment.append(picture);
});
picturesBlock.append(picturesContainerFragment);
