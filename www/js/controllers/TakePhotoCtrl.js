angular.module('starter')

  .controller('TakePhotoCtrl', function($scope, $stateParams) {
    this.order = $stateParams.order;
    //TODO: make take photo ctrl

    this.slides = ['one', 'two', 'three'];

  });
