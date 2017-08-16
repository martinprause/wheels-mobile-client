angular.module('starter')

.service('OrderService', function ($http) {
  return {
    getOrderById: function (orderId) {
    return  $http.get('/order/' + orderId)
      .then(function (order) {
        console.log('order', order);
        return order.data;
      })
    }
  }
});
