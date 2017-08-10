angular.module('starter')

.service('AuthService', function ($http, $location, $state, $ionicHistory) {
  return {
      login: login,
      logout: logout,
      checkAuth: checkAuth
    };

    function logout(){
      window.localStorage.removeItem('Authorization');
      $state.go("app.login");
    }

    function login(user){
      window.localStorage.setItem("Authorization", "Basic " + btoa(user.login + ":" + user.password));
      return $http.get('/login')
        .then(function () {
          $state.go("app.selection");
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
        }).catch(function (error) {
          console.log(error);
          console.log($http);
        })
    }

    function checkAuth(){
      return !(window.localStorage.getItem("Authorization") === null);
    }

});
