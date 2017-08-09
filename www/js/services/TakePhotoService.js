angular.module('starter')

  .service('TakePhotoService', function ($http, $stateParams, $cordovaCamera) {
    this.order = $stateParams.order;
    this.takePhoto = takePhoto;
    this.submitPhoto = submitPhoto;

    var self = this;

    function takePhoto(onSuccess, onFail) {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(onSuccess, onFail);
    }

    function submitPhoto() {
      var data = new FormData();
      var wheelsRimPicture1 = self.order.wheelsRimPicture1;
      data.append("wheel1", wheelsRimPicture1 === null ? null : data64toBlob(wheelsRimPicture1));
      var wheelsRimPicture2 = self.order.wheelsRimPicture2;
      data.append("wheel2", wheelsRimPicture2 === null ? null : data64toBlob(wheelsRimPicture2));
      var wheelsRimPicture3 = self.order.wheelsRimPicture3;
      data.append("wheel3", wheelsRimPicture3 === null ? null : data64toBlob(wheelsRimPicture3));
      var wheelsRimPicture4 = self.order.wheelsRimPicture4;
      data.append("wheel4", wheelsRimPicture4 === null ? null : data64toBlob(wheelsRimPicture4));

      var config = {
        headers: {
          'Content-Type': undefined
        }
      };
      var url = "/file/wheel-rim/?orderId=" + self.order.id;
      console.log(url);
      $http.post(url, data, config)
        .success(function (data) {
          console.log(data);
        })
        .error(function (data, status) {
          console.log(data, status);
        });

      function data64toBlob(data) {
        var byteString;
        byteString = atob(data);
        var content = [];
        for (var i = 0; i < byteString.length; i++) {
          content[i] = byteString.charCodeAt(i)
        }
        return new Blob([new Uint8Array(content)], {type: "image/jpeg"});
      }

    }
  });
