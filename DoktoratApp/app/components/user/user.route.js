(function() {
	"use strict";

	angular
		.module('doktorat-user')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("main.user", {
			url: '/:username',
			views:{
				'main@': {
					templateUrl: "app/components/user/main.html",
					controller: "UserController",
					controllerAs: "ucr"
				}
			}
		})
		.state("main.userPage", {
			url: '/profile/:username',
			views:{
				'main@': {
					templateUrl: "app/components/user/mainUserPage.html",
					controller: "UserController",
					controllerAs: "ucr"
				}
			}
		})
		.state("main.userEdit", {
			url: '/profile/:username/:id',
			views:{
				'main@': {
					resolve: {
						selectedUser: getUserToEdit,
						categories: getCategories
					},
					templateUrl: "app/components/user/user.editUser.html",
					controller: "UserEditController",
					controllerAs: "uec"
				}
			}
		});


		getUsers.$inject = ['User'];
		function getUsers(User) {
			return User.query().$promise;
		}

		getUserToEdit.$inject = ['User', '$stateParams'];
		function getUserToEdit(User, $stateParams) {
			return User.get({id: $stateParams.id}).$promise;
		}

		getCategories.$inject = ['Category'];
		function getCategories(Category) {
			return Category.query().$promise;
		}
	}
})();
