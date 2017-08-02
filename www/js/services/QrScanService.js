angular.module('starter')

.service('QrScanService', function ($cordovaBarcodeScanner) {
  return{
    scanQrCode: scanQrCode
  };

 function scanQrCode() {
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        console.log(barcodeData);
      }, function(error) {
        console.log(error);
      });
  }
});
