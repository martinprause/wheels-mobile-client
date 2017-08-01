'use strict';
angular.module('starter')
.factory('AuthInterceptor', function ($rootScope, $q, $window, $location, $injector) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.Authorization) {
        config.headers.Authorization = $window.localStorage.Authorization;
      }
      return config;
    },

    responseError: function (response) {
      if (response.status === 401) {
        $location.path('/');
        $injector.invoke(function ($http, AuthService) {
          AuthService.logout();
          console.log("Logout")
        });
        return $q.reject();
      }
      return $q.reject(response);
    }
  };
});
