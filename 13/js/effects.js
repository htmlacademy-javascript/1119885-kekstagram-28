const EFFECTS = [
  {
    name: 'none'
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
const effectLevel = document.querySelector('.img-upload__effect-level');
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

effectLevel.classList.add('hidden');

/**
 * Добавляет обработчики событий на радио кнопки выбора эффектов
 * @param {array} effects Массив объектов с описаниями эффектов
 */
const addEffectInputsHandlers = (effects) => {
  effects.forEach((effect) => {
    const {name, style, min, max, step, unit} = effect;
    const effectButton = Array.from(effectsRadioInputs)
      .find((input) => `${input.id}` === `effect-${name}`);

    if (name === 'none') {
      effectButton.addEventListener('change', () => {
        image.removeAttribute('class');
        effectLevel.classList.add('hidden');
        image.style.filter = '';
      });
    } else {
      effectButton.addEventListener('change', () => {
        image.removeAttribute('class');
        image.classList.add(`effects__preview--${name}`);
        effectLevel.classList.remove('hidden');

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
