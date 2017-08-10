angular.module('starter')

.service('SelectionService', function ($http, $state) {
  return{
    select: select
  };

  function select() {
    $state.go('app.search-order');
  }

});
