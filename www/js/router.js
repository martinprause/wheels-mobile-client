angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      authenticate: false
    })
    .state('app.selection', {
      url: '/selection',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/selection.html'
        }
      },
      authenticate: true
    })
    .state('app.search-order', {
      url: '/search-order',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/search-order.html'
        }
      },
      authenticate: true
    })
    .state('app.order', {
      url:'/order/:orderId',
      cache: false,
      views: {
        'mainContent': {
          templateUrl: 'templates/order.html',
          controller: 'OrderCtrl'
        }
      },
      authenticate: true,
      resolve : {
        orderData:  function(OrderService, $stateParams){
          return OrderService.getOrderById($stateParams.orderId);
        }
      }
    })
    .state('app.order.order-details', {
      url:'/order-details',
      cash: false,
      views: {
        'mainContent@app': {
          templateUrl: 'templates/order-details.html',
          controller: 'OrderDetailsCtrl'
        }
      },
      authenticate: true,
      resolve: {
        orderData: function(OrderService, $stateParams){
          return OrderService.getOrderById($stateParams.orderId);
        }
      }
    })
    .state('app.order.status-update', {
      url: '/status-update',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/status_update.html',
          controller:  'StatusUpdateCtrl'
        }
      },
      authenticate: true,
      resolve : {
        orderData:  function(OrderService, $stateParams){
          return OrderService.getOrderById($stateParams.orderId);
        }
      }
    })
    .state('app.order.assign-driver', {
      url: '/assign-driver',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/assign_driver.html',
          controller: 'AssignDriverCtrl'
        }
      },
      authenticate: true,
      resolve: {
        drivers: function ($q, $stateParams, AssignDriverService) {
          var deferred = $q.defer();
          AssignDriverService.loadAllDrivers().then(deferred.resolve, deferred.resolve);
          AssignDriverService.order = $stateParams.order;
          return deferred.promise;
        },
        orderData:  function(OrderService, $stateParams){
          return OrderService.getOrderById($stateParams.orderId);
        }
      },
    })
    .state('app.order.confirm-delivery', {
      url:'/confirm-delivery',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/confirm-delivery.html',
          controller: "SignatureCtrl"
        }
      },
      authenticate: true,
      resolve : {
        orderData:  function(OrderService, $stateParams){
          return OrderService.getOrderById($stateParams.orderId);
        }
      }
    })

    .state('app.order.order-details.further-contacts', {
      url: '/further-contacts',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/further_contacts.html'
        }
      },
      controller: 'FurtherContactsCtrl',
      authenticate: false,
      params: {
        order: null
      }
    })

    .state('app.order.take-photo', {
      url: '/take-photo',
      views: {
        'mainContent@app': {
          templateUrl: 'templates/take_photo.html'
        }
      },
      controller: 'TakePhotoCtrl',
      authenticate: false,
      params: {
        orderId: null
      }
    });
  $urlRouterProvider.otherwise('/app/selection')
})
