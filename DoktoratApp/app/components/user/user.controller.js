(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserController', UserController);

	UserController.$inject = ['$http', '$state', 'localStorageService', 'listOfTasks'];
	function UserController($http, $state, localStorageService, listOfTasks) {

		var ucr = this;
		ucr.user = localStorageService.get('user');
		ucr.currentState = $state.current.name;
		ucr.listOfTasks = [];
		ucr.viewTask = viewTask;
		ucr.closeModal = closeModal;
		ucr.savePass = savePass;

		for(var i=0; i<listOfTasks.data.data.length; i++){
			if(listOfTasks.data.data[i].assignee === ucr.user.id) {
				ucr.listOfTasks.push(listOfTasks.data.data[i]);
			}
		}

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

		function closeModal() {
			$fancyModal.close();
		}

		function savePass() {

			if(ucr.newPassword == ucr.rePass) {
				localStorageService.set('newPassword', ucr.newPassword);
			} else {
				ucr.notEqualPass = true;
				return;
			}
			$fancyModal.close();
		}
	}

})();
