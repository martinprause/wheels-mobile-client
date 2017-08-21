angular.module('starter')

  .controller('StatusUpdateCtrl', function($scope, $http, $ionicPopup, $stateParams, StatusUpdateService, orderData, $translate){
    $scope.order = orderData.data;
    $scope.currentPosition = null;
    $scope.currentPositionIndex = 0;

      if ($scope.order.wheelRimPositions.length !== 0){
        $scope.currentPosition = $scope.order.wheelRimPositions[0];
      }

    $scope.updateStatus = function (value) {
      var title = '';
      var template = '';
      if ($scope.order.wheelRimPositions.length === 0) {
        $translate('STATUS_UPDATE.POPUP_TITLE_ERROR')
          .then(function (translation) {
            title = translation;
            $translate('STATUS_UPDATE.POPUP_BODY_ERROR').then(function (translation) {
              template = translation;
              $ionicPopup.alert({
                title: title,
                template: template
              });
            })
          })
      }
      else {
        $translate('STATUS_UPDATE.POPUP_TITLE_SUCCESS')
          .then(function (translation) {
            title = translation;
            $translate('STATUS_UPDATE.POPUP_BODY_SUCCESS').then(function (translation) {
              template = translation;
              $ionicPopup.confirm({
                title: title,
                template: template
              }).then(function (result) {
                if (result) {
                  StatusUpdateService.updateStatus(value, $scope.currentPosition).then(function (result) {
                    $scope.order.wheelRimPositions[$scope.currentPositionIndex].status = result.data.status;
                  });
                }
              });
            })
          })
      }
    };

    $scope.wheelHasChanged = function (index) {
      $scope.currentPosition = $scope.order.wheelRimPositions[index];
      $scope.currentPositionIndex = index;
    }
  });
