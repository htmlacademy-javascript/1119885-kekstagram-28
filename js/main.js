import {addImageEditFormHandlers} from './form.js';
import {renderPictures, showErrorPopupOnLoading, showSortButtons} from './render-pictures.js';
import {addHandlersForBigPicturePopup} from './big-picture.js';
import {getData} from './api.js';
import {addFilterButtonsHandlers} from './filter.js';

getData()
  .then((imagesData) => {
    showSortButtons();
    renderPictures(imagesData);
    addFilterButtonsHandlers(imagesData);
    addHandlersForBigPicturePopup(imagesData);
    addImageEditFormHandlers();
  })
  .catch(() => {
    showErrorPopupOnLoading();
  });
