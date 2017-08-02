angular.module('starter')

.controller('LoginCtrl', function($scope, $http, AuthService, $rootScope){
  window.scope = $scope;
  $scope.user = {login: '', password: ''};
  $scope.authMessage = "";

  // $scope.showHeader = true;
  // $scope.headerImg = 'img/felgen.png';
  //
  // $rootScope.$on('$stateChangeStart', onStateChanged );
  //
  // function onStateChanged(event, toState, toParams, fromState, fromParams){
  //   console.log(event, toState, toParams, fromState, fromParams);
  //   $scope.showHeader = toState.showHeader;
  //   $scope.headerImg = 'img/felgen.png';
  // }

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


