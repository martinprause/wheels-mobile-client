angular.module('starter')

  .service('StatusUpdateService', function ($http, $stateParams) {
    this.order = $stateParams.order;
    this.updateStatus = updateStatus;

    function updateStatus(value, position) {
      return $http.post('/wheelRimPosition/status/' + position.id + '?status=' + value);
    }
  });
