(function() {
	'use strict';

	var searchControllers = angular.module('SearchControllers', []);

	searchControllers.controller('UsersController', ['$scope', '$http', function($scope, $http) {
		var code = null;

		var searchUsers = function() {
			alert('hello');
		};
	}]);

	searchControllers.directive('searchForm', function() {
		return {
			restrict: 'E',
			templateName: 'views/search-form.html'
		};
	});
})();