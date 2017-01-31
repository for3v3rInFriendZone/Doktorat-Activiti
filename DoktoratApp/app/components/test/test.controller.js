(function() {
	'use strict';

	angular
		.module('doktorat-app-test')
		.controller('TestController', TestController);

	TestController.$inject = ['$http', 'Test', '$base64'];
	function TestController($http, Test, $base64) {
		var tcr = this;
		$http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode('kermit:kermit');


		tcr.text = 'ssdsds';
/*
		var test = new Test();
		test.$getDeployments(function(response){
			tcr.text = response.data;
		})
*/
		$http.get('http://localhost:8080/activiti-rest/service/repository/deployments')
		.then(function(response){
			tcr.text = response.data;
		})

	}
})();
