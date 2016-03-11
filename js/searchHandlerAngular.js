(function() {
	var module = angular.module('searchModule', [])
		.factory('searchService', ['$http', function($http){
			var self = this;

			var retrievePersons = function(personName, pageNumber) {
				var url = 'php/search.php';

				var pageNumber = pageNumber == undefined ? '1' : pageNumber;
				var fixed = personName.replace(' ', '+');

				return $http({
					    method: "POST",
					    url: url,
					    data: {
					        type: 'actor', name: fixed, pageNumber: pageNumber
					    },
					    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).then(function(data){
						return data;
					});
			};

			return {
				retrievePersons: retrievePersons
			};
		}]);
})();