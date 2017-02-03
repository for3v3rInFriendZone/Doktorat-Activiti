(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', '$state', 'localStorageService', '$base64'];
	function LoginController($http, $state, localStorageService, $base64) {

		var ulc = this;

		ulc.submitForm = submitForm;
		ulc.focus = focus;
		ulc.userPage = userPage;
		ulc.loginFailed = false;

		function submitForm() {

			$http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode(ulc.username + ':' + ulc.password);
			$http.get('http://localhost:8080/activiti-rest/service/identity/users/' + ulc.username)
			.then(function(dataSuccess){
				ulc.user = dataSuccess.data;

				if(checkStartProcess()) {
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

		/**
		* Checks if process has already been started. This way, it wont after login always start a new process.
		*/
		function checkStartProcess() {
			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances').then(function(response){
				var arrayProcesses = response.data.data;
				for(var i=0; i<arrayProcesses.length; i++) {
					if(arrayProcesses[i].processDefinitionKey === 'doktoratApp') {
						return false;
					}
				}
				return true;
			});
		}
	}

})();
