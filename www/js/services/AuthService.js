angular.module('starter')

.factory('AuthService', function ($http, $location, $state, $ionicHistory, $window) {

  // var fabric = {
  //   currentUser: {}
  // };

  return {
      getCurrentUser: getCurrentUser,
      login: login,
      logout: logout,
      checkAuth: checkAuth
    };


    function logout(){
      window.localStorage.removeItem('Authorization');
      window.localStorage.removeItem('currentUser');
      $state.go("login");
    }

    function login(user){
      window.localStorage.setItem("Authorization", "Basic " + btoa(user.login + ":" + user.password));
      return $http.get('/login')
        .then(function (result) {
          $state.go("app.selection");
          $window.localStorage.currentUser = JSON.stringify(result.data);
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
        })
    }

    function checkAuth(){
      return !(window.localStorage.getItem("Authorization") === null);
    }

    function getCurrentUser() {
      return JSON.parse($window.localStorage.currentUser);
    }

});
