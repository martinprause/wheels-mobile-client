angular.module('starter')

.service('SelectionService', function ($http, $state) {
  return{
    select: select
  };

  function select() {
    $http.get('http://192.168.88.97:8080/order/2')
      .then(function(result) {
        console.log(result.data);
        $state.go('further-contacts', {order:result.data});
      });
  }

});
