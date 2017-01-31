(function() {
	"use strict";

	angular
		.module('doktorat-app-test')
		.config(config);


	config.$inject = ['$httpProvider'];
	function config($httpProvider){

      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  }

})();
