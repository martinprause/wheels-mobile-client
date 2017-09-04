angular.module('starter')

  .controller('StatusUpdateCtrl', function($scope, $http, $ionicPopup, $stateParams, StatusUpdateService, orderData, $translate, $ionicModal){
    $scope.order = orderData.data;
    $scope.currentPosition = null;
    $scope.currentPositionIndex = 0;

    if ($scope.order.wheelRimPositions.length !== 0){
      $scope.currentPosition = $scope.order.wheelRimPositions[0];
    }
    $ionicModal.fromTemplateUrl('templates/status_update.modal.html', function(modal) {
      $scope.checkModel = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
    $scope.closeSelect = function () {
      $scope.checkModel.hide();
    };
    $scope.openSelect = function (index) {
      $scope.currentPositionIndex = index;
      $scope.currentPosition = $scope.order.wheelRimPositions[index];
      $scope.checkModel.show();
    };
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
                      $scope.order = result.data;
                      $scope.currentPosition.status = value;
                      $scope.closeSelect();
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
