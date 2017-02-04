(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskController', UserTaskController);

	UserTaskController.$inject = ['$http','$state', 'localStorageService', '$fancyModal', 'taskForm', 'task', 'taskVariables'];
	function UserTaskController($http, $state, localStorageService, $fancyModal, taskForm, task, taskVariables) {

		var utc = this;
		utc.user = localStorageService.get('user');
		utc.currentState = $state.current.name;
		utc.task = task.data;
		utc.taskForm = taskForm.data.formProperties;
		utc.completeTask = completeTask;
		utc.taskVariables = taskVariables.data;
		utc.variables = [];
		utc.params = {};

		initiateVariables();

		function initiateVariables() {
			for(var i=0; i<utc.taskVariables.length; i++) {
				utc.params[utc.taskVariables[i].name] = utc.taskVariables[i].value;
			}
		}

		function completeTask() {

			for(var i=0; i<utc.taskForm.length; i++){
				utc.variable = {};
				
				utc.variable.name = utc.taskForm[i].id;
				utc.variable.value = utc.params[utc.taskForm[i].id];
				utc.variables.push(utc.variable);
			}

			var payload = {
					"action": "complete",
					"variables": utc.variables
				};

			$http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $state.params.taskId, payload).then(function(resSuccess){
				$state.go('main.userTasks', {username: utc.user.id});
			});

		}


	}

})();
