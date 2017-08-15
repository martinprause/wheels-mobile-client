angular.module('starter')

.controller('SideMenuController', function($scope, AuthService, $ionicHistory, $translate){
  $scope.currentLang = 'en';

  $scope.changeLocale = function () {
    // $scope.currentLang = $scope.currentLang === 'de' ? 'en' : 'de';
    console.log('adsasd',$scope.currentLang);
    $translate.use($scope.currentLang);
  };

  $scope.logout = function () {
    AuthService.logout();
    $ionicHistory.removeBackView();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
  }

});
