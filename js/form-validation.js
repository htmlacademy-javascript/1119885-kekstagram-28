import {hasDuplicate, isEscapeKey} from './utils.js';

const uploadButton = document.querySelector('#upload-file');
const editImageForm = document.querySelector('.img-upload__overlay');
const cancelButton = editImageForm.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const body = document.querySelector('body');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
}, false);

/**
 * Закрытие окна большого изображения на клавишу Esc
 * @param {event} evt
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    onEditImageFormCancelButtonClick();
  }
};

hashtagField.addEventListener('focusin', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagField.addEventListener('focusout', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

commentField.addEventListener('focusin', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

commentField.addEventListener('focusout', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

/**
 * Закрывает форму редактирования изображения по нажатию кнопки закрытия или нажатию клавиши Esc, очищает все поля форм
 */
function onEditImageFormCancelButtonClick() {
  uploadButton.value = '';
  hashtagField.value = '';
  commentField.value = '';

  pristine.destroy();

  editImageForm.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

/**
 * Создает сообщение об ошибке, в случае неверно введенных данных в поле для ввода хэш-тегов
 * @param hashtagsString Значение поля для ввода хэш-тегов
 * @returns {string} Сообщение об ошибке
 */
function getHashtagErrorMessage(hashtagsString) {
  const hashtags = hashtagsString.replace(/ +/g, ' ')
    .trim()
    .split(' ');

  if (hashtags.length > 5) {
    return 'Количество хэш-тегов не должно превышать пяти';
  }

  for (const hashtag of hashtags) {
    if (hashtag.length > 20 || hashtag.length < 2) {
      return 'Хэш-тег должен содержать от 2 до 20 символов';
    }

    if (hashtag[0] !== '#') {
      return 'Хэш-тег должен начинаться со знака "#"';
    }

    if (!(hashtag.match(/[a-zа-яё0-9]{1,19}$/i))) {
      return 'Хэш-тег содержит недопустимые символы';
    }
  }

  const hashtagsLowerCase = hashtags.map((hashtag) => hashtag.toLowerCase());
  if (hasDuplicate(hashtagsLowerCase)) {
    return 'Не должно быть повторяющихся хэш-тегов';
  }
}

/**
 * Проверяет, правильные ли данные введены в поле для ввода хэш-тегов
 * @param hashtagsString Значение поля для ввода хэш-тегов
 * @returns {boolean} Если в значении есть ошибки, то false
 */
function validateHashtag(hashtagsString) {
  const hashtags = hashtagsString.replace(/ +/g, ' ')
    .trim()
    .split(' ');

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!(hashtag.match(/^#[a-zа-яё0-9]{1,19}$/i)) && hashtag !== '') {
      return false;
    }
  }

  const hashtagsLowerCase = hashtags.map((hashtag) => hashtag.toLowerCase());
  return !hasDuplicate(hashtagsLowerCase);
}

/**
 * Создает сообщение об ошибке, в случае неверно введенных данных в поле для ввода комментария
 * @returns {string} Сообщение об ошибке
 */
function getCommentErrorMessage() {
  return 'Комментарий не должен превышать 140 символов';
}

/**
 * Проверяет, правильные ли данные введены в поле для ввода комментария
 * @param commentString Значение поля для ввода комментария
 * @returns {boolean} Если в значении есть ошибки, то false
 */
function validateComment(commentString) {
  return commentString.length <= 140;
}

/**
 * Проверка на валидность при попытке отправить данные формы
 * @param evt
 */
function onUploadFormButtonClick(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

/**
 * Открытие окна редактирования изображения
 */
function onUploadClick() {
  body.classList.add('modal-open');
  editImageForm.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onUploadFormButtonClick);

  pristine.addValidator(hashtagField, validateHashtag, getHashtagErrorMessage);
  pristine.addValidator(commentField, validateComment, getCommentErrorMessage);
}

/**
 * Добавляет обработчики для открытия и закрытия формы редактирования изображений
 */
const addOpenAndCloseHandlersForImageEditForm = () => {
  uploadButton.addEventListener('change', onUploadClick);
  cancelButton.addEventListener('click', onEditImageFormCancelButtonClick);
};

export {addOpenAndCloseHandlersForImageEditForm};


