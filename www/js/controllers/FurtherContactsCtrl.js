angular.module('starter')

  .controller('FurtherContactsCtrl', function ($scope, $stateParams) {
    $scope.order = $stateParams.order;
    $scope.getCurrentOrder = function () {
      return this.order;
    };
    $scope.getFurtherContacts = function () {
      return this.order.customer.customerContacts
    }

  });
