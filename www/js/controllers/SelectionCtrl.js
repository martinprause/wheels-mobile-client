angular.module('starter')

.controller('SelectionCtrl', function ($scope, $stateParams, SelectionService, AuthService) {

  $scope.select = function () {
    SelectionService.select();
  };

  $scope.logout = function (){
    AuthService.logout();
  }

});
