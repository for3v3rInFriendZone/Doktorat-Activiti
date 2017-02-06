(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$http', '$state', 'localStorageService', '$rootScope'];
	function NavbarController($http, $state, localStorageService, $rootScope) {
		var nbc = this;

		$rootScope.numberOfUserTasks = 0;
		$rootScope.numberOfGroupTasks = 0;
		$rootScope.numberOfInvolvedTasks = 0;
		nbc.userPage = userPage;
		nbc.goToAdminUsers = goToAdminUsers;
		nbc.currentState = $state.current.name;
		nbc.signOut = signOut;
		nbc.isActive = isActive;
		nbc.user = localStorageService.get('user');
		nbc.toUserTasks = toUserTasks;
		nbc.toUserInvolvedTasks = toUserInvolvedTasks;


		$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + nbc.user.id).then(function(response){
			$rootScope.numberOfUserTasks = response.data.total;
		})

		initiateNumberOfInvolvedTasks();

		function userPage() {
			$state.go('main.userPage', {username: nbc.user.username});
		}

		function goToAdminUsers() {
			$state.go('main.adminUsers');
		}

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

			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks')
			.then(function (response) {
				for(var i=0; i<response.data.data.length; i++) {
					if(response.data.data[i].assignee == null) {
						$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + response.data.data[i].id + '/identitylinks')
						.then(function(response2) {
							for(var a=0; a<response2.data.length; a++){
								if(response2.data[a].user == nbc.user.id) {
									$rootScope.numberOfInvolvedTasks = $rootScope.numberOfInvolvedTasks + 1;
								}
							}
						});
					}
				}

			});
		}

		function toUserInvolvedTasks() {
			$state.go('main.userInvolvedTasks', {username: nbc.user.id});
		}

	}

})();
