(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskController', UserTaskController);

	UserTaskController.$inject = ['$scope', '$rootScope', '$http','$state', 'localStorageService', '$fancyModal', 'taskForm', 'task', 'taskVariables'];
	function UserTaskController($scope, $rootScope, $http, $state, localStorageService, $fancyModal, taskForm, task, taskVariables) {

		var utc = this;
		utc.user = localStorageService.get('user');
		utc.currentState = $state.current.name;
		utc.task = task.data;
		utc.taskForm = taskForm.data.formProperties;
		utc.completeTask = completeTask;
		utc.taskVariables = taskVariables.data;
		utc.variables = [];
		utc.params = {};

		$scope.popup1 = {
			opened : false
		};

		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.popup2 = {
			opened : false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		/**
		 * Options for a datepicker, in this instance, its for setting a min
		 * date.
		 */
		$scope.options = {
			minDate : new Date(),
			showWeeks : true
		};


		initiateVariables();

		function initiateVariables() {
			for(var i=0; i<utc.taskVariables.length; i++) {
				utc.params[utc.taskVariables[i].name] = utc.taskVariables[i].value;
			}
		}

		function initiateNumberOfInvolvedTasks() {

			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks')
			.then(function (response) {
				for(var i=0; i<response.data.data.length; i++) {
					if(response.data.data[i].assignee == null) {
						$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + response.data.data[i].id + '/identitylinks')
						.then(function(response2) {
							for(var a=0; a<response2.data.length; a++){
								if(response2.data[a].user == utc.user.id) {
									$rootScope.numberOfInvolvedTasks = $rootScope.numberOfInvolvedTasks + 1;
								}
							}
						});
					}
				}

			});
		}

		function completeTask() {

			for(var i=0; i<utc.taskForm.length; i++){
				utc.variable = {};

				if(utc.taskForm[i].writable == false) {
					continue;
				}

				utc.variable.name = utc.taskForm[i].id;
				utc.variable.value = utc.params[utc.taskForm[i].id];
				utc.variables.push(utc.variable);
			}

			var payload = {
					"action": "complete",
					"variables": utc.variables
				};

			$http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $state.params.taskId, payload).then(function(resSuccess){
				$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + utc.user.id).then(function(response){
					$rootScope.numberOfUserTasks = response.data.total;
					initiateNumberOfInvolvedTasks();
				})
				$state.go('main.user', {username: utc.user.id});
			});

		}


	}

})();
