import {createElement, isEscapeKey} from './utils.js';

const COMMENTS_PER_LOAD = 5;

const picturesBlock = document.querySelector('.pictures');

const body = document.querySelector('body');

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentsShown = bigPictureBlock.querySelector('.comments-shown');
const bigPictureCommentsList = bigPictureBlock.querySelector('.social__comments');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const bigPictureComments = bigPictureCommentsList.children;

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
    bigPictureCommentsList.append(commentElement);
  });
}

const createCommentsLoad = (pictureData) => {
  let lastCommentIndex = 0;

  return () => {
    if (lastCommentIndex >= pictureData.comments.length) {
      return;
    }

    renderComments(pictureData.comments.slice(lastCommentIndex, lastCommentIndex + 5));
    bigPictureCommentsShown.textContent = `${bigPictureComments.length}`;

    if (bigPictureComments.length >= pictureData.comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }

    lastCommentIndex += COMMENTS_PER_LOAD;
    return lastCommentIndex;
  };
};

const fillBigPicture = (evt, {url, likes, comments, description}) => {
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = `${comments.length}`;
  bigPictureCaption.textContent = description;
};

function onCancelButtonClick() {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');

  bigPictureCommentsList.innerHTML = '';
  bigPictureCommentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.removeEventListener('click', onCancelButtonClick);
}

const bigPictureRender = (imagesData) => {
  picturesBlock.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const pictureData = imagesData[picture.getAttribute('data-image-id') - 1];

      bigPictureBlock.classList.remove('hidden');
      body.classList.add('modal-open');
      evt.preventDefault();

      fillBigPicture(evt, pictureData);

      const onCommentsLoadClick = createCommentsLoad(pictureData);
      onCommentsLoadClick();

      bigPictureCommentsLoader.addEventListener('click', onCommentsLoadClick);
      document.addEventListener('keydown', onDocumentKeydown);
      bigPictureCloseButton.addEventListener('click', onCancelButtonClick);
    }
  });
};

export {bigPictureRender};

