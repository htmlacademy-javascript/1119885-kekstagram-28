import {renderPictures} from './render-pictures.js';
import {debounce, randomizeArray} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT_DELAY = 500;

const filterButtons = document.querySelectorAll('.img-filters__button');

const filterDefaultButton = document.querySelector('#filter-default');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const filterRandomButton = document.querySelector('#filter-random');

const addSortButtonHandler = (button, cb) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');
    cb();
  });
};

const addSortButtonsHandlers = (imagesData) => {
  addSortButtonHandler(filterDefaultButton, debounce(() => renderPictures(imagesData), TIMEOUT_DELAY));

  addSortButtonHandler(filterDiscussedButton, debounce(() => {
    const sortedImagesData = imagesData
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length);
    return renderPictures(sortedImagesData);
  }, TIMEOUT_DELAY));

  addSortButtonHandler(filterRandomButton, debounce(() => {
    const randomizedImagesData = imagesData
      .slice()
      .sort(randomizeArray);
    return renderPictures(randomizedImagesData.slice(0, RANDOM_PICTURES_COUNT));
  }, TIMEOUT_DELAY));
};

export {addSortButtonsHandlers};
