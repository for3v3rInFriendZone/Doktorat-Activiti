(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskInvolvedController', UserTaskInvolvedController);

	UserTaskInvolvedController.$inject = ['$scope', '$stateParams', '$rootScope', '$http','$state', 'localStorageService', 'allTasksForUser'];
	function UserTaskInvolvedController($scope, $stateParams, $rootScope, $http, $state, localStorageService, allTasksForUser ) {

		var utic = this;

		utic.user = localStorageService.get('user');
		utic.currentState = $state.current.name;
    utic.viewTask = viewTask;
    utic.claimTask = claimTask;
    utic.allTasksForUser = allTasksForUser.data.data;

    function viewTask(id) {
			$state.go('main.userInvolvedClaimTask', {username: utic.user.id, taskId: id});
		}

    function claimTask(taskId) {
      var payload = {
        "action": "claim",
        "assignee": utic.user.id
      };

      $http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + taskId, payload)
      .then(function(response){
			//	updateNumberOfAssigneeTasks();
			//	updateNumberOfInvolvedTasks();
				$state.go('main.user', {username: utic.user.id});
      })

    }

		function updateNumberOfAssigneeTasks() {
			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + utic.user.id)
			.then(function(response){
				$rootScope.numberOfUserTasks = response.data.total;
			});
		}

		function updateNumberOfInvolvedTasks() {
			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?candidateUser' + utic.user.id)
			.then(function(response){
				$rootScope.numberOfInvolvedTasks = response.data.total;
			});
		}

	}

})();
