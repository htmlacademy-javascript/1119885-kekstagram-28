import {generateImagesData, ImagesCount} from './data.js';

const picturesData = generateImagesData(ImagesCount.DATA);
const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();
picturesData.forEach(({url, description, comments, likes}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picturesContainerFragment.append(picture);
});
picturesBlock.append(picturesContainerFragment);
