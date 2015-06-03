angular.module('controllers', [])

.controller('startCtrl', function($scope, $compile, $BL) {

  $scope.interval = false;

  $scope.oldData = "";

  // Notification if an area is busy
  $scope.Notify = function() {
    // Check if a message was sent



    // Check nearby employees

    // Show message

    console.log("De slaapkamer afdeling kan wat hulp gebruiken");
  }

  // setInterval($scope.Notify, 2000);


  $scope.ReadEmployee = function() {
    $BL.Read(function(data) {
      console.log('Read success');
      console.log(JSON.stringify(data));


      if(data != "" && data != undefined && data != null && data != "emplyee_busy:false" && data != $scope.oldData) {
        // turn on
        console.log('turn on');

        $scope.ToggleStatus();
        $BL.Clear();
      } else {
        console.log('data undefined');
      }
    }, function(data) {
      console.log('Read fail');
      console.log(JSON.stringify(data));

      // turn off
    });

    // Clear the previous interval
    clearInterval($scope.interval);

    // if($BL.inConnected) {
      console.log('reading again');
      // Read again after 1 second
      $scope.interval = window.setInterval($scope.ReadEmployee, 2000);
    // }
  }

  $scope.PairEmployee = function() {
    // connect and subscribe to arduino

    // loop read
    console.log('Pair employee');
    $BL.Init(function(data) {

      console.log('employee init');
      if( ! $BL.IsConnected()) {
        console.log('employee not connected');

        $BL.Connect('', function(data) {
          console.log('employee connect');

          $scope.ReadEmployee();
          
        }, function(data) {
            console.log('empolyee connect fail');
          // connect error
        });
      } else {
        console.log('empolyee connected');

        $scope.ReadEmployee();
      }
    }, function(data) {
      // init fail
    });
  },

  $scope.ToggleStatus = function() {
    var $statusBtn = $('#status-btn');

    if($statusBtn.hasClass('status-ready')) {
      $statusBtn.removeClass('status-ready');
      $statusBtn.addClass('status-busy');
      $statusBtn.html('Je bent bezig');

      // var $el = $('<li><button class="btn connect-btn" data-ng-click="AddressClick($event)" data-address="test">Connect</button></li>').appendTo('#testc');
      // $compile($el)($scope);
    } else {
      $statusBtn.removeClass('status-busy');
      $statusBtn.addClass('status-ready');
      $statusBtn.html('Je bent beschikbaar');
    }
  },

  $scope.AddressClick = function($event) {
    var $target = $event.target;
    console.log($($target).data('address'));
    // var address = $target.data('address');
  }
})

.controller('productCtrl', function($scope) {

  $scope.color = function() {

    $('#color-picker').fadeToggle(200);
  },

  $scope.setColor = function(color, $event) {
    $('.color-picker-toggle').css('backgroundColor', color);
    $('#color-picker').fadeOut(200);
  },

  $scope.onToggle = function(value) {

    // <ion-toggle id="toggle" ng-model="toggle" id="toggle" toggle-class="toggle-calm" ng-change="onToggle(toggle)"></ion-toggle>

    console.log('lamp toggle');
    
    // if(value === true) {
    //   $('#toggle div span').html('Lamp staat aan');
    // } else {
    //   $('#toggle div span').html('Lamp staat uit');
    // }

    var $lampBtn = $('#lamp-btn');

    if($lampBtn.data('toggle') == true) {
      $lampBtn.data('toggle', false);
      $lampBtn.addClass('lamp-btn-off').removeClass('lamp-btn-on').html('Uit');
      console.log('turn off');
    } else {
      $lampBtn.data('toggle', true);
      $lampBtn.addClass('lamp-btn-on').removeClass('lamp-btn-off').html('Aan');
      console.log('turn on');
    }
  }
})

.controller('debugCtrl', function($scope, $BLE, $compile, $BL) {

  // LIFECYCLE
  // ---------
  // initialize
  // scan (if device address is unknown)
  // connect
  // discover (Android) OR services/characteristics/descriptors (iOS)
  // read/subscribe/write characteristics/descriptors
  // disconnect
  // close

  $scope.address = '6C:71:D9:9D:64:EE';

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

      document.getElementById('list').innerHTML = '';

      console.log('Scan started successful');
      $scope.status(o.message);

      console.log(JSON.stringify(o));

      var html = '';
        html += '<li>';
        html += '<b>Status</b> ' + o[i].status;
        html += ' <b>Address</b> ' + o[i].address;
        html += ' <b>RSSI</b> ' + o[i].rssi;
        html += ' <button class="connect-btn" ng-touch="AddressClick(' + o[i].address + ')" data-address="' + o[i].address + '">Connect</button>';
        html += '</li>';
      
      document.getElementById('list').innerHTML = html;

    }, function(o) {
      console.log('Scan started failed');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    });

    var timer = setTimeout(function() {
        $scope.StopScan();
    }, 2000);
  },

  /*
   * Stop scanning
   */
  $scope.StopScan = function() {
    $BLE.StopScan(function(o) {
      console.log('Scan stopped');
    }, function(o) {
      console.log('Scan failed to stop');
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

  
    [
      {
        "name": "Polar H7 3B321015",
        "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
      }
    ]
   
  $scope.RetrieveConnected = function() {
    $BLE.RetrieveConnected(function(o) {
      console.log('Retrieve connected successful');
      $scope.status(o.message);

      $('#connected-list').html('');

      for(var i=0; i<o.length; i++) {
        $el = $('<li>' + o[i].name + ' ' + o[i].address + ' <button class="btn connect-btn" data-ng-click="AddressClick($event)" data-address="' + o[i].address + '">Select</button></li>').appendTo('#connected-list');
        $compile($el)($scope);
      }

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

   // timeout toevoegen
  $scope.Connect = function() {
    var timeout = 5000;

    $BLE.Connect(function(o) {
      console.log('Connect successful');
      
      console.log(JSON.stringify(o));

      return o;
    }, function(o) {
      console.log('Connect failed');
      
      console.log(JSON.stringify(o));

      return o;
    }, $scope.address);

    var timer = setTimeout(function() {
      return false;
    }, timeout);
  },

  $scope.Disconnect = function() {
    $BLE.Disconnect(function(o) {
      console.log('Disconnect successful');
      
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Disconnect failed');
      
      console.log(JSON.stringify(o));
    }, $scope.address);
  },

  $scope.Reconnect = function() {
    $BLE.Reconnect(function(o) {
      console.log('Reconnect successful');
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Reconnect failed');

      console.log(JSON.stringify(o));
    }, $scope.address);
  },

  $scope.IsConnected = function(addressObj) {
    console.log(JSON.stringify($BLE.IsConnected(addressObj)));
  },

  $scope.Close = function() {
    $BLE.Close(function(o) {
      console.log('Close successful');
      
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Close failed');
      
      console.log(JSON.stringify(o));
    }, $scope.address);
  },



  /*
   * When the connect button is pressed for an address
   */
  $scope.AddressClick = function($event) {
    var address = $($event.target).data('address');

    $scope.address = address;
  },



  $scope.InitBL = function() {
    $BL.Init(function(data) {

    }, function(data) {

    });
  },

  /*
   * Connect, voor button pair medewerker
   */
  $scope.ConnectBL = function() {
    $BL.Connect('', function(data) {

    }, function(data) {

    });
  },

  $scope.WriteBL = function() {
    $BL.Write('', function(data) {

    }, function(data) {

    });
  },

  $scope.ReadBL = function() {
    $BL.Read(function(data) {
      // update status van medewerker
    }, function(data) {
      // set status op beschikbaar
    });
  },

  $scope.ListBL = function() {
    $BL.List(function(data) {

    }, function(data) {

    });
  },

  $scope.SubscribeBL = function() {
    console.log('Subscribing...')
    $BL.Subscribe(function(data) {

    }, function(data) {

    });
  },

  $scope.DiscoverUnpairedBL = function() {
    $BL.DiscoverUnpaired(function(data) {

    }, function(data) {

    });
  }
});