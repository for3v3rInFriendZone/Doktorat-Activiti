(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserController', UserController);

	UserController.$inject = ['$http', '$state', '$rootScope','localStorageService', 'listOfTasks', 'allTasksForUser'];
	function UserController($http, $state, $rootScope, localStorageService, listOfTasks, allTasksForUser) {

		var ucr = this;
		ucr.user = localStorageService.get('user');
		ucr.currentState = $state.current.name;
		ucr.listOfTasks = listOfTasks.data.data;
		ucr.viewTask = viewTask;

		$rootScope.numberOfUserTasks = listOfTasks.data.total;
		$rootScope.numberOfInvolvedTasks = allTasksForUser.data.total;

		/**
		 * Check if user is loged in.
		 */
		if(ucr.user == null || ucr.user == undefined) {
			$state.go('login');
		}
		/**
		 * Check if current user is loged in.
		 */
		if($state.params.username != ucr.user.id) {
				$state.go('main.user', {username: ucr.user.id});
		}

		function viewTask(id) {
			$state.go('main.userTask', {username: ucr.user.id, taskId: id});
		}
	}

})();
