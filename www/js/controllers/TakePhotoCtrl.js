angular.module('starter')

  .controller('TakePhotoCtrl', function ($scope, TakePhotoService, $stateParams, OrderService) {

    $scope.EMPTY_IMG_PATH = 'img/no_image.png';
    $scope.BASE64_PREFIX = "data:image/jpeg;base64,";
    $scope.slides = ['wheelsRimPicture1', 'wheelsRimPicture2', 'wheelsRimPicture3', 'wheelsRimPicture4'];
    $scope.selectedImg = document.querySelector('#photo1');
    $scope.takePhoto = takePhoto;
    $scope.clearPhoto = clearPhoto;
    $scope.submitPhoto = submitPhoto;
    $scope.onSlideChanged = onSlideChanged;
    $scope.init = init;

    function takePhoto() {
      if($scope.selectedImg.src.indexOf($scope.EMPTY_IMG_PATH) < 0){
        return;
      }
      TakePhotoService.takePhoto(onSuccess, onFail);

      function onSuccess(imageData) {
        $scope.selectedImg.src = $scope.BASE64_PREFIX + imageData;
        $scope.order[$scope.selectedImg.id] = imageData;
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }

    function clearPhoto() {
      $scope.selectedImg.src = $scope.EMPTY_IMG_PATH;
      $scope.order[$scope.selectedImg.id] = null;
    }

    function submitPhoto() {
      TakePhotoService.submitPhoto($scope.order);
    }

    function onSlideChanged(index) {
      $scope.selectedImg = document.querySelector('#' + $scope.slides[index]);
      console.log($scope.selectedImg);
    }

    function init() {
      OrderService.getOrderById($stateParams.orderId).then(function (result) {
        $scope.order = result.data;
        var wheelsRimPicture1 = document.querySelector('#' + $scope.slides[0]);
        var wheelsRimPicture2 = document.querySelector('#' + $scope.slides[1]);
        var wheelsRimPicture3 = document.querySelector('#' + $scope.slides[2]);
        var wheelsRimPicture4 = document.querySelector('#' + $scope.slides[3]);
        $scope.selectedImg = wheelsRimPicture1;
        var order = $scope.order;
        if(order.wheelsRimPicture1 !== null) {
          wheelsRimPicture1.src = $scope.BASE64_PREFIX + order.wheelsRimPicture1;
        } else {
          wheelsRimPicture1.src = $scope.EMPTY_IMG_PATH;
        }
        if(order.wheelsRimPicture2 !== null) {
          wheelsRimPicture2.src = $scope.BASE64_PREFIX + order.wheelsRimPicture2;
        } else {
          wheelsRimPicture2.src = $scope.EMPTY_IMG_PATH;
        }
        if(order.wheelsRimPicture3 !== null) {
          wheelsRimPicture3.src = $scope.BASE64_PREFIX + order.wheelsRimPicture3;
        } else {
          wheelsRimPicture3.src = $scope.EMPTY_IMG_PATH;
        }
        if(order.wheelsRimPicture4 !== null) {
          wheelsRimPicture4.src = $scope.BASE64_PREFIX + order.wheelsRimPicture4;
        } else {
          wheelsRimPicture4.src = $scope.EMPTY_IMG_PATH;
        }
      });
    }
  });
