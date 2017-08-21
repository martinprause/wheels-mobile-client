angular.module('starter', [
  'ionic',
  'pascalprecht.translate',
  'ngCordova',
  'ngCordova.plugins.camera',
  'ionic-datepicker'
])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    if (window.localStorage.Locale == null){
      window.localStorage.setItem('Locale', 'en');
    }

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'js/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en': 'en', 'en_GB': 'en', 'en_US': 'en',
        'de': 'de', 'de_DE': 'de', 'de_CH': 'de'
      })
      .preferredLanguage(window.localStorage.Locale)
      .fallbackLanguage(window.localStorage.Locale)
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        authenticate: false
      })
      .state('app.selection', {
        url: '/selection',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/selection.html'
          }
        },
        authenticate: true
      })
      .state('app.search-order', {
        url: '/search-order',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/search-order.html'
          }
        },
        authenticate: true
      })
      .state('app.order', {
        url:'/order/:orderId',
        views: {
          'mainContent': {
            templateUrl: 'templates/order.html',
            controller: 'OrderCtrl'
          }
        },
        authenticate: true,
        resolve : {
          orderData:  function(OrderService, $stateParams){
            return OrderService.getOrderById($stateParams.orderId);
          }
        },
        cache: false
      })
      .state('app.order.order-details', {
        url:'/order-details',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/order-details.html',
            controller: 'OrderDetailsCtrl'
          }
        },
        authenticate: true,
        resolve: {
          orderData: function(OrderService, $stateParams){
            return OrderService.getOrderById($stateParams.orderId);
          }
        }
      })
      .state('app.order.status-update', {
        url: '/status-update',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/status_update.html',
            controller:  'StatusUpdateCtrl'
          }
        },
        authenticate: true,
        resolve : {
          orderData:  function(OrderService, $stateParams){
            return OrderService.getOrderById($stateParams.orderId);
          }
        }
      })
      .state('app.order.assign-driver', {
          url: '/assign-driver',
          views: {
            'mainContent@app': {
              templateUrl: 'templates/assign_driver.html',
              controller: 'AssignDriverCtrl'
            }
          },
          authenticate: true,
          resolve: {
            drivers: function ($q, $stateParams, AssignDriverService) {
              var deferred = $q.defer();
              AssignDriverService.loadAllDrivers().then(deferred.resolve, deferred.resolve);
              AssignDriverService.order = $stateParams.order;
              return deferred.promise;
            },
            orderData:  function(OrderService, $stateParams){
              return OrderService.getOrderById($stateParams.orderId);
            }
          },
        cache: false
        })
      .state('app.order.confirm-delivery', {
        url:'/confirm-delivery',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/confirm-delivery.html',
            controller: "SignatureCtrl"
          }
        },
        authenticate: true,
        resolve : {
          orderData:  function(OrderService, $stateParams){
            return OrderService.getOrderById($stateParams.orderId);
          }
        }
      })

      .state('app.order.order-details.further-contacts', {
        url: '/further-contacts',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/further_contacts.html'
          }
        },
        controller: 'FurtherContactsCtrl',
        authenticate: false,
        params: {
          order: null
        }
      })

      .state('app.order.take-photo', {
        url: '/take-photo',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/take_photo.html'
          }
        },
        controller: 'TakePhotoCtrl',
        authenticate: false,
        params: {
          orderId: null
        }
      });
    $urlRouterProvider.otherwise('/app/selection')
  })
  .run(function ($ionicPlatform, $rootScope, AuthService, $state, $location, $ionicHistory, $translate) {
    $ionicPlatform.registerBackButtonAction(function(e){
      var title = 'test';
      $translate('BACK_BUTTON_TITLE').then(function (translation) {
        title = translation;
        if ($rootScope.backButtonPressedOnceToExit) {
          ionic.Platform.exitApp();
        }

        else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        }
        else {
          $rootScope.backButtonPressedOnceToExit = true;
          window.plugins.toast.showShortBottom(
            title, function(a){}, function(b){}
          );
          setTimeout(function(){
            $rootScope.backButtonPressedOnceToExit = false;
          },1000);
        }
        e.preventDefault();
        return false;
      })
    },101);

    function onChangeStageStart(event, toState, toParams, fromState, fromParams) {
      if (!AuthService.checkAuth()){
        if (toState.name !== 'login'){
          $location.path('/login');
        }
      }
    }

    function onChangeStateSuccess(event, toState, toParams, fromState, fromParams){
      if(toState.name ==='login'){
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }
    }

    $rootScope.$on('$stateChangeStart', onChangeStageStart);
    $rootScope.$on('$stateChangeSuccess', onChangeStateSuccess);

    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .service('utility', function ($filter) {
    this.translate = function(value) {
      return $filter('translate')(value)
    }
  })

.filter('ifEmpty', function($filter) {
  return function (input, defaultValue) {
    if (angular.isUndefined(input) || input === null || input === '' || input.trim() === '') {
      return defaultValue;
    }
    return input;
  }
});

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function (searchString, position) {
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
