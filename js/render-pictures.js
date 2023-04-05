const TIME_TO_CLOSE = 5000;

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();

/**
 * Отрисовывает изображения на странице
 * @param picturesData Массив из объектов с данными изображения
 */
const renderPictures = (picturesData) => {
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

/**
 * Показывает окно об ошибке на некоторое время, в случае неуспешного запроса к серверу
 */
const showErrorPopupOnLoading = () => {
  const errorBlock = document.querySelector('.load-error');
  errorBlock.classList.remove('hidden');

  setTimeout(() => {
    errorBlock.classList.add('hidden');
  }, TIME_TO_CLOSE);
};

export {renderPictures, showErrorPopupOnLoading};


