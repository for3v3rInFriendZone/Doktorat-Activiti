(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskController', UserTaskController);

	UserTaskController.$inject = ['$scope', '$rootScope', '$http','$state', 'localStorageService', 'taskForm', 'task', 'taskVariables', 'ftnProfessors'];
	function UserTaskController($scope, $rootScope, $http, $state, localStorageService, taskForm, task, taskVariables, ftnProfessors) {

		var utc = this;
		utc.user = localStorageService.get('user');
		utc.currentState = $state.current.name;
		utc.task = task.data;
		utc.taskForm = taskForm.data.formProperties;
		utc.completeTask = completeTask;
		utc.taskVariables = taskVariables.data;
		utc.variables = [];
		utc.ftnProfessors = ftnProfessors.data.data;
		utc.params = {};
		utc.taskSastanak = false;

		if(utc.task.name == 'Predlog komisije za ocenu podobnosti teme.' || utc.task.name == 'Predlog komisije za ocenu i odbranu.' || utc.task.name == 'Doktorant bira mentora.' || utc.task.name == 'Doktorant bira drugog mentora.')  {
			utc.taskSastanak = true;
		}

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

		function completeTask() {

			if(utc.form.$invalid) {
				utc.submitted = true;
				return;
			}

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

				$state.go('main.user', {username: utc.user.id});
			});

		}

	}

})();
