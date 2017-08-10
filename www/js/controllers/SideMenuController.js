angular.module('starter')

.controller('SideMenuController', function($scope, AuthService, $ionicHistory){

  $scope.logout = function () {
    AuthService.logout();
    $ionicHistory.removeBackView();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
  }

});
