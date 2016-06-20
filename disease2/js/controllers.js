var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http) {
  $http.get('js/disease7.json').success(function(data) {
  	var vm = this;
  	vm.clinvar = data;

    $scope.clinvar = data;
    $scope.order = 'c9';
    $scope.direction = 'reverse';
  });	
});