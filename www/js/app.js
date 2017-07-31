angular.module('starter', ['ionic'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'mainContent': {
            templateUrl: 'templates/login.html'
          }
        },
        controller: 'LoginCtrl',
        authenticate: false
      })

      .state('main', {
        url:'/main',
        views: {
          'mainContent': {
            templateUrl: 'templates/main.html'
          }
        },
        controller: 'MainCtrl',
        authenticate: true
      })

    .state('selection', {
      url:'/selection',
      views: {
        'mainContent': {
          templateUrl: 'templates/selection.html'
        }
      },
      authenticate: true
    });
    $urlRouterProvider.otherwise('/login')

  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
