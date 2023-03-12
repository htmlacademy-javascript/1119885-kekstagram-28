import {renderComments, clearComments} from './render-comments.js';

const body = document.querySelector('body');
const picturesBlock = document.querySelector('.pictures');
const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeFullSizeImage();
  }
};

function openFullSizeImage(evt) {
  const picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    bigPictureBlock.classList.remove('hidden');
    body.classList.add('.modal-open');
    bigPictureBlock.querySelector('.big-picture__img img').src = picture.querySelector('.picture__img').src;
    bigPictureBlock.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    bigPictureBlock.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
    bigPictureBlock.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

    bigPictureBlock.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureBlock.querySelector('.comments-loader').classList.add('hidden');
    renderComments(picture);
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function closeFullSizeImage() {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('.modal-open');
  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesBlock.addEventListener('click', openFullSizeImage);
bigPictureCloseButton.addEventListener('click', closeFullSizeImage);
