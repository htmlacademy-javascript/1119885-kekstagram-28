const TIME_TO_CLOSE = 5000;

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();

const clearPictures = (pictures) => {
  pictures.forEach((picture) => {
    picture.remove();
  });
};

/**
 * Отрисовывает изображения на странице
 * @param picturesData Массив из объектов с данными изображения
 */
const renderPictures = (picturesData) => {
  const pictures = document.querySelectorAll('.picture');
  clearPictures(pictures);
  picturesData.forEach(({id, url, comments, likes}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.dataset.imageId = id;
    picturesContainerFragment.append(picture);
  });
  picturesBlock.append(picturesContainerFragment);
};

const showSortButtons = () => {
  const filtersBlock = document.querySelector('.img-filters');
  filtersBlock.classList.remove('img-filters--inactive');
};

const showErrorPopupOnLoading = () => {
  const errorPopup = document.querySelector('.load-error');
  errorPopup.classList.remove('hidden');

  setTimeout(() => {
    errorPopup.classList.add('hidden');
  }, TIME_TO_CLOSE);
};

export {renderPictures, showErrorPopupOnLoading, showSortButtons};


