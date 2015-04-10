angular.module('controllers', [])

.controller('debugCtrl', function($scope, $BLE) {

  // LIFECYCLE
  // ---------
  // initialize
  // scan (if device address is unknown)
  // connect
  // discover (Android) OR services/characteristics/descriptors (iOS)
  // read/subscribe/write characteristics/descriptors
  // disconnect
  // close

  $scope.status = function(message) {
      document.getElementById('status').innerHTML = message;
  }

  $scope.Init = function() {
    $BLE.Init(function(o) {
      console.log('Properly connected to BLE chip');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Failed to connect to BLE chip');
      console.log(JSON.stringify(o));
    });
  },

  $scope.Scan = function() {
    // $BLE.StopScan(function(o) {
    //   console.log('Scan stopped successful');
    //   $scope.status(o.message);

    //   console.log(JSON.stringify(o));
    // }, function(o) {
    //   console.log('Scan stopped failed');
    //   $scope.status(o.message);

    //   console.log(JSON.stringify(o));
    // });

    /*
      {
        "status": "scanStarted"
      }

      {
        "status": "scanResult",
        "advertisement": "awArG05L",
        "rssi": -58,
        "name": "Polar H7 3B321015",
        "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
      }
    */
    $BLE.StartScan(function(o) {
      console.log('Scan started successful');
      $scope.status(o.message);

      console.log(JSON.stringify(o));

      var html = '';
      for(item in o) {
        html += '<li>Name: ' + item + '</li>';
      }
      
      document.getElementById('list').innerHTML = html;

    }, function(o) {
      console.log('Scan started failed');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    });
  },

  /*
     {
      "address": "00:22:D0:3B:32:10",
      "status": "discovered",
      "services": [
        {
          "characteristics": [
            {
              "descriptors": [

              ],
              "characteristicUuid": "2a00",
              "properties": {
                "write": true,
                "writeWithoutResponse": true,
                "read": true
              }
            },
          ]
        }
      ]
    }
  */
  $scope.Discover = function(addressObj) {
    $BLE.Discover(function(o) {
      console.log('Discover successful');

      console.log(JSON.stringify(o));

      var html = '';
      for(item in o) {
        html += '<li>Name: ' + item.name + '</li>';
      }
      
      document.getElementById('list').innerHTML = html;
    }, function(o) {
      console.log('Discover failed');

      console.log(JSON.stringify(o));
    }, addressObj);
  },

  /*
    [
      {
        "name": "Polar H7 3B321015",
        "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
      }
    ]
   */
  $scope.RetrieveConnected = function() {
    $BLE.RetrieveConnected(function(o) {
      console.log('Retrieve connected successful');
      $scope.status(o.message);

      var html = '';
      for(item in o) {
        html += '<li>Name: ' + item + '</li>';
      }
      
      document.getElementById('list').innerHTML = html;

      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Retrieve connected failed');
      $scope.status(o.message);
      
      console.log(JSON.stringify(o));
    });
  },

  /*
    {
      "name": "Polar H7 3B321015",
      "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63",
      "status": "connecting" / "connected" / "diconnected"
    }
   */
  $scope.Connect = function(addressObj) {
    $BLE.Connect(function(o) {
      console.log('Connect successful');
      
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Connect failed');
      
      console.log(JSON.stringify(o));
    }, addressObj);
  },

  $scope.Disconnect = function(addressObj) {
    $BLE.Disconnect(function(o) {
      console.log('Disconnect successful');
      
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Disconnect failed');
      
      console.log(JSON.stringify(o));
    }, addressObj);
  },

  $scope.IsConnected = function(addressObj) {
    console.log(JSON.stringify($BLE.IsConnected(addressObj)));
  }
})

.controller('startCtrl', function($scope) {

  $scope.ToggleStatus = function() {
    var $statusBtn = $('#status-btn');

    if($statusBtn.hasClass('status-ready')) {
      $statusBtn.removeClass('status-ready');
      $statusBtn.addClass('status-busy');
      $statusBtn.html('Je bent bezig')
    } else {
      $statusBtn.removeClass('status-busy');
      $statusBtn.addClass('status-ready');
      $statusBtn.html('Je bent beschikbaar')
    }
  }
})

.controller('productCtrl', function($scope) {

  $scope.onToggle = function(value) {

    if(value === true) {
      $('#toggle div span').html('Lamp staat aan');
    } else {
      $('#toggle div span').html('Lamp staat uit');
    }
  }
});