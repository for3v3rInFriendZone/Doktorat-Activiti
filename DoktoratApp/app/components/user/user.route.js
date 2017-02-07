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
						taskForm: getTaskForm,
						task: getTask,
						taskVariables: getTaskVariables
					},
					templateUrl: "app/components/user/mainUserPage.html",
					controller: "UserTaskController",
					controllerAs: "utc"
				}
			}
		})
		.state("main.userInvolvedTasks", {
			url: '/:username/involved_tasks',
			views:{
				'main@': {
					resolve: {
						allTasks: getAllTasks,
						allUsers: getAllUsers
					},
					templateUrl: "app/components/user/taskInvolvedList.html",
					controller: "UserTaskInvolvedController",
					controllerAs: "utic"
				}
			}
		})
		.state("main.userInvolvedClaimTask", {
			url: '/:username/involved_task/:taskId',
			views:{
				'main@': {
					resolve: {
						allTasks: getAllTasks,
						allUsers: getAllUsers
					},
					templateUrl: "app/components/user/claimInvolvedTask.html",
					controller: "UserTaskInvolvedController",
					controllerAs: "utic"
				}
			}
		})
		.state("main.userGroupTasks", {
			url: '/:username/group_tasks',
			views:{
				'main@': {
					resolve: {
						allTasks: getAllTasks,
					},
					templateUrl: "app/components/user/groupTasks.html",
					controller: "UserGroupTaskController",
					controllerAs: "ugtc"
				}
			}
		})
		.state("main.userGroupClaimTask", {
			url: '/:username/group_task/:taskId',
			views:{
				'main@': {
					resolve: {
						allTasks: getAllTasks
					},
					templateUrl: "app/components/user/groupTasks.html",
					controller: "UserGroupTaskController",
					controllerAs: "ugtc"
				}
			}
		});


		getTaskList.$inject = ['$http', '$stateParams'];
		function getTaskList($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + $stateParams.username);
		}

		getTaskForm.$inject = ['$http', '$stateParams'];
		function getTaskForm($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/form/form-data?taskId=' + $stateParams.taskId);
		}

		getTask.$inject = ['$http', '$stateParams'];
		function getTask($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId);
		}

		getTaskVariables.$inject = ['$http', '$stateParams'];
		function getTaskVariables($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId + '/variables');
		}

		getAllTasks.$inject = ['$http'];
		function getAllTasks($http){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks');
		}

		getAllUsers.$inject = ['$http'];
		function getAllUsers($http){
			return $http.get('http://localhost:8080/activiti-rest/service/identity/users')
			.then(function(res) {
				return $http.get('http://localhost:8080/activiti-rest/service/identity/users?size=' + res.data.total);
			});
		}

		getAllGroups.$inject = ['$http'];
		function getAllGroups($http){
			return $http.get('http://localhost:8080/activiti-rest/service/identity/groups')
			.then(function(res) {
				return $http.get('http://localhost:8080/activiti-rest/service/identity/groups?size=' + res.data.total);
			});
		}

	}
})();
