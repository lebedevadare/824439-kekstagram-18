'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTOS_QUANTITY = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var FOLDER = 'photos/';
var PATH_TO_AVATAR = 'img/avatar-';
var EXTENSION_AVATAR = '.svg';
var EXTENSION_PHOTO = '.jpg';
var NAMES = ['Артем', 'Дарья', 'Михаил', 'Костя', 'Стас', 'Ксюша'];


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPathFile = function (folder, increment, extension) {
  return folder + increment + extension;
};

// Создает комментарий
var getCommentGuest = function (namePhoto, namesUser, commentsUsers) {
  var pathAvatar = getPathFile(PATH_TO_AVATAR, namePhoto, EXTENSION_AVATAR);
  var messageUser = commentsUsers [getRandomNumber(0, commentsUsers.length - 1)];
  var namesClient = namesUser [getRandomNumber(0, namesUser.length - 1)];
  return {
    avatar: pathAvatar,
    message: messageUser,
    name: namesClient,
  };
};

//  Массив объектов - коментарии
var createCommentsUsers = function (namesUser, commentsUsers) {
  var arrayCommentsUsers = [];
  var quantityUsers = getRandomNumber(1, namesUser.length);

  for (var i = 1; i <= quantityUsers; i++) {
    var number = getRandomNumber(1, 6);
    var itemComment = getCommentGuest(number, namesUser, commentsUsers);
    arrayCommentsUsers.push(itemComment);
  }

  return arrayCommentsUsers;
};

// Описание под фото(объект)
var createDescription = function (namePhoto) {
  var pathPhoto = getPathFile(FOLDER, namePhoto, EXTENSION_PHOTO);
  var likesUsers = getRandomNumber(MIN_LIKES, MAX_LIKES);
  var commentsUsers = createCommentsUsers(NAMES, COMMENTS);
  return {
    url: pathPhoto,
    likes: likesUsers,
    description: 'Описание под фото',
    comments: commentsUsers
  };
};

//  Описание под фото(массив объектов)
var createArrayDescriptions = function (quantityPhotos) {
  var arrayDescriptions = [];

  for (var i = 1; i <= quantityPhotos; i++) {
    var itemDescription = createDescription(i);
    arrayDescriptions.push(itemDescription);
  }

  return arrayDescriptions;
};
var arrayPhotos = createArrayDescriptions(PHOTOS_QUANTITY);

var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var photo = templatePicture.querySelector('img');
var comments = templatePicture.querySelector('.picture__comments');
var likes = templatePicture.querySelector('.picture__likes');
var picturesContainer = document.querySelector('.pictures');

var createNewPicture = function (pictureDescription) {
  photo.src = pictureDescription.url;
  comments.textContent = pictureDescription.comments.length;
  likes.textContent = pictureDescription.likes;

  return templatePicture.cloneNode(true);
};

var getPicturesContainer = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayPhotos.length; i++) {
    var itemPicture = createNewPicture(arrayPhotos [i]);
    fragment.appendChild(itemPicture);
  }

  picturesContainer.appendChild(fragment);
};

getPicturesContainer();

var bigPicture = document.querySelector('.big-picture');
var image = bigPicture.querySelector('.big-picture__img img');
var likesUsersImage = bigPicture.querySelector('.likes-count');
var commentsUsersImage = bigPicture.querySelector('.comments-count');
var captionSocial = bigPicture.querySelector('.social__caption');
var commentsBlock = bigPicture.querySelector('.social__comments');


var createCommentsBlock = function (commnent) {
  var squareLengthBlock = 35;
  var createBlock = document.createElement('li');
  var createImg = document.createElement('img');
  var createP = document.createElement('p');
  createBlock.appendChild(createImg);
  createBlock.appendChild(createP);
  createBlock.classList.add('social__comment');
  createImg.classList.add('social__picture');
  createP.classList.add('social__text');
  createImg.setAttribute('src', commnent.avatar);
  createImg.setAttribute('alt', commnent.name);
  createImg.setAttribute('width', squareLengthBlock);
  createImg.setAttribute('height', squareLengthBlock);
  createP.innerHTML = commnent.message;
  return createBlock;
};

var createFullSizePhoto = function (picture) {
  bigPicture.classList.remove('hidden');
  image.src = picture.url;
  likesUsersImage.textContent = picture.likes;
  commentsUsersImage.textContent = picture.comments.length;
  captionSocial.textContent = picture.description;
  commentsBlock.innerHTML = '';
  for (var i = 0; i < picture.comments.length; i++) {
    commentsBlock.appendChild(createCommentsBlock(picture.comments[i]))
  }
};

createFullSizePhoto(arrayPhotos[getRandomNumber(0, arrayPhotos.length)]);
