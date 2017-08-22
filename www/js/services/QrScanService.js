angular.module('starter')

.service('QrScanService', function ($cordovaBarcodeScanner, $state, $http, $ionicPopup) {
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
            if (response.data !== ""){
              $state.go('app.order', {orderId: response.data.id});
            }
            else {
              $ionicPopup.alert({
                title: 'Invalid qr-code',
                template: 'No order found with qr-code'
              })
            }
          })
      }, function(error) {
        console.log(error);
      });
  }
});
