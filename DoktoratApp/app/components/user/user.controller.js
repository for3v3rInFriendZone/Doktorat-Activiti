(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserController', UserController);

	UserController.$inject = ['$state', 'localStorageService'];
	function UserController($state, localStorageService) {

		var ucr = this;
		ucr.user = localStorageService.get('user');
		var sss = $state.href($state.current.name, $state.params, {absolute: true});

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


		ucr.currentState = $state.current.name;
		ucr.edit = edit;
		ucr.closeModal = closeModal;
		ucr.savePass = savePass;

		ucr.nameAndSurname = ucr.user.firstname + ' ' + ucr.user.lastname;

		function edit() {
			$state.go('main.userEdit', {username: ucr.user.username, id: ucr.user.id});
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
