var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http) {
  $http.get('js/disease7.json').success(function(data) {
    $scope.clinvar = data;
    // angular.forEach($scope.clinvar, function(clin) {
    // 	clin.score = parseFloat(clin.score);
    // });
    $scope.order = 'c9';
    $scope.direction = 'reverse';
  });	
});