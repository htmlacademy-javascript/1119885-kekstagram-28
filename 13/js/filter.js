import {renderPictures} from './render-pictures.js';
import {debounce, randomizeArray} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT_DELAY = 500;

const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefaultButton = document.querySelector('#filter-default');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const filterRandomButton = document.querySelector('#filter-random');

/**
 * Добавляет обработчик на нужную кнопку фильтрации
 * @param button кнопка, на которую добавляется обработчик
 * @param cb функция рендера изображений по новому отфильтрованному массиву данных
 */
const addFilterButtonHandler = (button, cb) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');
    cb();
  });
};

/**
 * Добавляет обработчики событий на все кнопки фильтрации
 * @param imagesData данные об изображениях
 */
const addFilterButtonsHandlers = (imagesData) => {
  addFilterButtonHandler(filterDefaultButton, debounce(() => renderPictures(imagesData), TIMEOUT_DELAY));

  addFilterButtonHandler(filterDiscussedButton, debounce(() => {
    const filteredImagesData = imagesData
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length);
    return renderPictures(filteredImagesData);
  }, TIMEOUT_DELAY));

  addFilterButtonHandler(filterRandomButton, debounce(() => {
    const randomizedImagesData = imagesData
      .slice()
      .sort(randomizeArray);
    return renderPictures(randomizedImagesData.slice(0, RANDOM_PICTURES_COUNT));
  }, TIMEOUT_DELAY));
};

export {addFilterButtonsHandlers};
