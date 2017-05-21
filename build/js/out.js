var app = angular.module('myApp', []);


app.controller('OutCtrl', function($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";


    $scope.items = [{
	  id: 1,
	  label: 'aLabel',
	  subItem: { name: 'aSubItem' }
	}, {
	  id: 2,
	  label: 'bLabel',
	  subItem: { name: 'bSubItem' }
	}];




});