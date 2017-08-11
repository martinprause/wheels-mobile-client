angular.module('starter')
  .controller('SearchOrderCtrl', function ($scope, $filter, $state, $http, ionicDatePicker) {
    $scope.selectedFilter = {type: 'created'};
    $scope.filterTypes = ['created', 'deadlineFinish', 'deadlineDelivery'];
    $scope.moreData = true;
    $scope.pageNumber = 0;
    $scope.ALL_ORDERS_LIST = [];

    $scope.searchOrder = searchOrder;
    $scope.openDatePicker = openDatePicker;
    $scope.resetFilters = resetFilters;
    $scope.loadMoreOrders = loadMoreOrders;
    $scope.openOrderMenu = openOrderMenu;

    function searchOrder(handler) {
      $http.get('/order/page/' + ($scope.pageNumber++))
        .then(function (result) {
          if (result.data === null || result.data.length === 0) {
            $scope.moreData = false;
            return;
          }
          $scope.ALL_ORDERS_LIST = $scope.ALL_ORDERS_LIST.concat(result.data);
          debugger;
          $scope.searchResult = $scope.ALL_ORDERS_LIST.map(function (order) {
            return formatOrder(order)
          });
          if (handler) {
            handler();
          }
        });
      console.log('Inited!');
    }

    function loadMoreOrders() {
      console.log("INFINITE_FIRED");
      searchOrder(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      );
    }

    function openDatePicker() {
      ionicDatePicker.openDatePicker({
        callback: function (val) {
          $scope.searchResult = $filter('filter')($scope.ALL_ORDERS_LIST.map(function (order) {
            return formatOrder(order)
          }), filterObjectBySelectedField(val));
        },
        disabledDates: [],
        templateType: 'popup'
      });

      function filterObjectBySelectedField(val) {
        var formattedValue = moment(val).format('DD-MM-YYYY');
        if ($scope.selectedFilter.type === 'created') {
          return {'created': formattedValue}
        } else if ($scope.selectedFilter.type === 'deadlineFinish') {
          return {'deadlineFinish': formattedValue}
        } else if ($scope.selectedFilter.type === 'deadlineDelivery') {
          return {'deadlineDelivery': formattedValue};
        }
      }
    }

    function resetFilters() {
      $scope.search = {};
      $scope.searchResult = $scope.ALL_ORDERS_LIST.map(function (order) { return formatOrder(order) });
      $scope.selectedFilter.type = 'created';
    }

    function openOrderMenu(order) {
      $state.go('app.order', {order: order});
    }

    function formatOrder(order) {
      return {
        orderNo: order.orderNo,
        status: order.status,
        customer: {
          firstname: (notNullValue(order.customer)).firstname,
          lastname:  (notNullValue(order.customer)).lastname,
          companyName:  (notNullValue(order.customer)).companyName
        },
        driver: {
          firstname: (notNullValue(order.driver)).firstname,
          lastname:  (notNullValue(order.driver)).lastname
        },
        created: order.created,
        deadlineFinish: order.deadlineFinish,
        deadlineDelivery: order.deadlineDelivery
      };
      function notNullValue(val) {
        return val && val !== null ? val : {};
      }
    }
  });
