angular.module('starter')

.service('AuthService', function ($http, $location, $state) {
  return {
      login: login,
      logout: logout,
      checkAuth: checkAuth
    };

    function logout(){
      window.localStorage.removeItem('Authorization');
      $state.go("login");
    }

    function login(user){
      window.localStorage.setItem("Authorization", "Basic " + btoa(user.login + ":" + user.password));
      return $http.get('/login')
        .then(function () {
          $state.go("selection");
        }).catch(function (error) {
          console.log(error);
          console.log($http);
        })
    }

    function checkAuth(){
      return !(window.localStorage.getItem("Authorization") === null);
    }

});
