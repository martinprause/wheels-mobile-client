angular.module('starter')
  .directive('order', function() {

    return {
      restrict: 'E',
      templateUrl: 'templates/directives/order.template.html',
      scope: {
        'orderData': '=',
        'detailes': '@?'
      },
      controller: ['$scope', '$ionicModal', function ($scope, $ionicModal) {
        console.log('init order');
        $scope.showDetailes= function () {
        console.log('dey=tailes');
      }
    }],
    }
  });
