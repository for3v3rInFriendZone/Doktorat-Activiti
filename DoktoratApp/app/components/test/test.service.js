(function() {
	"use strict";

	angular
		.module('doktorat-app-test')
		.factory('Test', Test);

	Test.$inject = ['$resource'];
	function Test($resource) {

		var testService = $resource('http://localhost:8080/activiti-rest/service/repository/deployments/:id',
      {id: "@_id"},
			{ getDeployments: { method: 'GET',
                          isArray: true,
                          headers: { 'Authorization': 'Basic a2VybWl0Omtlcm1pdA==' } }
       });

		return testService;
	}
})();
