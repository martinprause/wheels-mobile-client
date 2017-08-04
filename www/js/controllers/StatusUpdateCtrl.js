angular.module('starter')

  .controller('StatusUpdateCtrl', function($scope, $http, $ionicPopup, $stateParams, StatusUpdateService){
    this.order = StatusUpdateService.order;
    var self = this;

    $scope.showPopup = function() {
      $scope.data = {};

      // Custom popup
      var myPopup = $ionicPopup.show({
        title: 'Title',
        subTitle: 'Subtitle',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

              if (!$scope.data.model) {
                //don't allow the user to close unless he enters model...
                e.preventDefault();
              } else {
                return $scope.data.model;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };

    $scope.updateStatus = function (value) {
      StatusUpdateService.updateStatus(value)
    };
  });
