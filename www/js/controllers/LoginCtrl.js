angular.module('starter')

.controller('LoginCtrl', function($scope, $http, AuthService, $translate){
  window.scope = $scope;
  $scope.user = {login: '', password: ''};
  $scope.authMessage = "";
  $scope.showLoader = false;

  $scope.login = function(){
    $scope.showLoader = true;
    AuthService.login($scope.user).
    then(function () {
      $scope.showLoader = false;
    })
      .catch(function () {
        AuthService.logout();
        $translate('LOGIN_BAD_CREDENTIALS').then(function (translation) {
          $scope.authMessage = translation;
          $scope.showLoader = false;
        });
      });
  };

  $scope.logout = function () {
    AuthService.logout();
  }
});


