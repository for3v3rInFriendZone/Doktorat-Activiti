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
    getTask();

    function initiateListOfInvolvedTasks() {

      for(var i=0; i<utic.allTasks.length; i++) {
        if(utic.allTasks[i].assignee == null) {
            utic.candidateTask = utic.allTasks[i];

            $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + utic.candidateTask.id + '/identitylinks')
            .then(function(response2) {
              utic.identitylinks = response2.data;
              for(var a=0; a<response2.data.length; a++){
                if(response2.data[a].user == utic.user.id) {
                  utic.listOfTasks.push(utic.candidateTask);
                }
              }
              //moguce da u nekoj situaciji nece dobro raditi, ali za sada radi.
              for(var i=0; i<utic.identitylinks.length; i++) {
                for(var a=0; a<utic.allUsers.length; a++) {
                  if(utic.identitylinks[i].user == utic.allUsers[a].id) {
                    utic.showUsers.push(utic.allUsers[a]);
                    break;
                  }
                }
              }
            });
        }
      }


		}

    function getTask() {
      $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId)
      .then(function(res) {
        utic.task = res.data;
      });
    }

    function viewTask(id) {
			$state.go('main.userInvolvedClaimTask', {username: utic.user.id, taskId: id});
		}

    function getInvolvedUsers() {
        $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId + '/identitylinks');
    }

    function claimTask() {
      var payload = {
        "action": "claim",
        "assignee": utic.user.id
      };

      $http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + $stateParams.taskId, payload)
      .then(function(response){
        
				$state.go('main.user', {username: utic.user.id});
      })

    }

	}

})();
