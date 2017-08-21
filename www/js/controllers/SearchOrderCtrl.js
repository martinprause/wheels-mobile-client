angular.module('starter')
  .controller('SearchOrderCtrl', function ($scope, $filter, $state, $http, ionicDatePicker, utility) {
    $scope.filterTypes = {type: ['created', 'deadlineFinish', 'deadlineDelivery']};
    $scope.selectedFilter = {type: $scope.filterTypes[0]};
    $scope.moreData = true;
    $scope.pageNumber = 0;
    $scope.ALL_ORDERS_LIST = [];
    $scope.showLoader = false;
    $scope.formattedValue = '';

    $scope.searchOrder = searchOrder;
    $scope.openDatePicker = openDatePicker;
    $scope.resetFilters = resetFilters;
    $scope.loadMoreOrders = loadMoreOrders;
    $scope.openOrderMenu = openOrderMenu;
    $scope.translateDefaultValue = utility.translate;

    function searchOrder(handler) {
      $scope.showLoader = true;
      $http.get('/order/page/' + ($scope.pageNumber++))
        .then(function (result) {
          if (result.data === null || result.data.length === 0) {
            $scope.moreData = false;
            return;
          }
          $scope.ALL_ORDERS_LIST = $scope.ALL_ORDERS_LIST.concat(result.data);
          $scope.searchResult = $scope.ALL_ORDERS_LIST.map(function (order) {
            return formatOrder(order)
          });
          if (handler) {
            handler();
          }
        })
        .finally(function () {
          $scope.showLoader = false;
        });
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
        $scope.formattedValue = moment(val).format('DD-MM-YYYY');
        console.log($scope.formattedValue);
        if ($scope.selectedFilter.type === 'created') {
          return {'created': $scope.formattedValue}
        } else if ($scope.selectedFilter.type === 'deadlineFinish') {
          return {'deadlineFinish': $scope.formattedValue}
        } else if ($scope.selectedFilter.type === 'deadlineDelivery') {
          return {'deadlineDelivery': $scope.formattedValue};
        }
      }
    }

    function resetFilters() {
      $scope.search = {};
      $scope.searchResult = $scope.ALL_ORDERS_LIST.map(function (order) { return formatOrder(order) });
      $scope.selectedFilter.type = 'created';
      $scope.formattedValue = '';
    }

    function openOrderMenu(order) {
      var foundOrder = $scope.ALL_ORDERS_LIST.filter(function (fromList) {
        return fromList.id === order.id;
      })[0];
      $state.go('app.order', {orderId: foundOrder.id});
    }

    function formatOrder(order) {
      return {
        id: order.id,
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
        customerNumberOrder: order.customerNumberOrder,
        created: order.created,
        deadlineFinish: order.deadlineFinish,
        deadlineDelivery: order.deadlineDelivery
      };
      function notNullValue(val) {
        return val && val !== null ? val : {};
      }
    }
  });
