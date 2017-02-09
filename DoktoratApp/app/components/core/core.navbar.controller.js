(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$http', '$state', 'localStorageService', '$rootScope'];
	function NavbarController($http, $state, localStorageService, $rootScope) {
		var nbc = this;

		nbc.currentState = $state.current.name;
		nbc.signOut = signOut;
		nbc.isActive = isActive;
		nbc.user = localStorageService.get('user');
		nbc.toUserTasks = toUserTasks;
		nbc.toUserInvolvedTasks = toUserInvolvedTasks;
		nbc.toMainPage = toMainPage;

		initiateNumberOfInvolvedTasks();
		initiateNumberOfUserTasks();

		function signOut() {
			localStorageService.clearAll();
			nbc.user = false;
			$state.go('login');
		}

		function isActive(state) {
			return $state.current.name.indexOf(state) != -1;
		}

		function toUserTasks() {
			$state.go('main.userTasks', {username: nbc.user.id});
		}

		/**
		*	This is initiating a number of involved tasks for all users which are assigneed to some task.
		*/
		function initiateNumberOfInvolvedTasks() {

			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?candidateUser=' + nbc.user.id)
			.then(function(response){
				$rootScope.numberOfInvolvedTasks = response.data.total;
			});
		}

		function initiateNumberOfUserTasks() {

			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + nbc.user.id)
			.then(function(response){
				$rootScope.numberOfUserTasks = response.data.total;
			});
		}

		function toUserInvolvedTasks() {
			$state.go('main.userInvolvedTasks', {username: nbc.user.id});
		}

		function toMainPage() {
			$state.go('main.user', {username: nbc.user.id});
		}

	}

})();
