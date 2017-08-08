angular.module('starter')

  .service('AssignDriverService', function ($rootScope, $q, $http) {
    this.userRole = $rootScope.USER_ROLE;
    this.order = {};
    this.drivers = [];
    this.assignDriver = assignDriver;
    this.loadAllDrivers = loadAllDrivers;
    this.getAllDrivers = getAllDrivers;

    var self = this;

    function assignDriver(driver) {
      self.order.driver = driver;
      $http.post('/order/assign-driver/' + self.order.id + '?driverId=' + driver.id)
        .then(function (result) {
          self.order = result.data;
          console.log(self.order);
        });
    }

    function getAllDrivers() {
      return self.drivers;
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
