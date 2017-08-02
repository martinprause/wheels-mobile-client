angular.module('starter')

.controller('SelectionCtrl', function ($scope, $stateParams, SelectionService, AuthService, QrScanService) {

  $scope.select = function () {
    SelectionService.select();
  };

  $scope.logout = function (){
    AuthService.logout();
  };

  $scope.scanQrCode = function () {
    QrScanService.scanQrCode();
  }

});
