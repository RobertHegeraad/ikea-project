angular.module('controllers', [])

.controller('startCtrl', function($scope, $compile, $BL) {

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

          $BL.EndlessRead();

          $BL.Read(function(data) {
            console.log('employee read');
            // update status van medewerker
            if(data) {
              console.log('turn light on');
            } else {
              console.log('turn light off');
            }
          }, function(data) {
            console.log('empolyee read fail');
            // set status op onbeschikbaar
          });
        }, function(data) {
            console.log('empolyee connect fail');
          // connect error
        });
      } else {
        console.log('empolyee connected');

        $BL.EndlessRead(function() {

        }, function() {
          
        });
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

    console.log('lamp toggle');
    
    if(value === true) {
      $('#toggle div span').html('Lamp staat aan');
    } else {
      $('#toggle div span').html('Lamp staat uit');
    }
  }
});