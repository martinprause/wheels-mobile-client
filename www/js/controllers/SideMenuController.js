angular.module('starter')

.controller('SideMenuController', function($scope, AuthService, $ionicHistory, $translate){

  $scope.currentLang = window.localStorage.Locale;
  $scope.currentUser = AuthService.getCurrentUser();

  $scope.changeLocale = function () {
    $translate.use($scope.currentLang);
    window.localStorage.setItem("Locale", $scope.currentLang);
  };

  $scope.logout = function () {
    AuthService.logout();
    $ionicHistory.removeBackView();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
  }

});
