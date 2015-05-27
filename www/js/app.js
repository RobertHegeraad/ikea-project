// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // $ionicConfigProvider.views.transition('ios');

  $stateProvider

  // .state('app', {
  //   url: "/app",
  //   abstract: true,
  //   templateUrl: "menu.html"
  // })

  .state('debug', {
    url: '/debug',
    views: {
      'MainContent': {
        templateUrl: 'debug.html'
      }
    }
  })

  .state('start', {
    url: '/start',
    views: {
      'MainContent': {
        templateUrl: 'start.html'
      }
    }
  })
  
  .state('products', {
    url: '/products',
    views: {
      'MainContent': {
        templateUrl: 'products.html'
      }
    }
  })

  .state('badkamer', {
    url: '/badkamer',
    views: {
      'MainContent': {
        templateUrl: 'badkamer.html'
      }
    }
  })

  .state('badkameracc', {
    url: '/badkameracc',
    views: {
      'MainContent': {
        templateUrl: 'badkameracc.html'
      }
    }
  })

  $urlRouterProvider.otherwise("/start");
  // $urlRouterProvider.otherwise("/debug");
})

/*
 * https://github.com/randdusing/BluetoothLE
 *
 * https://github.com/dobots/crownstone-app/blob/master/www/js/ble.js
 */
.factory('$BLE', function($rootScope) {
    return {
      Init: function(s, f) {
          console.log('BLE init');
          bluetoothle.initialize(s, f, {request:true});
      },

      StartScan: function(s, f) {
        console.log('BLE startscan');
        bluetoothle.startScan(s, f, []);
      },

      StopScan: function(s, f) {
        console.log('BLE stopscan');
        bluetoothle.stopScan(s, f);
      },

      RetrieveConnected: function(s, f) {
        console.log('BLE retrieveConnected');
        bluetoothle.retrieveConnected(s, f, {});
      },

      /*
       * Discover all the devices services, characteristics and descriptors.
       * Doesn't need to be called again after disconnecting and then reconnecting.
       * Android support only.
       */
      Discover: function(s, f, address) {
        console.log('BLE discover');

        bluetoothle.discover(s, f, {
          "address": address
        });
      },

      Connect: function(s, f, address) {
        // 6C:71:D9:9D:64:EE -> Robert PC
        bluetoothle.connect(s, f, {
          'address': address
        });
      },

      Disconnect: function(s, f, address) {
        console.log('BLE disconnect');

        bluetoothle.disconnect(s, f, {
          "address": address
        })
      },

      Reconnect: function(s, f, address) {
        console.log('BLE reconnect');

        bluetoothle.reconnect(s, f, {
          "address": address
        })
      },

      Close: function(s, f, address) {
        console.log('BLE close ' + address);

        bluetoothle.close(s, f, {
          "address": address
        })
      },

      /*
       * Check if a device is connected
       */
      IsConnected: function() {
        var connected;
        return bluetoothle.isConnected(connected, {
          "address": "6C:71:D9:9D:64:EE"
        });
        return connected;
      }
    };
})


/*
 * ID: 00:6A:8E:16:C8:EB
 * Class: 7936
 * Address: 6C:71:D9:9D:64:EE
 * Name: Naambordje
 */
.factory('$BL', function($rootScope) {
    return {
      Init: function(s, f) {
          console.log('BL init');
          bluetoothSerial.enable(function(data) {
            console.log('BL init success');
            console.log(JSON.stringify(data));

            s(data);
          }, function(data) {
            console.log('BL init failed');
            console.log(JSON.stringify(data));
            f(data);
          });
      },

      /*
       * connects to a Bluetooth device. The callback is long running.
       */
      Connect: function(mac, s, f) {
          console.log('BL connecting...');
          bluetoothSerial.connect('00:6A:8E:16:C8:EB', function(data) {
            console.log('BL connect success');
            console.log(JSON.stringify(data));

            s(data);
          }, function(data) {
            console.log('BL connect failed');
            console.log(JSON.stringify(data));

            f(data);

            // Attempt to reconnect once
            bluetoothSerial.connect('00:6A:8E:16:C8:EB', function(data) {
              console.log('reconnect succcess');
              console.log(JSON.stringify(data));

              s(data);
            }, function(data) {
              console.log('reconnect failed');
              console.log(JSON.stringify(data));

              f(data);
            });
          });
      },

      IsConnected: function() {
        console.log('check is connected');
        bluetoothSerial.isConnected(function() {
          return true;
        }, function() {
          return false;
        });


      },

      Write: function(data, s, f) {
        console.log('writing...');
        bluetoothSerial.write("hello", function(data) {
          console.log('BL write success');
          console.log(JSON.stringify(data));
        }, function(data) {
          console.log('BL write failed');
          console.log(JSON.stringify(data));
        });
      },

      Read: function(s, f) {
       bluetoothSerial.read(function(data) {
        console.log('BL read success');
        console.log(JSON.stringify(data));


          s(data);
       }, function(data) {
        console.log('BL read failed');
        console.log(JSON.stringify(data));

          f(data);
       }); 
      },

      EndlessRead: function(s, f) {
        Read(function(data) {
          s(data);
        }, function(data) {
          f(data);
        });

        window.setInterval(EndlessRead, 1000);
      }

      /*
       * Lists paired devices
       */
      List: function(s, f) {
        bluetoothSerial.list(function(data) {
          console.log('BL list success');
          console.log(JSON.stringify(data));
        }, function(data) {
          console.log('BL list failed');
          console.log(JSON.stringify(data));
        });
      },

      Subscribe: function() {
        bluetoothSerial.subscribe('\n', function (data) {
            console.log('BL subscribe success');
            console.log(JSON.stringify(data));
        }, function(data) {
            console.log('BL subscribe fail');
            console.log(JSON.stringify(data));
        });
      },

      DiscoverUnpaired: function() {
        bluetoothSerial.discoverUnpaired(function (data) {
            console.log('BL discover unpaired success');
            console.log(JSON.stringify(data));
        }, function(data) {
            console.log('BL discover unpaired fail');
            console.log(JSON.stringify(data));
        });
      }
    };
});


// .controller('debugCtrl', function($scope, $BLE, $compile, $BL) {

//   // LIFECYCLE
//   // ---------
//   // initialize
//   // scan (if device address is unknown)
//   // connect
//   // discover (Android) OR services/characteristics/descriptors (iOS)
//   // read/subscribe/write characteristics/descriptors
//   // disconnect
//   // close

//   $scope.address = '6C:71:D9:9D:64:EE';

//   $scope.status = function(message) {
//       document.getElementById('status').innerHTML = message;
//   }

//   $scope.Init = function() {
//     $BLE.Init(function(o) {
//       console.log('Properly connected to BLE chip');
//       $scope.status(o.message);

//       console.log(JSON.stringify(o));
//     }, function(o) {
//       console.log('Failed to connect to BLE chip');
//       console.log(JSON.stringify(o));
//     });
//   },

//   $scope.Scan = function() {
//     // $BLE.StopScan(function(o) {
//     //   console.log('Scan stopped successful');
//     //   $scope.status(o.message);

//     //   console.log(JSON.stringify(o));
//     // }, function(o) {
//     //   console.log('Scan stopped failed');
//     //   $scope.status(o.message);

//     //   console.log(JSON.stringify(o));
//     // });

//     /*
//       {
//         "status": "scanStarted"
//       }

//       {
//         "status": "scanResult",
//         "advertisement": "awArG05L",
//         "rssi": -58,
//         "name": "Polar H7 3B321015",
//         "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
//       }
//     */
//     $BLE.StartScan(function(o) {

//       document.getElementById('list').innerHTML = '';

//       console.log('Scan started successful');
//       $scope.status(o.message);

//       console.log(JSON.stringify(o));

//       var html = '';
//         html += '<li>';
//         html += '<b>Status</b> ' + o[i].status;
//         html += ' <b>Address</b> ' + o[i].address;
//         html += ' <b>RSSI</b> ' + o[i].rssi;
//         html += ' <button class="connect-btn" ng-touch="AddressClick(' + o[i].address + ')" data-address="' + o[i].address + '">Connect</button>';
//         html += '</li>';
      
//       document.getElementById('list').innerHTML = html;

//     }, function(o) {
//       console.log('Scan started failed');
//       $scope.status(o.message);

//       console.log(JSON.stringify(o));
//     });

//     var timer = setTimeout(function() {
//         $scope.StopScan();
//     }, 2000);
//   },

//   /*
//    * Stop scanning
//    */
//   $scope.StopScan = function() {
//     $BLE.StopScan(function(o) {
//       console.log('Scan stopped');
//     }, function(o) {
//       console.log('Scan failed to stop');
//     });
//   },

//   /*
//      {
//       "address": "00:22:D0:3B:32:10",
//       "status": "discovered",
//       "services": [
//         {
//           "characteristics": [
//             {
//               "descriptors": [

//               ],
//               "characteristicUuid": "2a00",
//               "properties": {
//                 "write": true,
//                 "writeWithoutResponse": true,
//                 "read": true
//               }
//             },
//           ]
//         }
//       ]
//     }
//   */
//   $scope.Discover = function(addressObj) {
//     $BLE.Discover(function(o) {
//       console.log('Discover successful');

//       console.log(JSON.stringify(o));

//       var html = '';
//       for(item in o) {
//         html += '<li>Name: ' + item.name + '</li>';
//       }
      
//       document.getElementById('list').innerHTML = html;
//     }, function(o) {
//       console.log('Discover failed');

//       console.log(JSON.stringify(o));
//     }, addressObj);
//   },

  
//     [
//       {
//         "name": "Polar H7 3B321015",
//         "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
//       }
//     ]
   
//   $scope.RetrieveConnected = function() {
//     $BLE.RetrieveConnected(function(o) {
//       console.log('Retrieve connected successful');
//       $scope.status(o.message);

//       $('#connected-list').html('');

//       for(var i=0; i<o.length; i++) {
//         $el = $('<li>' + o[i].name + ' ' + o[i].address + ' <button class="btn connect-btn" data-ng-click="AddressClick($event)" data-address="' + o[i].address + '">Select</button></li>').appendTo('#connected-list');
//         $compile($el)($scope);
//       }

//       console.log(JSON.stringify(o));
//     }, function(o) {
//       console.log('Retrieve connected failed');
//       $scope.status(o.message);
      
//       console.log(JSON.stringify(o));
//     });
//   },

//   /*
//     {
//       "name": "Polar H7 3B321015",
//       "address": "ECC037FD-72AE-AFC5-9213-CA785B3B5C63",
//       "status": "connecting" / "connected" / "diconnected"
//     }
//    */

//    // timeout toevoegen
//   $scope.Connect = function() {
//     var timeout = 5000;

//     $BLE.Connect(function(o) {
//       console.log('Connect successful');
      
//       console.log(JSON.stringify(o));

//       return o;
//     }, function(o) {
//       console.log('Connect failed');
      
//       console.log(JSON.stringify(o));

//       return o;
//     }, $scope.address);

//     var timer = setTimeout(function() {
//       return false;
//     }, timeout);
//   },

//   $scope.Disconnect = function() {
//     $BLE.Disconnect(function(o) {
//       console.log('Disconnect successful');
      
//       console.log(JSON.stringify(o));
//     }, function(o) {
//       console.log('Disconnect failed');
      
//       console.log(JSON.stringify(o));
//     }, $scope.address);
//   },

//   $scope.Reconnect = function() {
//     $BLE.Reconnect(function(o) {
//       console.log('Reconnect successful');
//       console.log(JSON.stringify(o));
//     }, function(o) {
//       console.log('Reconnect failed');

//       console.log(JSON.stringify(o));
//     }, $scope.address);
//   },

//   $scope.IsConnected = function(addressObj) {
//     console.log(JSON.stringify($BLE.IsConnected(addressObj)));
//   },

//   $scope.Close = function() {
//     $BLE.Close(function(o) {
//       console.log('Close successful');
      
//       console.log(JSON.stringify(o));
//     }, function(o) {
//       console.log('Close failed');
      
//       console.log(JSON.stringify(o));
//     }, $scope.address);
//   },



//   /*
//    * When the connect button is pressed for an address
//    */
//   $scope.AddressClick = function($event) {
//     var address = $($event.target).data('address');

//     $scope.address = address;
//   },



//   $scope.InitBL = function() {
//     $BL.Init(function(data) {

//     }, function(data) {

//     });
//   },

//   /*
//    * Connect, voor button pair medewerker
//    */
//   $scope.ConnectBL = function() {
//     $BL.Connect('', function(data) {

//     }, function(data) {

//     });
//   },

//   $scope.WriteBL = function() {
//     $BL.Write('', function(data) {

//     }, function(data) {

//     });
//   },

//   $scope.ReadBL = function() {
//     $BL.Read(function(data) {
//       // update status van medewerker
//     }, function(data) {
//       // set status op beschikbaar
//     });
//   },

//   $scope.ListBL = function() {
//     $BL.List(function(data) {

//     }, function(data) {

//     });
//   },

//   $scope.SubscribeBL = function() {
//     console.log('Subscribing...')
//     $BL.Subscribe(function(data) {

//     }, function(data) {

//     });
//   },

//   $scope.DiscoverUnpairedBL = function() {
//     $BL.DiscoverUnpaired(function(data) {

//     }, function(data) {

//     });
//   }
// })