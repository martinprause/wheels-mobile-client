angular.module('starter')

.service('QrScanService', function ($cordovaBarcodeScanner, $state, $http) {
  return{
    scanQrCode: scanQrCode
  };

 function scanQrCode() {
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        var orderId = barcodeData.text.substring(0, barcodeData.text.length-2);
        console.log(orderId);
        $http.get('/order/orderNo/' + orderId)
          .then(function (response) {
            console.log(response.data);
            $state.go('app.order', {orderId: response.data.id});
          })
      }, function(error) {
        console.log(error);
      });
  }

  // function scanQrCode() {
  //   var orderId = 20170718133300;
  //   $http.get('/order/orderNo/' + orderId)
  //     .then(function (response) {
  //       console.log(response.data);
  //       $state.go('app.order', {order: response.data});
  //     })
  // }

});
