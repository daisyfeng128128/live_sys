(function(){
	var squareApp=angular.module('squareApp',[]).config(['$compileProvider',function( $compileProvider ){$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);        
	    }]) ;
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
		});

		$http.get("/rest/homeAnchors/pushAnchors.mt",{
		}).success(function(json){
			$scope.rankGames=json.data;
			
		}).error(function(){
		});


		$http.get("/files/allGameAnchors/1.json",{
		}).success(function(json){
			$scope.gameAnchs=json.data;
		}).error(function(){
		});

		

		$http.get("/rest/homeAnchors/gameClassify.mt",{
		}).success(function(json){
			$scope.sorts=json.data;
		}).error(function(){
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
			});
		}

		$("img.lazy").lazyload({effect: "fadeIn",placeholder : "public/index/images/pic_youxi_moren.png",});
		

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

	$(function(){
        function SwapTab(name, title, content, Sub, cur) {
            $(name + ' ' + title).click(function () {
                $(this).addClass(cur).siblings().removeClass(cur);
                $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
    
            })
        }
        
        SwapTab(".square .squareTit", "div", ".squareCon", ".squareDe", "active");
    })



})()