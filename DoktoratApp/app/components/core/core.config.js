
(function() {
	"use strict";

	angular
		.module('doktorat-core')
		.config(config);


	config.$inject = ['$httpProvider'];
	function config($httpProvider){

      $httpProvider.defaults.headers.common['Authorization'] = 'Basic a2VybWl0Omtlcm1pdA==';
  }

})();
