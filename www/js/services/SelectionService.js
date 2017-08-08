angular.module('starter')

.service('SelectionService', function ($http, $state) {
  return{
    select: select
  };

  function select() {
    $http.get('/order/2')
      .then(function(result) {
        console.log(result.data);
        $state.go('further-contacts', {order:result.data});
      })
      .catch(function (error) {
        console.log(error);
        console.log($http);
      })
  }

});
