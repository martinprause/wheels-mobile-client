angular.module('starter')

  .controller('StatusUpdateCtrl', function($scope, $http, $ionicPopup, $stateParams, StatusUpdateService, orderData){
    $scope.order = orderData.data;
    $scope.currentPosition = null;
    $scope.currentPositionIndex = 0;

      if ($scope.order.wheelRimPositions.length !== 0){
        $scope.currentPosition = $scope.order.wheelRimPositions[0];
      }

    $scope.updateStatus = function (value) {
      if ($scope.order.wheelRimPositions.length === 0){
        $ionicPopup.alert({
          title: 'Error',
          template: 'No wheel rims presented in order! '
        })
      }
      else{
        $ionicPopup.confirm({
          title: 'Update status',
          template: 'Do you want to update status of current wheel rim?'
        }).then(function (result) {
          if (result){
            StatusUpdateService.updateStatus(value, $scope.currentPosition).then(function (result) {
              $scope.order.wheelRimPositions[$scope.currentPositionIndex].status = result.data.status;
            });
          }
        });
      }
    };

    $scope.wheelHasChanged = function (index) {
      $scope.currentPosition = $scope.order.wheelRimPositions[index];
      $scope.currentPositionIndex = index;
    }
  });
