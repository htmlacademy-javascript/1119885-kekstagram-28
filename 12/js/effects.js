const EFFECTS = [
  {
    name: 'original'
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const slider = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectValueInput = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.img-upload__effect-level');

const effectsRadioInputs = document.querySelectorAll('.effects__radio');

noUiSlider.create(slider, {
  start: 1,
  range: {
    min: 0,
    max: 1
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

/**
 * Обновляет параметры слайдера
 * @param {number} min минимальное значение слайдера
 * @param {number} max максимальное значение слайдера
 * @param {number} step шаг значения слайдера
 */
const updateSliderOptions = (min = 0, max = 1, step = 0.1) => {
  slider.noUiSlider.updateOptions({
    start: max,
    range: {
      min: min,
      max: max
    },
    step: step
  });
};

sliderElement.classList.add('hidden');

/**
 * Добавляет обработчики событий на радио кнопки выбора эффектов
 * @param {array} effects Массив объектов с описаниями эффектов
 */
const addEffectInputsHandlers = (effects) => {
  effects.forEach((effect, index) => {
    const {name, style, min, max, step, unit} = effect;
    if (name === 'original') {
      effectsRadioInputs[index].addEventListener('change', () => {
        image.removeAttribute('class');
        sliderElement.classList.add('hidden');
        image.style.filter = '';
      });
    } else {
      effectsRadioInputs[index].addEventListener('change', () => {
        image.removeAttribute('class');
        image.classList.add(`effects__preview--${name}`);
        sliderElement.classList.remove('hidden');

        updateSliderOptions(min, max, step);

        slider.noUiSlider.on('update', () => {
          effectValueInput.value = slider.noUiSlider.get();
          image.style.filter = `${style}(${effectValueInput.value}${unit})`;
        });
      });
    }
  });
};

export {addEffectInputsHandlers, EFFECTS};
