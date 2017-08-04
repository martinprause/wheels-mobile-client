'use strict';
angular.module('starter')
.factory('AuthInterceptor', function ($rootScope, $q, $window, $location, $injector) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      // config.url = "http://192.168.88.97:8080" + config.url;
      if ($window.localStorage.Authorization) {
        config.headers.Authorization = $window.localStorage.Authorization;
      }
      return config;
    },
    response: function (response) {
      var responseData = response.data;
      if (typeof responseData === 'string' || responseData instanceof String) {
        if (responseData === 'ADMIN' || responseData === 'ENGINEER' || responseData === 'DRIVER') {
          $rootScope.USER_ROLE = responseData;
        }
      }
      return response;
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
