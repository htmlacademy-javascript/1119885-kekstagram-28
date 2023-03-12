import {picturesData} from './data.js';
import {createElement} from './utils.js';

const commentsList = document.querySelector('.social__comments');
const renderComments = (picture) => {
  const currentPictureComments = picturesData[picture.getAttribute('data-image-id') - 1].comments;
  currentPictureComments.forEach(({avatar, name, message}) => {
    const commentElement = createElement('li', 'social__comment');
    commentElement.innerHTML = '<img class="social__picture"' +
      ` src="${avatar}"` +
      ` alt="${name}"` +
      ' width="35" height="35">' +
      `<p class="social__text">${message}</p>`;
    commentsList.append(commentElement);
  });
};

const clearComments = () => {
  commentsList.innerHTML = '';
};

export {renderComments, clearComments};
