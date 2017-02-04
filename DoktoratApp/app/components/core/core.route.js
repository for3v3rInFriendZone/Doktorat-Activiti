(function() {
	"use strict";

	angular
		.module('doktorat-core')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/login");

		$stateProvider
		.state("main", {
			abstract: true,
			views:{
				'navbar': {
					templateUrl: "app/components/core/navbar.html",
					controller: "NavbarController",
					controllerAs: "nbc"
				},
				'footer': {
					templateUrl: "app/components/core/footer.html"
				}
			}
		})
		.state("login", {
			url: "/login",
			views:{
				'main@': {
					resolve: {
						processes: getProcesses
					},
					templateUrl: "app/components/core/login.html",
					controller: "LoginController",
					controllerAs: "ulc"
				},
			}
		});

		getProcesses.$inject = ['$http'];
		function getProcesses($http){
			$http.defaults.headers.common['Authorization'] = 'Basic a2VybWl0Omtlcm1pdA==';
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances?processDefinitionKey=doktoratApp');
		}

	}
})();
