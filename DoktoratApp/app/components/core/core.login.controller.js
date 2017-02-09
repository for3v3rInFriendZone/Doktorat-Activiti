(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', '$state', 'localStorageService', '$base64', 'processes', 'phdStudents'];
	function LoginController($http, $state, localStorageService, $base64, processes, phdStudents) {

		var ulc = this;

		ulc.submitForm = submitForm;
		ulc.focus = focus;
		ulc.userPage = userPage;
		ulc.loginFailed = false;
		ulc.processes = processes.data.data;
		ulc.phdStudents = phdStudents.data.data;
		ulc.variables = [];
		ulc.resultProcess = false;

		initiateVariables();


		function submitForm() {

		//	$http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode(ulc.username +':' + ulc.password);
			$http.get('http://localhost:8080/activiti-rest/service/identity/users/' + ulc.username)
			.then(function(dataSuccess){
				ulc.user = dataSuccess.data;

				if(ulc.password != ulc.user.id) {
						ulc.loginFailed = true;
						return;
				}

				/**
				*  If there are no processes, start a new one.
				* If there are processes, checks if process has already been started.
				* This way, it wont after login always start a new process for every user. Only for Phd students.
				*/
				for(var i=0; i<ulc.phdStudents.length; i++) {
					if(ulc.phdStudents[i].id == ulc.username) {
						if(ulc.processes.length == 0) {
							startProcess(ulc.username);
						} else {
							for(var a=0; a<ulc.variables.length; a++) {
								if(ulc.variables[a].name == 'initiator' && ulc.variables[a].value == ulc.username) {
									ulc.resultProcess = true;
									break;
								}
							}
							if(!ulc.resultProcess) {
								startProcess(ulc.username);
								break;
							}
						}
					}
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
		* Starts a process for every PhD student, which has not already been started
		*/
		function startProcess(nameId){
			var payload = {
				"processDefinitionKey": "doktoratApp",
 				"variables": [
 						{"name": "initiator", "value": nameId}
 			]};

			$http.post('http://localhost:8080/activiti-rest/service/runtime/process-instances', payload);
		}

		function initiateVariables() {
			for(var a=0; a<ulc.processes.length; a++) {
				$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ ulc.processes[a].id  +'/variables')
				.then(function(response) {
					for(var b=0; b<response.data.length; b++) {
						ulc.variables.push(response.data[b]);
					}
				});
			}
		}

	}

})();
