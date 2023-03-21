const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;

const reduceButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');


const addImageScaleHandlers = () => {
  reduceButton.addEventListener('click', () => {
    let scaleValue = parseInt(scaleControl.value, 10);
    if (scaleValue >= MIN_VALUE) {
      scaleValue -= STEP;
      if (scaleValue < MIN_VALUE) {
        scaleValue = MIN_VALUE;
      }
      scaleControl.value = `${scaleValue}%`;
      imagePreview.style.transform = `scale(0.${scaleValue})`;
    }
  });

  increaseButton.addEventListener('click', () => {
    let scaleValue = parseInt(scaleControl.value, 10);
    if (scaleValue <= MAX_VALUE) {
      scaleValue += STEP;
      if (scaleValue > MAX_VALUE) {
        scaleValue = MAX_VALUE;
      }
      scaleControl.value = `${scaleValue}%`;
      if (scaleValue === MAX_VALUE) {
        imagePreview.style.transform = 'scale(1)';
      } else {
        imagePreview.style.transform = `scale(0.${scaleValue})`;
      }
    }
  });
};

export {addImageScaleHandlers};
