import {addImageEditFormHandlers} from './form.js';
import {renderPictures, showErrorPopupOnLoading} from './render-pictures.js';
import {addHandlersForBigPicturePopup} from './big-picture.js';
import {getData} from './api.js';
import {addFilterHandler} from './filter.js';

getData()
  .then((imagesData) => {
    renderPictures(imagesData);
    addFilterHandler(imagesData);
    addHandlersForBigPicturePopup(imagesData);
    addImageEditFormHandlers();
  })
  .catch(() => {
    showErrorPopupOnLoading();
  });
