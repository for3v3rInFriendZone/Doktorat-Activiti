(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskController', UserTaskController);

	UserTaskController.$inject = ['$http','$state', 'localStorageService', '$fancyModal', 'task'];
	function UserTaskController($http, $state, localStorageService, $fancyModal, task) {

		var utc = this;
		utc.user = localStorageService.get('user');
		utc.currentState = $state.current.name;
		utc.completeTask = completeTask;

		function completeTask() {
			var payload = {
					"action": "complete",
					"variables": [
						{"name": "biografija", "value": utc.params.biografija},
						{"name": "temadd", "value": utc.params.naslovTeme}
				]};

			$http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $state.params.taskId, payload).then(function(resSuccess){
				$state.go('main.userTasks', {username: utc.user.id});
			});

		}


	}

})();
