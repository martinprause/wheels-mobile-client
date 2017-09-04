angular.module('starter')

.controller('SelectionCtrl', function ($scope, $stateParams, SelectionService, AuthService, QrScanService) {

  $scope.currentUser = AuthService.getCurrentUser();

  console.log($scope.currentUser);

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
