angular.module('starter')

.controller('OrderCtrl', function ($scope, $stateParams, $state, OrderService) {

  $scope.order = $stateParams.order;

  $scope.navigateToUpdateStatus = function () {
    $state.go('.status-update', {order: $scope.order});
  };

  $scope.navigateToAssignDriver = function () {
    $state.go('.assign-driver', {order: $scope.order});
  };

  $scope.navigateToConfirmDelivery = function () {
    $state.go('.confirm-delivery', {order: $scope.order});
  };

  $scope.navigateToOrderDetails = function () {
    $state.go('.order-details', {order: $scope.order});
  };

  $scope.navigateToTakePhoto = function () {
    $state.go('.take-photo', {order: $scope.order});
  };

  $scope.navigatoToPrintBarcodes = function () {
    // TODO implement bar codes printing(connect with mobile app);
  };

});
