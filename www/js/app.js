angular.module('starter', ['ionic'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'mainContent': {
            templateUrl: 'templates/login.html'
          }
        },
        controller: 'LoginCtrl',
        authenticate: false,
        showHeader: true
      })

      .state('main', {
        url: '/main',
        views: {
          'mainContent': {
            templateUrl: 'templates/main.html'
          }
        },
        controller: 'MainCtrl',
        authenticate: true,
        showHeader: true
      })
      .state('further_contacts', { //TODO make it children of order
        url: '/further-contacts',
        views: {
          'mainContent': {
            templateUrl: 'templates/further_contacts.html'
          }
        },
        controller: 'further_contacts_ctrl',
        authenticate: false
      })
      .state('status-update', { //TODO make it children of order
        url: '/status-update',
        views: {
          'mainContent': {
            templateUrl: 'templates/status_update.html'
          }
        },
        controller: 'status_update_ctrl',
        authenticate: false
      })

    .state('selection', {
      url:'/selection',
      views: {
        'mainContent': {
          templateUrl: 'templates/selection.html'
        }
      },
      authenticate: true,
      showHeader: true
    });
    $urlRouterProvider.otherwise('/selection')

  })
  .run(function ($ionicPlatform, $rootScope, AuthService, $state, $location) {
    function onChangeStageStart(event, toState, toParams, fromState, fromParams) {
      if (!AuthService.checkAuth()){
        if (toState.name !== 'login'){
          $location.path('/login');
        }
      }
    }
    $rootScope.$on('$stateChangeStart', onChangeStageStart);

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
