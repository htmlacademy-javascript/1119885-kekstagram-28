import {isEscapeKey} from './utils.js';

const COMMENTS_PER_LOAD = 5;

const picturesBlock = document.querySelector('.pictures');

const body = document.querySelector('body');

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureCancelButton = bigPictureBlock.querySelector('.big-picture__cancel');

const bigPictureCommentTemplate = bigPictureBlock.querySelector('.social__comment');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentsShown = bigPictureBlock.querySelector('.comments-shown');
const bigPictureCommentsList = bigPictureBlock.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const bigPictureComments = bigPictureCommentsList.children;

/**
 * Отрисовывает определенное количество комментариев на странице
 * @param {array} comments Массив из комментариев
 */
function renderComments(comments) {
  comments.forEach(({avatar, name, message}) => {
    const commentElement = bigPictureCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    bigPictureCommentsList.append(commentElement);
  });
}

/**
 * Функция, накапливающая значение загруженных комментариев изображения
 * @param {array} comments Данные о коментариях изображения
 * @returns {function(): number}
 */
const createCommentsLoad = (comments) => {
  let lastCommentIndex = COMMENTS_PER_LOAD;

  return () => {
    if (lastCommentIndex >= comments.length) {
      return;
    }

    renderComments(comments.slice(lastCommentIndex, lastCommentIndex + COMMENTS_PER_LOAD));
    bigPictureCommentsShown.textContent = `${bigPictureComments.length}`;

    if (bigPictureComments.length >= comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }

    lastCommentIndex += COMMENTS_PER_LOAD;
    return lastCommentIndex;
  };
};

/**
 * Закрытие окна большого изображения на клавишу Esc
 * @param {event} evt
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    onCancelButtonClick();
  }
};

/**
 * Загружает определенное количество комментариев по нажатию кнопки загрузки
 */
let onCommentsLoadClick = () => {
};

/**
 * Действия, при закрытии окна большого изображения
 */
function onCancelButtonClick() {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');

  bigPictureCommentsLoader.classList.remove('hidden');

  bigPictureCommentsLoader.removeEventListener('click', onCommentsLoadClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCancelButton.addEventListener('click', onCancelButtonClick);

/**
 * Создает обработчик событий для открытия окна большого изображения
 * @param {array} imagesData данные обо всех загруженных изображениях
 */
const addOpenHandlerForBigPicturePopup = (imagesData) => {
  picturesBlock.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const pictureData = imagesData.find((imageData) => imageData.id === +picture.dataset.imageId);
      evt.preventDefault();

      bigPictureCommentsList.innerHTML = '';
      bigPictureImage.src = pictureData.url;
      bigPictureLikes.textContent = pictureData.likes;
      bigPictureCommentsCount.textContent = `${pictureData.comments.length}`;
      bigPictureCaption.textContent = pictureData.description;

      renderComments(pictureData.comments.slice(0, COMMENTS_PER_LOAD));
      bigPictureCommentsShown.textContent = `${bigPictureComments.length}`;
      if (bigPictureComments.length >= pictureData.comments.length) {
        bigPictureCommentsLoader.classList.add('hidden');
      }

      bigPictureBlock.classList.remove('hidden');
      body.classList.add('modal-open');

      onCommentsLoadClick = createCommentsLoad(pictureData.comments);
      bigPictureCommentsLoader.addEventListener('click', onCommentsLoadClick);
      document.addEventListener('keydown', onDocumentKeydown);
    }
  });
};

export {addOpenHandlerForBigPicturePopup};
