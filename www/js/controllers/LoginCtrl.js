angular.module('starter')

.controller('LoginCtrl', function($scope, $http, AuthService, $rootScope){
  window.scope = $scope;
  $scope.user = {login: '', password: ''};
  $scope.authMessage = "";

  $scope.login = function(){
    AuthService.login($scope.user)
      .catch(function () {
        $scope.authMessage = 'Bad creds';
      });
  };

  $scope.logout = function () {
    AuthService.logout();
  }
});


