(function() {
	'use strict';

	angular
		.module('doktorat-core')
		.controller('UserGroupTaskController', UserGroupTaskController);

	UserGroupTaskController.$inject = ['$http', '$rootScope', '$state', 'localStorageService', 'allTasks'];
	function UserGroupTaskController($http, $rootScope, $state, localStorageService, allTasks) {

		var ugtc = this;
    ugtc.allTasks = allTasks.data.data;
    ugtc.user = localStorageService.get('user');
		ugtc.currentState = $state.current.name;
    ugtc.taskGroupObject = {};
    ugtc.listOfTasks = [];
    ugtc.viewTask = viewTask;
    ugtc.claimTask = claimTask;


    initiateListOfTasksForGroups();


    function initiateListOfTasksForGroups() {

      ugtc.allTasks.forEach(function(listItem, index){
					if(listItem.assignee == null) {

            $http.get('http://localhost:8080/activiti-rest/service/runtime/tasks/' + listItem.id + '/identitylinks')
            .then(function(response2) {
              for(var a=0; a<response2.data.length; a++){
                if(response2.data[a].group != null) {
                    $http.get('http://localhost:8080/activiti-rest/service/identity/users?memberOfGroup=' + response2.data[a].group)
                    .then(function(res) {
                      res.data.data.forEach(function(itemRes, indexRes) {
                        if(itemRes.id == ugtc.user.id) {
                          ugtc.taskGroupObject.taskId = listItem.id;
                          ugtc.taskGroupObject.name = listItem.name;
                          ugtc.taskGroupObject.createTime = listItem.createTime;
                          ugtc.taskGroupObject.groupName = response2.data[a-1].group;

                          ugtc.listOfTasks.push(ugtc.taskGroupObject);
                        }
                      });
                    });
                }
              }
            });
					}
			});

    }

    function viewTask(id) {
      $state.go('main.userGroupClaimTask', {username: ugtc.user.id, taskId: id});
    }

    function claimTask(id) {
      var payload = {
        "action": "claim",
        "assignee": ugtc.user.id
      };

      $http.post('http://localhost:8080/activiti-rest/service/runtime/tasks/' + id, payload)
      .then(function(response){
				$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + ugtc.user.id).then(function(response){
					$rootScope.numberOfUserTasks = response.data.total;
				});

				$state.go('main.user', {username: ugtc.user.id});
      })

    }

	}

})();
