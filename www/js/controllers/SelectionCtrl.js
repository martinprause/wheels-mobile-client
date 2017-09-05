angular.module('starter')

.controller('SelectionCtrl', function ($scope, $stateParams, SelectionService, AuthService, QrScanService) {

  try {
    $scope.currentUser = AuthService.getCurrentUser();
  }
  catch (error){
  }

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
