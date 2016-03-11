(function() {
	var app = angular.module('consultApp', ['searchModule']);

	app.controller('UserController', ['searchService', function(searchService) {
		var self = this;
		self.actorName = '';
		self.actorsResult = {};
		this.searchUsers = function searchUsers(event) {
			var code = event.keyCode;
			if(code == 13) {
				searchService.retrievePersons(self.actorName).then(function(result) {
					self.actorsResult = result.data.results;
				});
			}
		};
	}]);


})();