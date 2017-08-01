angular.module('starter')

.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = [
  '$scope', '$http', '$rootScope'
];

function LoginCtrl($scope, $http, $rootScope){
  $scope.user = {login: '', password: ''};

  $scope.showHeader = true;
  $scope.headerImg = 'img/felgen.png';

  $rootScope.$on('$stateChangeStart', onStateChanged );

  function onStateChanged(event, toState, toParams, fromState, fromParams){
    console.log(event, toState, toParams, fromState, fromParams);
    $scope.showHeader = toState.showHeader;
    $scope.headerImg = 'img/felgen.png';
  }

  $scope.login = function(){
    $http.get('http://192.168.88.97:8080/user/0', {
      headers: {'Authorization': 'Basic YWRtaW46cA=='}
    }).then(function (user) {
      console.log(user);
    }).catch(function (err) {
      console.log(err);
    })
  }
}
