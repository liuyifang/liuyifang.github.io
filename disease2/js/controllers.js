var myApp = angular.module('myApp', ['angular-inview']);

myApp.controller('MyController', function MyController($scope, $http, $timeout) {
  $http.get('js/disease7.json').success(function(data) {
    $scope.clinvar = data;
    // angular.forEach($scope.clinvar, function(clin) {
    // 	clin.score = parseFloat(clin.score);
    // });
    $scope.order = 'c9';
    $scope.direction = 'reverse';
    $scope.limit = 20;

    $scope.increaseLimit = function (actuallyIncrease) {
	    if (actuallyIncrease) { //this will be passed the value of $inview from directive
	      $timeout(function() {
	        $scope.limit = $scope.limit + 20;
	      }, 500);
	    }
  	};
  });	
});