// JavaScript Document
var live=angular.module("live",[]);
live.controller("live",liveGuide);

function liveGuide($scope,$http){
	$http.post('/rest/checkToken/checkTokenRoles.mt',{
		params:{token:"NjY1OWI3NGJhZjFhYWE2MjU1NDQwOTY3ZGU5ODU4YzI=",userId:26,roomNumber:10009}
	}).success(function(arr){				
		console.log(arr)
	}).error(function(){
		console.log('获取失败')
	})

}