angular.module('starter')

  .controller('AssignDriverCtrl', function ($scope, AssignDriverService) {

    this.userRole = AssignDriverService.userRole;
    this.order = AssignDriverService.order;
    this.getAllDrivers = getAllDrivers;
    this.assignDriver = assignDriver;
    var self = this;

    function getAllDrivers() {
      return AssignDriverService.getAllDrivers();
    }

    function assignDriver() {
      if (self.order.driver) {
        AssignDriverService.assignDriver(self.order.driver)
      } else {
        //TODO show popup
      }

    }
  });
