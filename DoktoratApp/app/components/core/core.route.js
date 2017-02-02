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
					templateUrl: "app/components/core/login.html",
					controller: "LoginController",
					controllerAs: "ulc"
				},
			}
		});


	}
})();
