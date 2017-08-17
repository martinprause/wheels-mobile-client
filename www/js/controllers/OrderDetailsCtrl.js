angular.module('starter')

.controller('OrderDetailsCtrl', function ($scope, $state, $stateParams, $ionicModal, orderData) {
  $scope.order = orderData.data;
  $scope.EMPTY_IMG_PATH = 'img/no_image.png';
  $scope.BASE64_PREFIX = "data:image/jpeg;base64,";
  $scope.zipCity = $scope.order.customer.zipCode + " " + $scope.order.customer.city;
  $scope.wheelsRimPicture1 = "";
  $scope.wheelsRimPicture2 = "";
  $scope.wheelsRimPicture3 = "";
  $scope.wheelsRimPicture4 = "";
  $scope.signature = "";

  $ionicModal.fromTemplateUrl('templates/wheels-modal.html', function(modal) {
    $scope.pictureModal = modal;
  }, {
    scope: $scope,
    animation: 'scale-in'
  });

  $ionicModal.fromTemplateUrl('templates/signature-modal.html', function(modal) {
    $scope.signatureModal = modal;
  }, {
    scope: $scope,
    animation: 'scale-in'
  });
  $ionicModal.fromTemplateUrl('templates/wheels-info-modal.html', function(modal) {
    $scope.wheelsInfo = modal;
  }, {
    scope: $scope,
    animation: 'scale-in'
  });

  $scope.navigateToFurtherContacts = function(){
    $state.go('.further-contacts', {order: $scope.order});
  };


  //Todo: change modal event close animation

  $scope.showWheelsInfo = function() {
    $scope.wheelsInfo.show();
  };
  $scope.hideWheelsInfo = function() {
    $scope.wheelsInfo.hide();
  };


  $scope.showPictures = function () {
    init();
    $scope.pictureModal.show();
    document.getElementById("pictureSlider").style.display = "block";
  };

  $scope.closeModal = function(){
    document.getElementById("pictureSlider").style.display = "none";
    $scope.pictureModal.hide();
  };

  $scope.showSignature = function () {
    initSignature();
    $scope.signatureModal.show();
    document.getElementById("signature").style.display = "block";
  };

  $scope.closeSignature = function () {
    document.getElementById("signature").style.display = "block";
    $scope.signatureModal.hide();
  };

  function init() {
    if($scope.order.wheelsRimPicture1 !== null) {
      $scope.wheelsRimPicture1 = $scope.BASE64_PREFIX + $scope.order.wheelsRimPicture1;
    } else {
      $scope.wheelsRimPicture1 = $scope.EMPTY_IMG_PATH;
    }
    if($scope.order.wheelsRimPicture2 !== null) {
      $scope.wheelsRimPicture2 = $scope.BASE64_PREFIX + $scope.order.wheelsRimPicture2;
    } else {
      $scope.wheelsRimPicture2 = $scope.EMPTY_IMG_PATH;
    }
    if($scope.order.wheelsRimPicture3 !== null) {
      $scope.wheelsRimPicture3 = $scope.BASE64_PREFIX + $scope.order.wheelsRimPicture3;
    } else {
      $scope.wheelsRimPicture3 = $scope.EMPTY_IMG_PATH;
    }
    if($scope.order.wheelsRimPicture4 !== null) {
      $scope.wheelsRimPicture4 = $scope.BASE64_PREFIX + $scope.order.wheelsRimPicture4;
    } else {
      $scope.wheelsRimPicture4 = $scope.EMPTY_IMG_PATH;
    }
  }

  function initSignature() {
    console.log($scope.order);
    if ($scope.order.signaturePicture !== null) {
      $scope.signature = $scope.BASE64_PREFIX + $scope.order.signaturePicture;
    }
  }

});
