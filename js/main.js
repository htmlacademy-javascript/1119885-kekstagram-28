import {addImageEditFormHandlers} from './form.js';
import {renderPictures, showErrorPopupOnLoading} from './render-pictures.js';
import {addOpenHandlerForBigPicturePopup} from './big-picture.js';
import {getData} from './api.js';
getData()
  .then((imagesData) => {
    renderPictures(imagesData);
    addOpenHandlerForBigPicturePopup(imagesData);
    addImageEditFormHandlers();
  })
  .catch(() => {
    showErrorPopupOnLoading();
  });
