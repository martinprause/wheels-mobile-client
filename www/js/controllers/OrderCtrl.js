angular.module('starter')

.controller('OrderCtrl', function ($scope, $stateParams, $state, $ionicPopup, $http, orderData) {
  console.log('sadsdfsadf');
  console.log('sdasd',orderData);

  $scope.order =orderData;

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

  $scope.printQrCodes = function () {

    $http.post('/print-job?orderId=' + $scope.order.id + '&userId=' + 0)
      .then(function (result) {
          console.log(result);
          $ionicPopup.alert({
            title: 'Print',
            template: 'Order has been sent to the printer'
          });
        },
        function (error) {
          $ionicPopup.alert({
            title: 'Print',
            template: 'Order has not been sent to the printer'
          });
        }
      );
  };

});
