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

var getCommentGuest = function (namePhoto, namesUser, commentsUsers) {
  var pathAvatar = getPathFile(PATH_TO_AVATAR, namePhoto, EXTENSION_AVATAR);
  var messageUser = commentsUsers [getRandomNumber(0, commentsUsers.length - 1)];
  var namesClient = namesUser [getRandomNumber(0, namesUser.length - 1)];

  return {
    avatar: pathAvatar,
    message: messageUser,
    name: namesClient
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
    description: 'Hi lOl',
    likes: likesUsers,
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
var arrayMockData = createArrayDescriptions(PHOTOS_QUANTITY);

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

  for (var i = 0; i < arrayMockData.length; i++) {
    var itemPicture = createNewPicture(arrayMockData[i]);
    fragment.appendChild(itemPicture);
  }

  picturesContainer.appendChild(fragment);
};

getPicturesContainer();

