const TIME_TO_CLOSE = 5000;

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * Создает изоюражение на основе данных
 * @param data данные об изображении
 * @returns елемент изображения
 */
const createPicture = (data) => {
  const {id, url, comments, likes} = data;
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.imageId = id;
  return picture;
};

/**
 * Отрисовывает изображения на странице
 * @param picturesData Массив из объектов с данными изображения
 */
const renderPictures = (picturesData) => {
  picturesData.forEach((data) => {
    picturesBlock.append(createPicture(data));
  });
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


