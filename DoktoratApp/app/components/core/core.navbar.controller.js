(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$http', '$state', 'localStorageService'];
	function NavbarController($http, $state, localStorageService) {
		var nbc = this;

		nbc.numberOfTasks = 0;
		nbc.userPage = userPage;
		nbc.goToAdminUsers = goToAdminUsers;
		nbc.currentState = $state.current.name;
		nbc.signOut = signOut;
		nbc.isActive = isActive;
		nbc.user = localStorageService.get('user');
		nbc.toUserTasks = toUserTasks;


		$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks').then(function(response){
			var spo = response.data.data;
			for(var i=0; i<spo.length; i++) {
				if(spo[i].assignee === nbc.user.id) {
					nbc.numberOfTasks = nbc.numberOfTasks + 1;
				}
			}
		})

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
	}

})();
