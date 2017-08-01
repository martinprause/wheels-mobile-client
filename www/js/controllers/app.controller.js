/**
 * Created by palag on 01.08.2017.
 */
angular.module('starter')

  .controller('AppController', AppController);

AppController.$inject = [
  '$scope', '$rootScope'
];

function AppController($scope,  $rootScope) {
  $scope.showHeader = true;

  $rootScope.$on('$stateChangeStart', onStateChanged);

  function onStateChanged(event, toState, toParams, fromState, fromParams) {
    console.log(event, toState, toParams, fromState, fromParams);
    $scope.showHeader = toState.showHeader;
  }
}
