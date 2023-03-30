import {isEscapeKey} from './utils.js';

const COMMENTS_PER_LOAD = 5;

const body = document.querySelector('body');

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const commentTemplate = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShown = bigPicture.querySelector('.comments-shown');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsLoaded = commentsList.children;

/**
 * Отрисовывает определенное количество комментариев на странице
 * @param {array} comments Массив из комментариев
 */
const renderComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsList.append(commentElement);
  });
};

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
    commentsShown.textContent = `${commentsLoaded.length}`;

    if (commentsLoaded.length >= comments.length) {
      commentsLoader.classList.add('hidden');
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

let onCommentsLoadClick;
/**
 * Действия, при закрытии окна большого изображения
 */
function onCancelButtonClick() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', onCommentsLoadClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * Создает обработчик событий для открытия окна большого изображения
 * @param {array} imagesData данные обо всех загруженных изображениях
 */
const addHandlersForBigPicturePopup = (imagesData) => {
  const picturesBlock = document.querySelector('.pictures');
  picturesBlock.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const pictureData = imagesData.find((imageData) => imageData.id === +picture.dataset.imageId);
      const {url, likes, comments} = pictureData;
      evt.preventDefault();

      commentsList.innerHTML = '';
      image.src = url;
      likesCount.textContent = likes;
      commentsCount.textContent = `${comments.length}`;
      caption.textContent = pictureData.description;

      renderComments(comments.slice(0, COMMENTS_PER_LOAD));
      commentsShown.textContent = `${commentsLoaded.length}`;
      if (commentsLoaded.length >= comments.length) {
        commentsLoader.classList.add('hidden');
      }
      onCommentsLoadClick = createCommentsLoad(comments);

      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');

      commentsLoader.addEventListener('click', onCommentsLoadClick);
      document.addEventListener('keydown', onDocumentKeydown);
    }
  });

  cancelButton.addEventListener('click', onCancelButtonClick);
};

export {addHandlersForBigPicturePopup};
