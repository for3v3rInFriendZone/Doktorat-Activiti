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
						listOfTasks: getTaskList,
						allTasksForUser: getAllTasksForUser
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
						listOfTasks: getTaskList,
						allTasksForUser: getAllTasksForUser
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
						taskVariables: getTaskVariables,
						ftnProfessors: getFtnProfessors
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
							allTasksForUser: getAllTasksForUser
					},
					templateUrl: "app/components/user/taskInvolvedList.html",
					controller: "UserTaskInvolvedController",
					controllerAs: "utic"
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

		getAllTasksForUser.$inject = ['$http', '$stateParams'];
		function getAllTasksForUser($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?candidateUser=' + $stateParams.username);
		}

		getFtnProfessors.$inject = ['$http', '$stateParams'];
		function getFtnProfessors($http, $stateParams){
			return $http.get('http://localhost:8080/activiti-rest/service/identity/users?memberOfGroup=profesoriFtn');
		}


	}
})();
