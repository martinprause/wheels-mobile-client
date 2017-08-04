angular.module('starter')

  .service('StatusUpdateService', function ($http, $stateParams) {
    this.order = $stateParams.order;
    this.updateStatus = updateStatus;

    var self = this;

    function updateStatus(value) {
      self.order.status = value;
      $http.post('http://192.168.88.98:8080/order/update-status/' + self.order.id + '?status=' + self.order.status)
        .then(function (result) {
          console.log(result.data);
          // self.order = result.data;
        });
    }
  });
