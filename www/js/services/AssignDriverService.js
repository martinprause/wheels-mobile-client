angular.module('starter')

  .service('AssignDriverService', function ($window, $q, $http) {
    this.order = {};
    this.drivers = [];
    this.assignDriver = assignDriver;
    this.loadAllDrivers = loadAllDrivers;
    this.getAllDrivers = getAllDrivers;
    this.getCurrentDriver = getCurrentDriver;

    var self = this;

    function assignDriver(driverId, orderId) {
      return $http.post('/order/assign-driver/' + orderId + '?driverId=' + driverId);
    }

    function getAllDrivers() {
      return self.drivers;
    }

    function getCurrentDriver(){
      return $http.get('/user/' + $window.localStorage.getItem('currentUser'));
    }

    function loadAllDrivers() {
      var deferred = $q.defer();
      $http.get('/user/drivers')
        .then(
          function (result) {
            self.drivers = result.data;
            deferred.resolve(result)
          }
        );
      return deferred.promise;
    }
  });
