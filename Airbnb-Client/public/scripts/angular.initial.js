/**
 * http://usejsdoc.org/
 */

var airbnbApp = angular.module('airbnbApp',['ui.router']);
//handles client side routing
airbnbApp.config(function($stateProvider, $urlRouterProvider){
	
	console.log("Helleo");
	$urlRouterProvider.
		otherwise('/');
	
	$stateProvider
		.state('home',
				{
					url:'/',
					controller : 'controllerHome',
					templateUrl : './templates/view.homepage.html',
						resolve : {
							session : function($http){
								return $http({
									method : "POST",
									url : '/getusersession'
								});
							}
						}
				})
		.state('home.becomeHost',
			{
				url:'/becomeHost',
				templateUrl : './templates/view.becomeHost.html',
				/*resolve : {
					session : function($http){
						return $http({
							method : "POST",
							url : '/getusersession'
						});
					}
				},*/
				controller : 'controllerBecomeHost'
			})
		.state('home.becomeHostRoom',
			{
				url:'/becomeHost/room',
				templateUrl : './templates/view.becomeHostRoom.html',
				/*resolve : {
					session : function($http){
						return $http({
							method : "POST",
							url : '/getusersession'
						});
					}
				},*/
				controller : 'controllerBecomeHost'
			})
})


