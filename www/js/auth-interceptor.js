'use strict';
angular.module('starter')
.factory('AuthInterceptor', function ($rootScope, $q, $window, $location, $injector) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (!config.url.endsWith('.html') && !config.url.endsWith('.json')) {
        config.url = 'http://192.168.88.97:8080' + config.url;
        // config.url = 'http://34.202.124.10/mobile' + config.url;
        config.headers.Authorization = $window.localStorage.Authorization;
      }
      return config;
    }
  };
});
