angular.module('starter')

.controller('SignatureCtrl', function ($scope, $stateParams, $http, SignatureService) {

  $scope.order = $stateParams.order;
  $scope.signature = "data:image/png;base64," + $scope.order.signaturePicture;
  $scope.signed = false;
  $scope.signatureName = "";

  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new window.SignaturePad(canvas);

  $scope.clearSignature = function() {
    signaturePad.clear();
  };

  $scope.saveSignature = function() {
    $scope.signature = signaturePad.toDataURL();
    SignatureService.saveSignature($scope.signature, $scope.order.id, $scope.signatureName);
    $scope.signed = true;
    canvas.style.display = "none";
  };

});
