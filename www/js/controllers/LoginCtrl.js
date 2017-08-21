angular.module('starter')

.controller('LoginCtrl', function($scope, $http, AuthService, $translate){
  window.scope = $scope;
  $scope.user = {login: '', password: ''};
  $scope.authMessage = "";

  $scope.login = function(){
    AuthService.login($scope.user)
      .catch(function () {
        AuthService.logout();
        $translate('LOGIN_BAD_CREDENTIALS').then(function (translation) {
          $scope.authMessage = translation;
        });
      });
  };

  $scope.logout = function () {
    AuthService.logout();
  }
});


