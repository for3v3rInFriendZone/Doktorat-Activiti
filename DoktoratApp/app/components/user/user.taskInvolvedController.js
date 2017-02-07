(function() {
	'use strict';

	angular
		.module('doktorat-user')
		.controller('UserTaskInvolvedController', UserTaskInvolvedController);

	UserTaskInvolvedController.$inject = ['$scope', '$stateParams', '$rootScope', '$http','$state', 'localStorageService', 'allTasks', 'allUsers'];
	function UserTaskInvolvedController($scope, $stateParams, $rootScope, $http, $state, localStorageService, allTasks, allUsers) {

		var utic = this;

		utic.user = localStorageService.get('user');
		utic.currentState = $state.current.name;
    utic.listOfTasks = [];
    utic.viewTask = viewTask;
    utic.showUsers = [];
    utic.task = {};
    utic.identitylinks = [];
    utic.candidateTask = {};
    utic.claimTask = claimTask;
    ////////////////////////////
    utic.allTasks = allTasks.data.data;
    utic.allUsers = allUsers.data.data;

    initiateListOfInvolvedTasks();
		if(utic.currentState == 'main.userInvolvedClaimTask') {
			  getTask();
				getIdentityLinksForTask();
		}

		/**
		* First check if that task in list does not have an assignee. Only if assignee == null, then we can search poteantial assignees in identitylinks.
		*/
    function initiateListOfInvolvedTasks() {

			utic.allTasks.forEach(function(listItem, index){

					if(listItem.assignee == null) {
						$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + listItem.id + '/identitylinks')
						.then(function(response2) {
							for(var a=0; a<response2.data.length; a++){
								if(response2.data[a].user == utic.user.id) {
									utic.listOfTasks.push(listItem);
									break;
								}
							}
						});
					}

			});
		}

    function getTask() {
      $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId)
      .then(function(res) {
        utic.task = res.data;
      });
    }

		/**
		*	This shows a info about users which are potential candidates for a task, who does not have a assignee yet.
		*/
		function getIdentityLinksForTask() {
			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId + '/identitylinks')
			.then(function(links) {
				for(var i=0; i<links.data.length; i++) {
					for(var a=0; a<utic.allUsers.length; a++) {
						if(links.data[i].user == utic.allUsers[a].id) {
							utic.showUsers.push(utic.allUsers[a]);
							break;
						}
					}
				}
			});

		}

    function viewTask(id) {
			$state.go('main.userInvolvedClaimTask', {username: utic.user.id, taskId: id});
		}

		function initiateNumberOfInvolvedTasks() {

			$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks')
			.then(function (response) {
				for(var i=0; i<response.data.data.length; i++) {
					if(response.data.data[i].assignee == null) {
						$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + response.data.data[i].id + '/identitylinks')
						.then(function(response2) {
							for(var a=0; a<response2.data.length; a++){
								if(response2.data[a].user == utic.user.id) {
									$rootScope.numberOfInvolvedTasks = $rootScope.numberOfInvolvedTasks + 1;
								}
							}
						});
					}
				}

			});
		}

    function claimTask() {
      var payload = {
        "action": "claim",
        "assignee": utic.user.id
      };

      $http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId, payload)
      .then(function(response){
				$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + utic.user.id).then(function(response){
					$rootScope.numberOfUserTasks = response.data.total;
					initiateNumberOfInvolvedTasks();
				});
				$state.go('main.user', {username: utic.user.id});
      })

    }

	}

})();
