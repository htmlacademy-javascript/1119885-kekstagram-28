import {generateImagesData} from './mocks/data.js';
import {renderPictures} from './render-pictures.js';
import {ShowBigPictureOnClick} from './render-fullsize-picture.js';

const imagesData = generateImagesData(25);

renderPictures(imagesData);
ShowBigPictureOnClick(imagesData);
