import {generateImagesData} from './data.js';
import {renderPictures} from './render-pictures.js';
import {bigPictureRender} from './render-fullsize-picture.js';

const imagesData = generateImagesData(25);

renderPictures(imagesData);
bigPictureRender(imagesData);
