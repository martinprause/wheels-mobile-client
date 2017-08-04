angular.module('starter')
  .directive('order', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/directives/order.template.html',
      scope: {
        'orderData': '='
      }
    }
  });
