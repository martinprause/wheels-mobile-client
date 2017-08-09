angular.module('starter', ['ionic', 'pascalprecht.translate', 'ngCordova', 'ngCordova.plugins.camera'])
  .config(function ($stateProvider, $urlRouterProvider,$httpProvider, $translateProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'js/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en': 'en', 'en_GB': 'en', 'en_US': 'en',
        'de': 'de', 'de_DE': 'de', 'de_CH': 'de'
      })
      .preferredLanguage('de')
      .fallbackLanguage('de')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');
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
      .state('further-contacts', { //TODO make it children of order
        url: '/further-contacts',
        views: {
          'mainContent': {
            templateUrl: 'templates/further_contacts.html'
          }
        },
        controller: 'FurtherContactsCtrl',
        authenticate: false,
        params: {
          order: null
        }
      })
      .state('status-update', { //TODO make it children of order
        url: '/status-update',
        views: {
          'mainContent': {
            templateUrl: 'templates/status_update.html'
          }
        },
        controller: 'StatusUpdateCtrl',
        authenticate: false,
        params: {
          order: null
        }
      })
      .state('take-photo', {
        url: '/take-photo',
        views: {
          'mainContent': {
            templateUrl: 'templates/take_photo.html'
          }
        },
        controller: 'TakePhotoCtrl',
        authenticate: false,
        params: {
          order: null
        }
      })

      .state('assign-driver', {
        url: '/assign-driver',
        views: {
          'mainContent': {
            templateUrl: 'templates/assign_driver.html'
          }
        },
        controller: 'AssignDriverCtrl',
        authenticate: false,
        params: {
          order: null
        },
        resolve: {
          drivers: function ($q, $stateParams, AssignDriverService) {
            var deferred = $q.defer();
            AssignDriverService.loadAllDrivers().then(deferred.resolve, deferred.resolve);
            AssignDriverService.order = $stateParams.order;
            return deferred.promise;
          }
        }
      })
      .state('selection', {
        url:'/selection',
        views: {
          'mainContent': {
            templateUrl: 'templates/selection.html'
          }
        },
        authenticate: true
      })
      .state('confirm-delivery', {
        url:'/confirm-delivery',
        views: {
          'mainContent': {
            templateUrl: 'templates/confirm-delivery.html'
          }
        },
        authenticate: true,
        params: {
          order:null
        }
      })
      .state('order', {
        url:'/order',
        views: {
          'mainContent': {
            templateUrl: 'templates/order.html'
          }
        },
        authenticate: true,
        params: {
          order: null
        }
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

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}
