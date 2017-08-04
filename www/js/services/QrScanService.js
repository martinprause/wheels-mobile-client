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
        $http.get('http://192.168.88.97:8080/order/orderNo/' + orderId)
          .then(function (response) {
            console.log(response.data);
            $state.go('order', {order: response.data});
          })
      }, function(error) {
        console.log(error);
      });
  }

});
