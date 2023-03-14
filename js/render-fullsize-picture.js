import {createElement, isEscapeKey} from './utils.js';

const picturesBlock = document.querySelector('.pictures');

const body = document.querySelector('body');

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureComments = bigPictureBlock.querySelector('.social__comments');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    onCancelButtonClick();
  }
};

function renderComments(comments) {
  comments.forEach(({avatar, name, message}) => {
    const commentElement = createElement('li', 'social__comment');
    commentElement.innerHTML = '<img class="social__picture"' +
      ` src="${avatar}"` +
      ` alt="${name}"` +
      ' width="35" height="35">' +
      `<p class="social__text">${message}</p>`;
    bigPictureComments.append(commentElement);
  });
}

const fillBigPicture = (evt, picture, imagesData) => {
  const pictureData = imagesData[picture.getAttribute('data-image-id') - 1];

  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureCommentsCount.textContent = `${pictureData.comments.length}`;
  bigPictureCaption.textContent = pictureData.description;

  renderComments(pictureData.comments);
};

function onCancelButtonClick() {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');

  bigPictureComments.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.removeEventListener('click', onCancelButtonClick);
}

const bigPictureRender = (imagesData) => {
  picturesBlock.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      bigPictureBlock.classList.remove('hidden');
      body.classList.add('modal-open');
      evt.preventDefault();

      fillBigPicture(evt, picture, imagesData);

      document.addEventListener('keydown', onDocumentKeydown);
      bigPictureCloseButton.addEventListener('click', onCancelButtonClick);
    }
  });
};

export {bigPictureRender};

