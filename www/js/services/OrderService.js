angular.module('starter')

  .service('OrderService', function ($http) {
    return {
      getOrderById: function (orderId) {
        console.log('getOrderById');
        return $http.get('/order/' + orderId);
      }
    }
  });
