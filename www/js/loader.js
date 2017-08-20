angular.module('starter')

  .factory('loader', function loaderFactory($ionicLoading) {
  return {
    show: function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
    },
    hide: function () {
      $ionicLoading.hide();
    }
  }
});
