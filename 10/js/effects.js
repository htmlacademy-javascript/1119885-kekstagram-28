const slider = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectValueInput = document.querySelector('.effect-level__value');

const noneEffectButton = document.querySelector('#effect-none');
const chromeEffectButton = document.querySelector('#effect-chrome');
const sepiaEffectButton = document.querySelector('#effect-sepia');
const marvinEffectButton = document.querySelector('#effect-marvin');
const phobosEffectButton = document.querySelector('#effect-phobos');
const heatEffectButton = document.querySelector('#effect-heat');


noUiSlider.create(slider, {
  start: 1,
  range: {
    'min': 0,
    'max': 1
  },
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});
const updateSliderOptions = (start = 1, rangeMin = 0, rangeMax = 1, step = 0.1) => {
  slider.noUiSlider.updateOptions({
    start: start,
    range: {
      'min': rangeMin,
      'max': rangeMax
    },
    step: step
  });
};

document.querySelector('.img-upload__effect-level').classList.add('hidden');

const addEffectButtonsHandlers = () => {
  noneEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    image.style.filter = '';
  });

  chromeEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    image.classList.add('effects__preview--chrome');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');

    updateSliderOptions(1, 0, 1, 0.1);

    slider.noUiSlider.on('update', () => {
      effectValueInput.value = slider.noUiSlider.get();
      image.style.filter = `grayscale(${effectValueInput.value})`;
    });
  });

  sepiaEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    image.classList.add('effects__preview--sepia');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');

    updateSliderOptions(1, 0, 1, 0.1);

    slider.noUiSlider.on('update', () => {
      effectValueInput.value = slider.noUiSlider.get();
      image.style.filter = `sepia(${effectValueInput.value})`;
    });
  });

  marvinEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    image.classList.add('effects__preview--marvin');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');

    updateSliderOptions(100, 0, 100, 1);

    slider.noUiSlider.on('update', () => {
      effectValueInput.value = slider.noUiSlider.get();
      image.style.filter = `invert(${effectValueInput.value}%)`;
    });
  });

  phobosEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    image.classList.add('effects__preview--phobos');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');

    updateSliderOptions(3, 0, 3, 0.1);

    slider.noUiSlider.on('update', () => {
      effectValueInput.value = slider.noUiSlider.get();
      image.style.filter = `blur(${effectValueInput.value}px)`;
    });
  });

  heatEffectButton.addEventListener('change', () => {
    image.removeAttribute('class');
    image.classList.add('effects__preview--heat');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');

    updateSliderOptions(3, 1, 3, 0.1);

    slider.noUiSlider.on('update', () => {
      effectValueInput.value = slider.noUiSlider.get();
      image.style.filter = `brightness(${effectValueInput.value})`;
    });
  });
};


export {addEffectButtonsHandlers};
