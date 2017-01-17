(function(){
	var app = angular.module('personalCenter',[]).config(['$compileProvider',function( $compileProvider ){$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);        
	    }]) ;

	app.controller('center',function($scope,$http){
		$scope.news = [];
		$scope.pages= [] 
		$scope.curPage=1;
		$scope.userId=currentUserId;

		function setCur(n){
			$scope.pages= [];
			$scope.tPages= [];
			if (n<10) {
				for(var i=1;i<=n;i++){
					console.log(i)
					$scope.tPages.push(i)
				}
			}else if (n>=10) {
				if ($scope.curPage>=1 && $scope.curPage<=6) {
					$scope.start= 1;
					$scope.end= 10;
				}else if ($scope.curPage>=7 && $scope.curPage<=5) {
					$scope.start=$scope.curPage-5;
					$scope.end=$scope.curPage+4;
				}else{
					$scope.start=n-9;
					$scope.end=n;
				}

				for(var i=$scope.start; i<=$scope.end;i++){
					$scope.tPages.push(i)
				}
			}
		}

		$(".pagination .prev").click(function(){
			$scope.curPage--;
			getPage($scope.curPage,$scope.userId);
		})
		$(".pagination .next").click(function(){
			$scope.curPage++;
			getPage($scope.curPage,$scope.userId);
		})
		getPage(1,$scope.userId);
		// 获取显示数据
		$scope.getPage=getPage;
		function getPage(p,userId){
			$scope.curPage=p;
			$http.get('rest/usersGiftDetails/alerts.mt',{
				params:{userId:userId,page:p,num:10}
			}).success(function(arr){				
				$scope.news = arr.data;
				setCur(arr.count);
				if ($scope.curPage==arr.count) {
					$(".pagination .next").addClass("disabled");
				}else{
					$(".pagination .next").removeClass("disabled");
				}
			}).error(function(){
				console.log('获取失败')
			})


			if ($scope.curPage==1) {
				$(".pagination .prev").addClass("disabled");
			}else{
				$(".pagination .prev").removeClass("disabled");
			}
			

		}

		//删除数据
		$scope.dele=function(id,p,userId){
			$http.get('rest/usersGiftDetails/delAlerts.mt',{
				params:{id:id}
			}).success(function(arr){
				$(".succ").slideDown();
				setTimeout(function(){
	                $(".succ").slideUp();
	            },1050)
				getPage(p,userId);
			}).error(function(){
				$(".deErr").slideDown();
				setTimeout(function(){
	                $(".deErr").slideUp();
	            },105000)
			})
		}

	});

	
	app.filter("toJson",function(){
		return function(value){
			return angular.fromJson(value)
		}
	})

	app.filter("decode",function(){
	return function(value){
		return decodeURIComponent(value)
	}
})

})()