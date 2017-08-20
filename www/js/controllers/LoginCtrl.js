angular.module('starter')

.controller('LoginCtrl', function($scope, $http, AuthService, $rootScope){
  window.scope = $scope;
  $scope.user = {login: '', password: ''};
  $scope.authMessage = "";

  $scope.login = function(){
    AuthService.login($scope.user)
      .catch(function () {
        AuthService.logout();
        $scope.authMessage = 'Bad credentials';
      });
  };

  $scope.logout = function () {
    AuthService.logout();
  }
});


