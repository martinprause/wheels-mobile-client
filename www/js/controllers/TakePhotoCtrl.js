angular.module('starter')

  .controller('TakePhotoCtrl', function ($scope, TakePhotoService) {
    this.order = TakePhotoService.order;
    this.EMPTY_IMG_PATH = 'img/no_image.png';
    this.BASE64_PREFIX = "data:image/jpeg;base64,";
    this.slides = ['wheelsRimPicture1', 'wheelsRimPicture2', 'wheelsRimPicture3', 'wheelsRimPicture4'];
    this.selectedImg = document.querySelector('#photo1');
    this.takePhoto = takePhoto;
    this.clearPhoto = clearPhoto;
    this.submitPhoto = submitPhoto;
    this.onSlideChanged = onSlideChanged;
    this.init = init;

    var self = this;
    function takePhoto() {
      if(self.selectedImg.src.indexOf(self.EMPTY_IMG_PATH) < 0){
        return;
      }
      TakePhotoService.takePhoto(onSuccess, onFail);

      function onSuccess(imageData) {
        self.selectedImg.src = self.BASE64_PREFIX + imageData;
        self.order[self.selectedImg.id] = imageData;
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }

    function clearPhoto() {
      self.selectedImg.src = self.EMPTY_IMG_PATH;
      self.order[self.selectedImg.id] = null;
    }

    function submitPhoto() {
      TakePhotoService.submitPhoto();
    }

    function onSlideChanged(index) {
      self.selectedImg = document.querySelector('#' + self.slides[index]);
      console.log(self.selectedImg);
    }

    function init() {
      var wheelsRimPicture1 = document.querySelector('#' + self.slides[0]);
      var wheelsRimPicture2 = document.querySelector('#' + self.slides[1]);
      var wheelsRimPicture3 = document.querySelector('#' + self.slides[2]);
      var wheelsRimPicture4 = document.querySelector('#' + self.slides[3]);
      self.selectedImg = wheelsRimPicture1;
      var order = self.order;
      if(order.wheelsRimPicture1 !== null) {
        wheelsRimPicture1.src = self.BASE64_PREFIX + order.wheelsRimPicture1;
      } else {
        wheelsRimPicture1.src = self.EMPTY_IMG_PATH;
      }
      if(order.wheelsRimPicture2 !== null) {
        wheelsRimPicture2.src = self.BASE64_PREFIX + order.wheelsRimPicture2;
      } else {
        wheelsRimPicture2.src = self.EMPTY_IMG_PATH;
      }
      if(order.wheelsRimPicture3 !== null) {
        wheelsRimPicture3.src = self.BASE64_PREFIX + order.wheelsRimPicture3;
      } else {
        wheelsRimPicture3.src = self.EMPTY_IMG_PATH;
      }
      if(order.wheelsRimPicture4 !== null) {
        wheelsRimPicture4.src = self.BASE64_PREFIX + order.wheelsRimPicture4;
      } else {
        wheelsRimPicture4.src = self.EMPTY_IMG_PATH;
      }
    }
  });
