(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', '$state', 'localStorageService'];
	function LoginController($http, $state, localStorageService) {

		var ulc = this;

		ulc.submitForm = submitForm;
		ulc.focus = focus;
		ulc.userPage = userPage;
		ulc.loginFailed = false;

		function submitForm() {

			$http.get('http://localhost:8080/activiti-rest/service/identity/users/' + ulc.username)
			.then(function(dataSuccess){
				ulc.user = dataSuccess.data;
				localStorageService.set('user', ulc.user);
				$state.go('main.user', {username: ulc.user.id});

			}, function(dataError){
				ulc.loginFailed = true;
			});

		}

		function focus() {
			ulc.loginFailed = false;
		}


		function userPage() {
			$state.go('userPage', {username: ulc.username});
		}
	}

})();
