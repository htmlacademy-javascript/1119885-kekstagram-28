import {addImageEditFormHandlers} from './form.js';
import {renderPictures, showErrorPopupOnLoading, showSortButtons} from './render-pictures.js';
import {addOpenHandlerForBigPicturePopup} from './big-picture.js';
import {getData} from './api.js';
import {addSortButtonsHandlers} from './sort.js';

getData()
  .then((imagesData) => {
    showSortButtons();
    renderPictures(imagesData);
    addSortButtonsHandlers(imagesData);
    addOpenHandlerForBigPicturePopup(imagesData);
    addImageEditFormHandlers();
  })
  .catch(() => {
    showErrorPopupOnLoading();
  });
