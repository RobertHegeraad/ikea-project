angular.module('controllers', [])

.controller('startCtrl', function($scope, $BLE) {


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
    $BLE.StopScan(function(o) {
      console.log('Scan stopped successful');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Scan stopped failed');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    });

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

  $scope.Discover = function(addressObj) {
    $BLE.Discover(function(o) {
      console.log('Discover successful');
      $scope.status(o.message);

      console.log(JSON.stringify(o));

      var html = '';
      for(item in o) {
        html += '<li>Name: ' + item.name + '</li>';
      }
      
      document.getElementById('list').innerHTML = html;
    }, function(o) {
      console.log('Discover failed');
      $scope.status(o.message);

      console.log(JSON.stringify(o));
    }, addressObj);
  },

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

  $scope.Disconnect = function(addressObj) {
    $BLE.Disconnect(function(o) {
      console.log('Disconnect successful');
      $scope.status(o.message);
      
      console.log(JSON.stringify(o));
    }, function(o) {
      console.log('Disconnect failed');
      $scope.status(o.message);
      
      console.log(JSON.stringify(o));
    }, addressObj);
  }

.controller('authCtrl', function($scope) {

  $scope.Login = function() {
    console.log('login');
  }

  $scope.Logout = function() {
    console.log('logout');
  }
});