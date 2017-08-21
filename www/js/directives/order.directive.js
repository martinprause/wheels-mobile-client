angular.module('starter')
  .directive('order', function(utility) {

    return {
      restrict: 'E',
      templateUrl: 'templates/directives/order.template.html',
      scope: {
        'orderData': '=',
        'detailes': '@?'
      },
      controller: ['$scope', '$ionicModal', function ($scope, $ionicModal) {
        if($scope.detailes){
          $ionicModal.fromTemplateUrl('templates/order-modal.html', function(modal) {
            $scope.ordeModel = modal;
          }, {
            scope: $scope,
            animation: 'scale-in'
          });
        }

        $scope.showDetailes= function () {
          $scope.ordeModel.show();
        };
        $scope.closeOrder = function () {
          $scope.ordeModel.hide();
        };
        $scope.translateDefaultValue = utility.translate;
      }]
    }
  });
