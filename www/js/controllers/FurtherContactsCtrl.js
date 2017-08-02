angular.module('starter')

  .controller('FurtherContactsCtrl', function($scope, $stateParams){
    $scope.order = $stateParams.order;
    // {
    //   "id": 2,
    //   "orderNo": "20170728164103",
    //   "created": "28-07-2017 13:41:03",
    //   "lastUpdated": "01-08-2017 11:32:36",
    //   "status": "CREATED",
    //   "customer": {
    //     "id": 1,
    //     "customerNo": "",
    //     "firstname": "gjgbjvvgj",
    //     "lastname": "gjvvgjvgj",
    //     "companyName": "",
    //     "address1": "",
    //     "address2": "",
    //     "zipCode": "",
    //     "city": "",
    //     "country": null,
    //     "email": "",
    //     "phone": "",
    //     "mobile": "",
    //     "comment": null,
    //     "customerContacts": [
    //       {
    //         "id": 3,
    //         "customerNo": null,
    //         "firstname": "Firstname 1",
    //         "lastname": "Lastname 1",
    //         "companyName": null,
    //         "address1": "Address 1 1",
    //         "address2": "Address 2 1",
    //         "zipCode": "234234",
    //         "city": "City 1",
    //         "country": null,
    //         "email": "email 1",
    //         "phone": "546456",
    //         "mobile": "123123"
    //       },
    //       {
    //         "id": 4,
    //         "customerNo": null,
    //         "firstname": "Firstname 2",
    //         "lastname": "Lastname 2",
    //         "companyName": null,
    //         "address1": "Address 1 2",
    //         "address2": "Address 2 2",
    //         "zipCode": "243243",
    //         "city": "City 2",
    //         "country": null,
    //         "email": "email 2",
    //         "phone": "456456",
    //         "mobile": "123123"
    //       },
    //       {
    //         "id": 5,
    //         "customerNo": null,
    //         "firstname": "Firstname 3",
    //         "lastname": "Lastname 3",
    //         "companyName": null,
    //         "address1": "Address 1 3",
    //         "address2": "2",
    //         "zipCode": "345345",
    //         "city": "City 3",
    //         "country": null,
    //         "email": "email 3",
    //         "phone": "678678",
    //         "mobile": "343343"
    //       }
    //     ],
    //     "fullName": "gjgbjvvgj gjvvgjvgj"
    //   },
    //   "customerNumberOrder": "",
    //   "deadlineFinish": null,
    //   "deadlineDelivery": null,
    //   "comment": null,
    //   "driver": null,
    //   "wheelsRimPicture": null,
    //   "signaturePicture": null,
    //   "qrCode": "20170728164103-P",
    //   "wheelRimPositions": [
    //     {
    //       "id": 17,
    //       "positionNo": "2",
    //       "manufacturerWheel": {
    //         "id": 1,
    //         "description": "Manufacturer"
    //       },
    //       "model": {
    //         "id": 1,
    //         "description": "Model S"
    //       },
    //       "modelType": {
    //         "id": 1,
    //         "description": "Model Type X"
    //       },
    //       "size": 132213,
    //       "hubCover": false,
    //       "valveType": {
    //         "id": 1,
    //         "description": "Valve Type 3"
    //       },
    //       "manufacturerRim": {
    //         "id": 1,
    //         "description": "Manufacturer"
    //       },
    //       "status": null,
    //       "width": 321321,
    //       "height": 321321,
    //       "diameter": 312321,
    //       "indexVal": 321132,
    //       "speed": "321123",
    //       "qrCode": null
    //     },
    //     {
    //       "id": 15,
    //       "positionNo": "3",
    //       "manufacturerWheel": {
    //         "id": 1,
    //         "description": "Manufacturer"
    //       },
    //       "model": {
    //         "id": 1,
    //         "description": "Model S"
    //       },
    //       "modelType": {
    //         "id": 1,
    //         "description": "Model Type X"
    //       },
    //       "size": 21312,
    //       "hubCover": false,
    //       "valveType": {
    //         "id": 1,
    //         "description": "Valve Type 3"
    //       },
    //       "manufacturerRim": {
    //         "id": 1,
    //         "description": "Manufacturer"
    //       },
    //       "status": null,
    //       "width": 312132,
    //       "height": 132312,
    //       "diameter": 312132,
    //       "indexVal": 321132,
    //       "speed": "432432",
    //       "qrCode": null
    //     }
    //   ]
    // };
    $scope.getCurrentOrder = function () {
      return this.order;
    };
    $scope.getFurtherContacts = function () {
      return this.order.customer.customerContacts
    }

  });
