import {generateImagesData} from './mocks/data.js';
import {renderPictures} from './render-pictures.js';
import {addOpenHandlerForBigPicturePopup} from './render-fullsize-picture.js';
import {addOpenAndCloseHandlersForImageEditForm} from './form-validation.js';

const imagesData = generateImagesData(25);

renderPictures(imagesData);
addOpenHandlerForBigPicturePopup(imagesData);
addOpenAndCloseHandlersForImageEditForm();
