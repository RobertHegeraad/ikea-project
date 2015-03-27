angular.module('controllers', [])

.controller('authCtrl', function($scope) {

  $scope.Login = function() {
    console.log('login');
  }

  $scope.Logout = function() {
    console.log('logout');
  }
});