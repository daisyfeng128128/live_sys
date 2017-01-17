var homeApp=angular.module('homeApp',[]);
homeApp.controller('homeCon',function($scope,$http){
    $scope.squAnchs=[];
    $scope.gameAnchs=[];
    $scope.rankGames=[];
    $scope.sorts=[];
    $scope.gameItems=[];
    $scope.curSort='';
    $scope.banNums=[];
    $scope.banCons=[];

    $http.get("/files/banners.json",{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    }).success(function(json){
       console.log(json)
       $scope.banCons=json.data;
    }).error(function(){
        console.log('banner加载失败')
    });

    

})  

homeApp.filter("decode",function(){
    return function(value){
        return decodeURIComponent(value)
    }
})
homeApp.filter("time",function(){
    return function(value){
        return parseInt(value/60000)
    }
})


