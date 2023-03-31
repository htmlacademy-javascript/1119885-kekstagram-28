import {debounce, randomizeArray} from './utils.js';
import {renderPictures} from './render-pictures.js';

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT_DELAY = 500;

const filterButtons = document.querySelectorAll('.img-filters__button');

/**
 * Сортирует массив данных по количеству комментариев, от большего к меньшему
 * @param imagesData начальный массив данных
 * @returns отсортированный массив
 */
const filterDataDiscussed = (imagesData) => imagesData
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length);

/**
 * Перемешивает все элементы массива в случайном порядке
 * @param imagesData начальный массив данных
 * @returns отсортированный массив
 */
const filterDataRandom = (imagesData) => imagesData
  .slice()
  .sort(randomizeArray);

/**
 * Очищает все изображения на странице
 */
const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

/**
 * Показывает кнопки фильтрации изображений при успешном запросе к серверу
 */
const showSortButtons = () => {
  const filtersBlock = document.querySelector('.img-filters');
  filtersBlock.classList.remove('img-filters--inactive');
};

const filterImages = debounce((evt, imagesData) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const filterId = evt.target.id;

    clearPictures();

    switch (filterId) {
      case 'filter-default':
        renderPictures(imagesData);
        break;
      case 'filter-random':
        renderPictures(filterDataRandom(imagesData.slice(0, RANDOM_PICTURES_COUNT)));
        break;
      case 'filter-discussed':
        renderPictures(filterDataDiscussed(imagesData));
        break;
    }
  }
}, TIMEOUT_DELAY);

const addFilterHandler = (imagesData) => {
  showSortButtons();
  const filterBlock = document.querySelector('.img-filters__form');
  filterBlock.addEventListener('click', (evt) => {
    filterImages(evt, imagesData);
    filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
  });
};

export {addFilterHandler};
