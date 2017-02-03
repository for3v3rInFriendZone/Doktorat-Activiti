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
					resolve: {
						listOfTasks: getTaskList
					},
					templateUrl: "app/components/user/main.html",
					controller: "UserController",
					controllerAs: "ucr"
				}
			}
		})
		.state("main.userTasks", {
			url: '/:username/tasks',
			views:{
				'main@': {
					resolve: {
						listOfTasks: getTaskList
					},
					templateUrl: "app/components/user/taskList.html",
					controller: "UserController",
					controllerAs: "ucr"
				}
			}
		})
		.state("main.userTask", {
			url: '/:username/task/:taskId',
			views:{
				'main@': {
					resolve: {
						task: getTask
					},
					templateUrl: "app/components/user/mainUserPage.html",
					controller: "UserTaskController",
					controllerAs: "utc"
				}
			}
		});


		getTaskList.$inject = ['$http'];
		function getTaskList($http){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks');
		}

		getTask.$inject = ['$http', '$stateParams'];
		function getTask($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId);
		}

	}
})();
