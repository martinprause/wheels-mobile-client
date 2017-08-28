angular.module('starter')

.controller('OrderGuidelinesCtrl', function ($scope, orderData) {
  $scope.order = orderData.data;
  console.log($scope.order);
});
