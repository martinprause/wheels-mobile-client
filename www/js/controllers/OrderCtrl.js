angular.module('starter')

.controller('OrderCtrl', function ($scope, $stateParams, $state, $ionicPopup, $http, OrderService, $translate) {
  // $scope.order = orderData.data;
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    // handle event
    return OrderService.getOrderById(data.stateParams.orderId)
      .then(function (orderData) {
        $scope.order = orderData.data
      })
  });
  $scope.navigateToOrderDetails = function () {
    $state.go('.order-details', {order: $scope.order.id});
  };

  $scope.navigateToGuidelines = function () {
    $state.go('.guidelines', {order: $scope.order.id});
  };

  $scope.navigateToUpdateStatus = function () {
    $state.go('.status-update', {order: $scope.order.id});
  };

  $scope.navigateToAssignDriver = function () {
    $state.go('.assign-driver', {order: $scope.order.id});
  };

  $scope.navigateToTakePhoto = function () {
    $state.go('.take-photo', {order: $scope.order.id});
  };

  $scope.navigateToConfirmDelivery = function () {
    $state.go('.confirm-delivery', {order: $scope.order.id});
  };

  $scope.printQrCodes = function () {

    $http.post('/print-job?orderId=' + $scope.order.id + '&userId=' + 0)
      .then(function (result) {
        var title = '';
        var template = '';
        $translate('PRINTER.POPUP_TITLE')
          .then(function (translation) {
            title = translation;
            $translate('PRINTER.SUCCESS_POPUP').then(function(translation){
              template = translation;
              $ionicPopup.alert({
                title: title,
                template: template
              });
            })
          })
        },
        function (error) {
          var title = '';
          var template = '';
          $translate('PRINTER.POPUP_TITLE')
            .then(function (translation) {
              title = translation;
              $translate('PRINTER.SUCCESS_POPUP').then(function(translation){
                template = translation;
                $ionicPopup.alert({
                  title: title,
                  template: template
                });
              })
            })

        }
      );
  };

});
