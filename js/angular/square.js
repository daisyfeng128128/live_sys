var squareApp=angular.module('squareApp',[]);
squareApp.controller('square',function($scope,$http){
	$scope.squAnchs=[];
	$scope.gameAnchs=[];
	$scope.rankGames=[];
	$scope.sorts=[];
	$scope.gameItems=[];
	$scope.curSort='';

	$http.get("/files/allAnchors/1.json",{
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	}).success(function(json){
		$scope.squAnchs=json.data;
	}).error(function(){
		//console.log('直播秀场加载失败')
	});

	$http.get("/rest/homeAnchors/pushAnchors.mt",{
	}).success(function(json){
		$scope.rankGames=json.data;
	}).error(function(){
		//console.log('排行推荐加载失败')
	});


	$http.get("/files/allGameAnchors/1.json",{
	}).success(function(json){
		$scope.gameAnchs=json.data;
	}).error(function(){
		//console.log('全部游戏加载失败')
	});

	

	$http.get("/rest/homeAnchors/gameClassify.mt",{
	}).success(function(json){
		$scope.sorts=json.data;
	}).error(function(){
		//console.log('游戏分类标题加载失败')
	});

	function setSort(name){
		$scope.rows=[];
		for (var i = 0; i < name; i++) {
			$scope.sorts.push(i);
		}
	}

	$scope.getSort=getSort;
	function getSort(name){
		$scope.curSort=name;
		$http.get("/rest/homeAnchors/allKeyword.mt",{
			params:{name:name}
		}).success(function(json){
			$(".allG").removeClass("colorPin");
			$("#allGaD").hide();
			$("#gameItems").show();
			$(".allG").click(function(){
				$(".tits").removeClass('colorPin');
				$(".allG").addClass("colorPin");
				$("#gameItems").hide();
				$("#allGaD").show();
			})
			$scope.gameItems=json.data;
			setSort(json.data.rows)
		}).error(function(){
			//console.log('分类详情获取失败')
		});
	}
	

})	

squareApp.filter("decode",function(){
	return function(value){
		return decodeURIComponent(value)
	}
})
squareApp.filter("time",function(){
	return function(value){
		return parseInt(value/60000)
	}
})


