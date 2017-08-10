angular.module('starter')

.service("SignatureService", function ($http, $state) {
  return{
    saveSignature: saveSignature
  };

  function saveSignature(signature, id, name) {
    var blob = dataURItoBlob(signature);
    var data = new FormData();
    data.append('file', blob);

    var config = {
      headers: {
        'Content-Type': undefined
      }
    };

    var url = "/file/signature/" + id + "?" + "name=" + name;
    console.log(url);
    $http.post(url, data, config)
      .success(function (data) {
        console.log(data);
        $state.go('app.order');
      })
      .error(function (data, status) {
        console.log(data, status);
      });
  }

  function dataURItoBlob(dataURI) {
    'use strict';
    var byteString, mimeString;

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = decodeURI(dataURI.split(',')[1])
    }

    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var content = [];
    for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimeString});
  }

});
