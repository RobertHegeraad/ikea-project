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

  // $urlRouterProvider.otherwise("/start");
  $urlRouterProvider.otherwise("/debug");
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
          }, function(data) {
            console.log('BL init failed');
            console.log(JSON.stringify(data));
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
          }, function(data) {
            console.log('BL connect failed');
            console.log(JSON.stringify(data));


            // Attempt to reconnect once
            bluetoothSerial.connect('00:6A:8E:16:C8:EB', function(data) {
              console.log('reconnect succcess');
              console.log(JSON.stringify(data));
            }, function(data) {
              console.log('reconnect failed');
              console.log(JSON.stringify(data));
            });
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
       }, function(data) {
        console.log('BL read failed');
        console.log(JSON.stringify(data));
       }); 
      },

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
