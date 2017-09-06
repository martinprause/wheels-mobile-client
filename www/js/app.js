angular.module('starter', [
  'ionic',
  'pascalprecht.translate',
  'ngCordova',
  'ngCordova.plugins.camera',
  'ionic-datepicker'
])
  .config(function ($httpProvider, $translateProvider) {
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
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.scrolling.jsScrolling(false);
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
      console.log('onChangeStageStart',arguments);
      // event.preventDefault();
      $rootScope.stateIsLoading = true;
      if (!AuthService.checkAuth()){
        if (toState.name !== 'login'){
          $location.path('/login');
        }
      }
    }

    function onChangeStateSuccess(event, toState, toParams, fromState, fromParams){
      console.log('onChangeStateSuccess',arguments);
      $rootScope.stateIsLoading = false;
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
