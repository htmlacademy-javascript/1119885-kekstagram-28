import {hasDuplicate, isEscapeKey} from './utils.js';
import {addImageScaleHandlers, removeImageScaleHandlers} from './scale-image.js';
import {addEffectInputsHandlers, EFFECTS} from './effects.js';
import {sendData} from './api.js';

const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const editImageForm = uploadForm.querySelector('.img-upload__overlay');
const uploadButton = uploadForm.querySelector('#upload-file');

const imagePreviewBlock = editImageForm.querySelector('.img-upload__preview');
const image = imagePreviewBlock.querySelector('img');
const cancelButton = editImageForm.querySelector('.img-upload__cancel');

const scaleControl = document.querySelector('.scale__control--value');

const sliderElement = editImageForm.querySelector('.img-upload__effect-level');
const noneEffectButton = editImageForm.querySelector('#effect-none');

const hashtagField = editImageForm.querySelector('.text__hashtags');
const commentField = editImageForm.querySelector('.text__description');

const body = document.querySelector('body');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
});

/**
 * Закрытие окна большого изображения на клавишу Esc
 * @param {event} evt
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && (evt.target !== hashtagField) && (evt.target !== commentField)) {
    closeImageEditorPopup();
  }
};

/**
 * Закрывает форму редактирования изображения по нажатию кнопки закрытия или нажатию клавиши Esc, очищает все поля форм
 */
function closeImageEditorPopup() {
  uploadButton.value = '';
  hashtagField.value = '';
  commentField.value = '';
  scaleControl.value = '100%';

  removeImageScaleHandlers();

  body.classList.remove('modal-open');
  editImageForm.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onEditImageFormCancelButtonClick = () => {
  closeImageEditorPopup();
};

let hashtagErrorMessage = '';
/**
 * Проверяет, правильные ли данные введены в поле для ввода хэш-тегов
 * @param hashtagsString Значение поля для ввода хэш-тегов
 * @returns {boolean} Если в значении есть ошибки, то false
 */
const validateHashtag = (hashtagsString) => {
  const hashtags = hashtagsString.replace(/ +/g, ' ')
    .trim()
    .split(' ');

  if (hashtagField.value === '') {
    hashtagErrorMessage = '';
    return true;
  }

  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    hashtagErrorMessage = `Количество хэш-тегов не должно превышать ${HASHTAGS_MAX_COUNT}`;
    return false;
  }

  for (const hashtag of hashtags) {
    if (hashtag[0] !== '#') {
      hashtagErrorMessage = 'Хэш-тег должен начинаться со знака "#"';
      return false;
    }

    if (hashtag.length > HASHTAG_MAX_LENGTH || hashtag.length < HASHTAG_MIN_LENGTH) {
      hashtagErrorMessage = `Хэш-тег должен содержать от ${HASHTAG_MIN_LENGTH} до ${HASHTAG_MAX_LENGTH} символов`;
      return false;
    }

    if (!(hashtag.match(/^#[a-zа-яё0-9]{1,19}$/i))) {
      hashtagErrorMessage = 'Хэш-тег содержит недопустимые символы';
      return false;
    }
  }

  const hashtagsLowerCase = hashtags.map((hashtag) => hashtag.toLowerCase());
  if (hasDuplicate(hashtagsLowerCase)) {
    hashtagErrorMessage = 'Не должно быть повторяющихся хэш-тегов';
    return false;
  }
  return true;
};

/**
 * Проверяет, правильные ли данные введены в поле для ввода комментария
 * @param commentString Значение поля для ввода комментария
 * @returns {boolean} Если в значении есть ошибки, то false
 */
const validateComment = (commentString) => commentString.length <= COMMENT_MAX_LENGTH;

const getHashtagErrorMessage = () => hashtagErrorMessage;
const getCommentErrorMessage = () => `Комментарий не должен превышать ${COMMENT_MAX_LENGTH} символов`;

pristine.addValidator(hashtagField, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(commentField, validateComment, getCommentErrorMessage);

const successPopup = document.querySelector('#success').content.querySelector('.success');
const successPopupButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorPopupButton = errorPopup.querySelector('.error__button');

const onEscapeButtonClickForSuccessMessages = () => {
  closeSuccessPopup();
};

function onOtherAreaClickForSuccessMessages(evt) {
  if (!(evt.target.closest('.success__inner'))) {
    closeSuccessPopup();
  }
}

successPopupButton.addEventListener('click', () => {
  closeSuccessPopup();
});

function closeSuccessPopup() {
  body.removeChild(successPopup);
  document.removeEventListener('keydown', onEscapeButtonClickForSuccessMessages);
  document.removeEventListener('click', onOtherAreaClickForSuccessMessages);
}

const showSuccessPopupOnSending = () => {
  body.append(successPopup);
  document.addEventListener('keydown', onEscapeButtonClickForSuccessMessages);
  document.addEventListener('click', onOtherAreaClickForSuccessMessages);
};

const onEscapeButtonClickForErrorMessages = () => {
  closeErrorPopup();
};

function onOtherAreaClickForErrorMessages(evt) {
  if (!(evt.target.closest('.error__inner'))) {
    closeErrorPopup();
  }
}

errorPopupButton.addEventListener('click', () => {
  closeErrorPopup();
});

function closeErrorPopup() {
  document.addEventListener('keydown', onDocumentKeydown);
  body.removeChild(errorPopup);
  document.removeEventListener('keydown', onEscapeButtonClickForErrorMessages);
  document.removeEventListener('click', onOtherAreaClickForErrorMessages);
}

const showErrorPopupOnSending = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  body.append(errorPopup);
  document.addEventListener('keydown', onEscapeButtonClickForErrorMessages);
  document.addEventListener('click', onOtherAreaClickForErrorMessages);
};

const uploadSuccess = () => {
  uploadButton.disabled = true;
  closeImageEditorPopup();
  showSuccessPopupOnSending();
};

const uploadError = () => {
  uploadButton.disabled = true;
  showErrorPopupOnSending();
};

/**
 * Попытка отправки данных о фотографии на сервер
 * @param evt
 */
const onUploadFormButtonClick = (evt) => {
  evt.preventDefault();
  const fetchBody = new FormData(evt.target);
  sendData(fetchBody)
    .then(() => {
      if (pristine.validate()) {
        uploadSuccess();
      } else {
        uploadError();
      }
    })
    .catch(() => {
      showErrorPopupOnSending();
    })
    .finally(() => {
      uploadButton.disabled = false;
    });
};

/**
 * Открытие окна редактирования изображения
 */
const onUploadChange = () => {
  imagePreviewBlock.style.transform = '';
  image.style.filter = '';
  image.removeAttribute('class');
  noneEffectButton.checked = true;

  pristine.validate();

  body.classList.add('modal-open');
  sliderElement.classList.add('hidden');
  editImageForm.classList.remove('hidden');

  addImageScaleHandlers();

  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onUploadFormButtonClick);
};

/**
 * Добавляет обработчики для открытия и закрытия формы редактирования изображений
 */
const addImageEditFormHandlers = () => {
  uploadButton.addEventListener('change', onUploadChange);
  cancelButton.addEventListener('click', onEditImageFormCancelButtonClick);
  addEffectInputsHandlers(EFFECTS);
};

export {addImageEditFormHandlers};
