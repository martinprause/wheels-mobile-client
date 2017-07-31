angular.module('starter')

.controller('LoginCtrl', function($scope, $http){
  $scope.user = {login: '', password: ''};

  $scope.login = function(){
    $http.get('http://192.168.88.97:8080/user/0', {
      headers: {'Authorization': 'Basic YWRtaW46cA=='}
    }).then(function (user) {
      console.log(user);
    }).catch(function (err) {
      console.log(err);
    })
  }
});
