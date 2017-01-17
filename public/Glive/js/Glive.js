// JavaScript Document
var liveApp=angular.module("liveApp",[]).config(["$httpProvider", function ($httpProvider) {

 	$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
 	$httpProvider.defaults.headers.post["Accept"] = "*/*";
 	$httpProvider.defaults.transformRequest = function (data) { 
	    if (data !== undefined) { 
	        return $.param(data);
	    }
	    return data;
	 };
}]);

liveApp.controller("live",function($scope,$http){
	$scope.currentToken=currentToken;
	$scope.currentUserID=currentUserID;
	$scope.currentRoomNumber=currentRoomNumber;
	$scope.anchorInfo=[];
	if ($scope.currentRoomNumber!="") {
        var anc={};
		$http.post('/rest/checkToken/checkTokenRoles.mt',{
			token:$scope.currentToken,
			userId:$scope.currentUserID,
			roomNumber:$scope.currentRoomNumber
		}).success(function(arr){
            if(arr.data == null) return false;
			for (var i = 0; i < arr.data.length; i++) {
                if(arr.data[i] != null){
                    if (arr.data[i].msgid=="ANCHORS_HANDINFO"){
                        $scope.anchorInfo=arr.data[i].args;
                        $scope.anchorInfo=angular.fromJson($scope.anchorInfo)
                    }
                    if(arr.data[i].msgid == "ANCHORS_HANDINFO"){
                        var args = jQuery.parseJSON(arr.data[i].args);
                        anc.roomNumber =args.roomNumber;
                        if (args.online)
                            anc.online = true;
                    }
                    if(arr.data[i].msgid == "USERS_HANDINFO"){
                        var args = jQuery.parseJSON(arr.data[i].args);
                        if (args.isAnchor)
                            anc.anchor = true;
                    }
                }
			}
            anc.status=arr.resultStatus;
            liveInfo(anc);
		}).error(function(){
			
		})

        var liveInfo = function(anc){
            //alert(anc);
            if (anc.status == 200 && anc.online){
                /*var url = '/js/sea-modules/swf/player.swf?roomnumber=' + anc.roomNumber + '&fn=' + anc.roomNumber + '&mtadd=/rest/site/flashs.mt';
                var url = 'http://www.kedo.tv/js/sea-modules/swf/player.swf?roomnumber=1105&fn=1105&mtadd=/rest/site/flashs.mt';
                $('#pl').attr("src",url);
                $("#player").show();*/
                $("#player").show();
                $(".no-live").hide();
            } else {
                $("#player").hide();
                $("#bglis").append(childBg(anc.roomNumber));
                $(".no-live").show();
            }

        }

       var childBg= function(roomnumber) {
            var liCt = new Array;
            liCt.push('<li>');
            liCt.push('<a href="{0}"></a>');
            liCt.push('<div class="noanchor-kuang">');
            liCt.push('<div class="nocnchor-k bk-color"></div>');
            liCt.push('<img src="{1}" alt="{2}">');
            liCt.push('</div>');
            liCt.push('<div class="noanchor-info">');
            liCt.push('<div class="noanchor-level anchor-level {3}"></div>');
            liCt.push('<div class="noanchor-name">{4}</div>');
            liCt.push('<div class="clear"></div>');
            liCt.push('<div class="noanchor-num">{5}</div>');
            liCt.push('</div>');
            liCt.push('</li>');
            var content = new Array;
            $.ajax({
                type : "post",
                url : "/rest/site/ats.mt",
                data : "roomNumber=" + roomnumber,
                async : false,
                success : function(data) {
                    if (data.resultStatus == 200 && data.data != null) {
                     //   data.data.forEach(function(e) {
                            $.each(data.data, function(i, e) {
                            var $s = liCt.join("");
                            var $nums = stringFormat("{0} 在线", e.numbers)
                            if (e.numbers == 0)
                                $nums = " 离线";
                            var ps = stringFormat($s, e.roomNumber, e.image, decodeURIComponent(e.nickName), e.levelImg, decodeURIComponent(e.nickName), $nums);
                            content.push(ps);
                        });
                    }
                }
            });
            $.ajax({
                type : "post",
                url : "/rest/site/atsTime.mt",
                data : "roomNumber=" + roomnumber,
                async : false,
                success : function(data) {
                    if (data.resultStatus == 200 && data.data != null) {
                        $(".no-live-week").text(data.data[0]);
                        $(".no-live-time").text(data.data[1]);
                        $('.no-live-next').show();
                    }
                }
            });
            return content.join("");
        }
        var stringFormat =  function() {
            if (arguments.length == 0)
                return this;
            var $ = arguments[0];
            if ($ != null && $ != "") {
                for (var i = 1; i < arguments.length; i++) {
                    var vas = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                    if (arguments[i] != null) {
                        $ = $.replace(vas, arguments[i]);
                    }
                }
            }
            return $;
        }
	}

});

liveApp.filter("decode",function(){
	return function(value){
		return decodeURIComponent(value)
	}
})