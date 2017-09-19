angular.module('starter')

  .controller('AssignDriverCtrl', function ($scope, $window, $ionicPopup, AssignDriverService, orderData, AuthService) {

    $scope.currentUser = AuthService.getCurrentUser();
    $scope.order = orderData.data;
    $scope.getAllDrivers = getAllDrivers;
    $scope.assignDriver = assignDriver;
    $scope.assignMe = assignMe;
    $scope.assignMe1 = assignMe1;

    function getAllDrivers() {
      return AssignDriverService.getAllDrivers();
    }
    function assignMe1() {
      $scope.currentUser = JSON.parse($window.localStorage.currentUser);

      return AssignDriverService.getAllDrivers();
    }

    function assignMe(){
      $ionicPopup.confirm({
        title: 'Update status',
        template: 'Do you want to assign you as a driver to order?'
      }).then(function (result) {
        if (result) {
          AssignDriverService.assignDriver($scope.currentUser.id, $scope.order.id).then(function (result) {
            $scope.order = result.data;
            $scope.order = result.data;
          })
        }
      });
    }

    function assignDriver() {
      $ionicPopup.confirm({
        title: 'Update status',
        template: 'Do you want to assign this driver to order?'
      }).then(function (result) {
        if (result){
          if ($scope.order.driver) {
            AssignDriverService.assignDriver($scope.order.driver.id, $scope.order.id)
              .then(function (result) {
                $scope.order = result.data;
              })
          }
        }
      });

    }
  });
