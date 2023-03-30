const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;
const PERCENT_VALUE = 100;

const reduceButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

/**
 * Уменьшает масштаб изображения по клику на кнопку уменьшения
 */
const onReduceScaleButtonClick = () => {
  let scaleValue = parseInt(scaleControl.value, 10);
  scaleValue -= STEP;
  if (scaleValue < MIN_VALUE) {
    scaleValue = MIN_VALUE;
  }
  scaleControl.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / PERCENT_VALUE})`;
};

/**
 * Увеличивает масштаб изображения по клику на кнопку увеличения
 */
const onIncreaseButtonClick = () => {
  let scaleValue = parseInt(scaleControl.value, 10);
  scaleValue += STEP;
  if (scaleValue > MAX_VALUE) {
    scaleValue = MAX_VALUE;
  }
  scaleControl.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / PERCENT_VALUE})`;
};

/**
 * Добавляет обработчики на кнопки уменьшения и увеличения масшатба
 */
const addImageScaleHandlers = () => {
  reduceButton.addEventListener('click', onReduceScaleButtonClick);
  increaseButton.addEventListener('click', onIncreaseButtonClick);
};

/**
 * Удаляет обработчики с кнопок уменьшения и увеличения масштаба
 */
const removeImageScaleHandlers = () => {
  reduceButton.removeEventListener('click', onReduceScaleButtonClick);
  increaseButton.removeEventListener('click', onIncreaseButtonClick);
};

export {addImageScaleHandlers, removeImageScaleHandlers};
