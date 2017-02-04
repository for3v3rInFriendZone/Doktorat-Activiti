(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', '$state', 'localStorageService', '$base64', 'processes'];
	function LoginController($http, $state, localStorageService, $base64, processes) {

		var ulc = this;

		ulc.submitForm = submitForm;
		ulc.focus = focus;
		ulc.userPage = userPage;
		ulc.loginFailed = false;
		ulc.processes = processes.data.data;

		function submitForm() {

			$http.get('http://localhost:8080/activiti-rest/service/identity/users/' + ulc.username)
			.then(function(dataSuccess){
				ulc.user = dataSuccess.data;

				if(ulc.password != ulc.user.id) {
						ulc.loginFailed = true;
						return;
				}

				/**
				* Checks if process has already been started. This way, it wont after login always start a new process.
				*/
				if(ulc.processes.length == 0) {
					startProcess(ulc.user.id);
				}

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

		/**
		* Starts a process if login has been successful.
		*/
		function startProcess(nameId){
			var payload = {
				"processDefinitionKey": "doktoratApp",
 				"variables": [
 						{"name": "initiator", "value": nameId}
 			]};

			$http.post('http://localhost:8080/activiti-rest/service/runtime/process-instances', payload);
		}

	}

})();
