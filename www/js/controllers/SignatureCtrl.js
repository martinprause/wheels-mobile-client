angular.module('starter')

.controller('SignatureCtrl', function ($scope, $http, SignatureService, orderData, $state, $ionicPopup) {

  $scope.order = orderData.data;
  $scope.signature = "data:image/png;base64," + $scope.order.signaturePicture;
  $scope.signed = false;
  $scope.signatureName = {
    value: ''
  };

  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new window.SignaturePad(canvas);

  $scope.clearSignature = function() {
    signaturePad.clear();
  };

  $scope.saveSignature = function(confirmForm) {
    if (confirmForm.$valid){
      $ionicPopup.confirm({
        title: 'Confirm delivery',
        template: 'Do you want to confirm delivery?'
      })
        .then(function (result) {
          if (result) {
            $scope.signature = signaturePad.toDataURL();
            SignatureService.saveSignature($scope.signature, $scope.order.id, $scope.signatureName.value).then(function (result) {
              $scope.order = result.data;
              $state.go('app.order', {orderId: $scope.order.id})
            });
          }
        });
    }
  };

});
