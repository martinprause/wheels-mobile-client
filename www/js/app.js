angular.module('starter', [
  'ionic',
  'pascalprecht.translate',
  'ngCordova',
  'ngCordova.plugins.camera',
  'ionic-datepicker'
])
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
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })
      .state('app.login', {
        url: '/login',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/login.html'
          }
        },
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
      })
      .state('app.order.status-update', {
        url: '/status-update',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/status_update.html'
          }
        },
        controller: 'StatusUpdateCtrl',
        authenticate: false,
        params: {
          order: null
        }
      })
      .state('app.order.confirm-delivery', {
        url:'/confirm-delivery',
        views: {
          'mainContent@app': {
            templateUrl: 'templates/confirm-delivery.html'
          }
        },
        authenticate: true,
        params: {
          order:null
        }
      })
      .state('app.further-contacts', {
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
          order: null
        }
      })

      .state('app.order.assign-driver', {
        url: '/assign-driver',
        views: {
          'mainContent@app': {
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
      });
    $urlRouterProvider.otherwise('/app/selection')
  })
  .run(function ($ionicPlatform, $rootScope, AuthService, $state, $location, $ionicHistory) {

    $ionicPlatform.registerBackButtonAction(function(e){
      if ($rootScope.backButtonPressedOnceToExit) {
        ionic.Platform.exitApp();
      }

      else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      }
      else {
        $rootScope.backButtonPressedOnceToExit = true;
        window.plugins.toast.showShortBottom(
          "Press back button again to exit",function(a){},function(b){}
        );
        setTimeout(function(){
          $rootScope.backButtonPressedOnceToExit = false;
        },1000);
      }
      e.preventDefault();
      return false;
    },101);

    function onChangeStageStart(event, toState, toParams, fromState, fromParams) {
      if (!AuthService.checkAuth()){
        if (toState.name !== 'app.login'){
          $location.path('/app/login');
        }
      }
    }

    function onChangeStateSuccess(event, toState, toParams, fromState, fromParams){
      if(toState.name ==='app.login'){
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
