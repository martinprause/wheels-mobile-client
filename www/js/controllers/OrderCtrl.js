angular.module('starter')

.controller('OrderCtrl', function ($scope, $stateParams, $state, OrderService) {

  $scope.order = $stateParams.order;

  $scope.navigateToUpdateStatus = function () {
    $state.go('status-update', {order: $scope.order});
  };

  $scope.navigateToAssignDriver = function () {
    $state.go('assign-driver', {order: $scope.order});
  }

});
