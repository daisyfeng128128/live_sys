/*!
 * JavaScript Activity v1.1
 * Copyright (c) 2013 Rock.liuxn
 * Created: 2013-08-09
 * Last updated : 2015-01-16 15:08
 */



//全局变量
var from = "",
    jsonList = "[]",
    pageIndex = 1,
    isLogin = 0,
    datePicker = null,
    joinType = 1; 
    json = {t:0,c:[],m:[],o:[],r:[]}; 
 
var Activity = {version:"1.0"};

//Activity.Config = {
//     GetUIdx:TgBase.Util.getQueryStr('useridx'),
//     GetUId:TgBase.Util.getQueryStr('userid')  
//};

var ModuleTemplates = {
    RoomActivityList:(function(){
        var t=[];
            t.push("<div class=\"item\">");
            t.push("<a {6} title=\"{1}\"><img alt=\"{1}\" class=\"scrollLoading ad2\" src=\"{2}\"/></a>");
            t.push("<span class=\"{7}\"></span>"); 
            t.push("<span class=\"{8}\"></span>");  
            t.push("<p class=\"name\" title=\"{1}\">{3}</p>");
            t.push("<p class=\"time\">{4}</p>");
            t.push("<p id=\"btn_{0}\">{5}</p>");
            //t.push("<p>ID:{0}[{9} - {10}(共{11}天)]</p>");  //Test
            t.push("</div>");
        return t.join("");   
    })(),
    OfficialActivityList:(function(){
        var t=[];
            t.push("<div class='listcon'>");
            t.push("<div class='l_pic'>");
            t.push("<a href='{3}' target='_blank' title='{1}'><img class='scrollLoading' data-url='{0}' src='/images/activity/pixel.gif' style='background:url(/images/activity/loading.gif) no-repeat center;' width='350px' height='90px' alt=''/></a>");
            t.push("</div>");
            t.push("<div class='l_text'>");
            t.push("<ul>");
            t.push("<li>活动名称：<span class='fb f13'>{1}</span></li>");
            t.push("<li>活动时间：{2}</li>");
            t.push("<li class='pt10'><a href='{3}' target='_blank' title='点击查看详情'><img src='/images/activity/activity/more.png' border='0' /></a></li>");
            t.push("</ul>");
            t.push("</div>");
            t.push("</div>");
        return t.join("");
    })(),
    ActivityMemo:(function(){
         
    })()     
};

var proAjaxPage = {
    mode1:function(objId, pageIdx, pageSize, total){ //objId, curPage, countPage
       pageIndex = pageIdx;
       //curPage = parseInt(curPage); 
       //countPage = parseInt(countPage);
        curPage = parseInt(pageIdx);
        countPage = total % pageSize == 0 ? total / pageSize : Math.ceil(total / pageSize);   //总页数
       
       var strHtml = '', prevPage = curPage - 1, nextPage = curPage + 1;
        strHtml +='<ul class="pagemode">'; 
		if (prevPage < 1) 
		{
			strHtml += '<li><span  title="首页">首页</span></li>';
			strHtml += '<li><span title="上一页">上一页</span></li>';
		} 
		else 
		{
			strHtml += '<li><a class="charhover" href="javascript:toPage('+objId+',1);" title="首页">首页</a></li>';
			strHtml += '<li><a class="charhover" href="javascript:toPage('+objId+','+prevPage+');" title="上一页">上一页</a></li>';
			
		}
		if (curPage != 1) strHtml += '<li><a href="javascript:toPage('+objId+',1);"title="第1页">1</a></li>';
		if (curPage >= 5) strHtml += '<li>...</li>';
		if (countPage > curPage + 2) {
			var endPage = curPage + 2;
		} else {
			var endPage = countPage;
		}
		for (var i = curPage - 2; i <= endPage; i++) {
			if (i > 0) {
				if (i == curPage) {
					strHtml += '<li><span class="current" title="第'+i+'页">' + i + '</span></li>';
				} else {
					if (i != 1 && i != countPage) {
						strHtml += '<li><a href="javascript:toPage('+objId+','+i+');" title="第'+i+'页">' + i + '</a></li>';
					}
				}
			}
		}
		if (curPage + 3 < countPage) strHtml += '<li>...</li>';
		if (curPage != countPage) strHtml += '<li><a href="javascript:toPage('+objId+','+countPage+');" title="第'+countPage+'页">' + countPage + '</a></li>';
		if (nextPage > countPage) {
		    strHtml += '<li><span title="下一页">下一页</span></li>';
			strHtml += '<li><span title="末页">末页</span></li>';
			
		} 
		else 
		{
		    strHtml += '<li><a class="charhover" href="javascript:toPage('+objId+','+nextPage+');" title="下一页">下一页</a></li>';
			strHtml += '<li><a class="charhover" href="javascript:toPage('+objId+','+countPage+');" title="末页">末页</a></li>';
		}
        strHtml +='</ul>';   
        return strHtml;
    }
};

function toPage(objId,pageidx){
    Activity.GetRoomInfo(objId,pageidx); 
    window.scrollTo(0, TgBase.Util.getTop('a_tab_0'));  
};


 Activity = {
    Config: {
         GetUIdx:TgBase.Util.getQueryStr('useridx'),
         GetUId:TgBase.Util.getQueryStr('userid')
    }, 
    // type = 0:我的活动 1: 房间活动预告, 2:房间历史活动, 3:官方活动预告, 4:官方历史活动
    GetRoomInfo:function(type,pageidx,actype){
        $('#d_activitylist').html(""); 
        Timer.Clear();  
        var api = "",
        pagesize = 20,
        atype = 1;   
        pageidx = pageidx||1; 
        actype = actype||0; 
        switch(type){
            case 0:
                api = "../Apps/Activity.ashx?act=2";   
                break; 
            case 1:
                api = "../Apps/Activity.ashx?act=1&type=1";   
                break; 
            case 2:
                api = "../Apps/Activity.ashx?act=1&type=2";  
                break;    
            case 3:
                api = "../Apps/Activity.ashx?act=5&type=1";  
                atype = 2; 
                break; 
            case 4:
                api = "../Apps/Activity.ashx?act=5&type=2";  
                atype = 2; 
                break;                                                                
        }  
        $.ajax({
                    type: "POST",
                    url: api,
                    dataType:"json", 
                    data: {actype:actype,pageidx:pageidx,pagesize:pagesize,from:from,uidx:Activity.Config.GetUIdx,platform:'client'},
                    beforeSend: function () {
                        $.blockUI({
                            message: "<img src='/images/activity/loading.gif'/>"
                        });
                    },
                    success: function(d) {
                        
                        if(d.ret>0){                          
                            (type!=3&&type!=4)&&(json.r = d.list);
                            
                            var aId = TgBase.Util.getQueryStr("aid");
                            var idx = -1;
                            
                            var html = [], len = d.list.length; 
                            if(len>0){ 
                                for(var i =0;i<len;i++){
                                   html.push(Activity.getTemplates(atype,d.list[i],i));
                                }
                            }else{
                                var cn = type==0?'null2':'null';
                                html.push('<p class="'+cn+'">暂无活动！</p>');
                            } 
                            var page = "";    
                            if(d.count > 20){
                                page = proAjaxPage.mode1(type,pageidx,pagesize,d.count);  
                            }                           
                           $('#d_activitylist').html(html.join('') + page); 
                                                                          
                           showInfoByAId(aId,idx);
                           
//                           if(type==0 || type==1){
//                                Timer.Set(60,function(){
//                                     Activity.createListHtml(jsonList);
//                                });
//                           }
                           Activity.ScrollLoading();	
                            
                        }else if(d.ret==-1){
                            showMsg("系统错误，请稍候再试！");                                            
                        }else if(d.ret==-2){
                            showLoginBox();
                        }
                    }
           });      
           
    },
    // 获取备忘录+日历+房间/官方活动 type=1: 全部, 2:日历, 4:备忘录/房间/官方活动
    GetDefaultInfo:function(type,date){
        Timer.Clear(); 
        var d = new Date(), year, month;  
        date = date||[d.getFullYear(),add0(d.getMonth()+1),add0(d.getDate())].join('-');
        year = date.split('-')[0]; month = date.split('-')[1];
        (type==1||type==4)&&$('#d_activitylist').html(""); 
        var api = "/ajax/activity.php";
        $.ajax({
                    type: "POST",
                    url: api,
                    dataType:"json", 
                    data:{type:type,date:date,from:from},
                    success: function(d) {
                        if(d.ret>0){                          
                            isLogin = d.islogin;
                            var aId = TgBase.Util.getQueryStr("aid");
                            var idx = -1;
                            var _c=[], _m=[], _o=[], _r=[];
                            (type==1)&&(json.c = _c = d.calendar||[]);
                            (type==1||type==4)&&(json.m = _m = d.memo||[]);
                            (type==1||type==4)&&(json.o = _o = d.official||[]);
                            (type==1||type==4)&&(json.r = _r = d.room||[]);
                            var len_c = _c.length, len_m = _m.length, 
                            len_o = _o.length, len_r = _r.length;
                            var m1 = [], m2 = [], m3 = [], m3_1 = []; 
                            if (len_o>0) {
                                for(var i =0;i<len_o;i++){
                                    var o = _o[i]; 
//                                    if (o.stardate == date) {
                                        m3.push(Activity.getTemplates(2,o,i));
//                                    }else{
//                                        m3_1.push(Activity.getTemplates(2,o,i));
//                                    } 
                                }
                            }
                            if(len_r>0){ 
                                for(var i =0;i<len_r;i++){                              
                                    var o =  _r[i];
                                    o.isjoin == "1"&&_m.push(o);  
                                    m3.push(Activity.getTemplates(1,o,i));
                                }
                                json.m = _m;  
                           }  
//                           if (m3_1.length > 0) {
//                                m3.push(m3_1.join('')); 
//                           }                            
////                           if(type==1||type==3)
////                                Activity.LoadMemo();
                           if (type==1||type==2) {
                                  !!datePicker ? 
                                  (datePicker.config.jointime=_c,
                                   datePicker.config.year = year,
                                   datePicker.config.month = month,
                                   datePicker.initDatePicker()) : 
                                  datePicker = new DatePicker('d_calendar', {
                                        inputId : 'd_calendar',
                                        jointime : _c 
                                    });                                   
                           }
                           $('#d_now').show();
                           if (type==1||type==4) {
                                Activity.LoadMemo();
                                if (m3.length>0) {
                                     $('#d_activitylist').html(m3.join('')); 
                                }else{
                                      $('#d_activitylist').html('<p class="null">暂无活动！</p>');
                                }
                                
                           }                                                  
//                           if(type==0 || type==1){
//                                Timer.Set(60,function(){
//                                     Activity.createListHtml(jsonList);
//                                });
//                           }
                           
                           Activity.ScrollLoading();	
                            
                        }else if(d.ret==-1){
                            showMsg("系统错误，请稍候再试！");                                            
                        }else if(d.ret==-2){
                            showLoginBox();
                        }
                    }
           });      
           
    },    
    getTemplates:function (t,o,i) {
        var html = ""; 
        switch(t) {
            case 1:
                json.t = 1; 
                html = ModuleTemplates.RoomActivityList.format(o.id,o.activename,o.imageurl,TgBase.Util.getCutString(o.activename,30),getTimeModule(i),getBtnModule(i),"href=\"javascript:void(0);\" onclick=\"Activity.Show(1,"+o.id+","+i+")\"", (o.reward)?"arrow1":"", (o.activetype==1)?"yuan":"", o.startdate,o.enddate,o.activeday); //Test  
        	    break;
            case 2:
                html = ModuleTemplates.RoomActivityList.format(o.id,o.name,o.picurl,TgBase.Util.getCutString(o.name,30),o.stardate+"起","<a title=\"查看详情\" class=\"btn btn_detail\" href=\""+o.linkurl+"\" target=\"_blank\" hidefocus=\"true\">查看详情</a>", "href=\""+o.linkurl+"\"  target=\"_blank\"",o.stardate,o.enddate,0); 
        	    break;
        }         
        return html;
    },
    // 加载活动备忘录 
    LoadMemo:function(pIdx) {
        var now = $('#d_now'); 
        var u1 = now.find('.list ul:eq(0)'),
        u2 = now.find('.list ul:eq(1)'),
        u3 = now.find('.page ul'),
        len = json.m.length;
        if (isLogin) {
            u1.show().siblings().hide();
        }else{
            u2.show().siblings().hide();
        } 
       u3.html(""); 
        var h1 = [], h2 = []; 
        if (len>0) {
             var total = len, pageSize = 3, curPage = parseInt(pIdx)||1;          
             var countPage = total % pageSize == 0 ? total / pageSize : Math.ceil(total / pageSize);   //总页数
             var rowbegin = Math.ceil((curPage - 1) * pageSize), rowend = Math.ceil(curPage * pageSize);
             if (rowend > total)
                 rowend = total;               
                
             for(var i = rowbegin; i < rowend; i++){
                  var o = json.m[i];
                  //var h = [];
                  h1.push('<li><a href="javascript:void(0);" onclick="Activity.Show(2,'+o.id+','+i+')"><p class="et">'+TgBase.Util.getCutString(o.activename,20)+'</p><p class="time">'+o.startdate+'</p></a></li>');  
             }
             
             for(var i =0;i<countPage;i++){
                if ((i+1)==curPage) {
                     h2.push('<li><a class="sel"></a></li>'); 
                }else{
                    h2.push('<li><a href="javascript:void(0);" onclick="Activity.LoadMemo('+(i+1)+');"></a></li>');  
                }
             }
             u1.removeClass('null').html(h1.join(''));
             u3.html((isLogin && total>3 && h2.join(''))).parent().show();
        }else{
            u1.addClass('null').html('<li><span>今日暂未报名！</span></li>');    
        }
          
    },
    createListHtml:function(json){
        var html = "", i=0; 
        if(json.length>0){ 
            json.foreach(function(o){                           
                html += ModuleTemplates.RoomActivityList.format(o.id,o.activename,o.imageurl,TgBase.Util.getCutString(o.activename,30),getTimeModule(i),getBtnModule(i),i,o.startdate,o.enddate,o.activeday); //Test
                //html += ModuleTemplates.RoomActivityList.format(o.id,o.activename,o.imageurl,TgBase.Util.getCutString(o.activename,30),getTimeModule(i),getBtnModule(i),i);
                i++;  
            })
       }else{
            Timer.Clear();
       }
       $('#d_activitylist').html(html);   
       Activity.ScrollLoading();
    }, 
    // 报名活动 
    Join:function(actId,date,actype){   
        $.ajax({
                    type: "POST",
                    url: "../Apps/Activity.ashx?act=3",
                    dataType:"json", 
                    data: {actid:actId,from:from,actype:actype,uidx:Activity.Config.GetUIdx,platform:'client'},
                    beforeSend: function () {
                        $.blockUI({
                            message: "<img src='/images/activity/loading.gif'/>"
                        });
                    },
                    success: function(d) {
                        
                        if(d.ret==1){                          
                            showMsg("恭喜您，报名成功！");  
                            //$("#btn_"+actId).html("<a class=\"btn btn_ed\" title=\"已报名\" onclick=\"\"></a>");      
                            //Activity.GetRoomInfo(0,pageIndex); 
//                            joinType == 1 && Activity.GetDefaultInfo(1,date);
//                            joinType == 2 && Activity.GetRoomInfo(1);           
                            if (joinType==2) {
                                Activity.GetRoomInfo(1);
                            }else if (actype == 2) {
                                Activity.GetRoomInfo(1,1,actype);
                            }else if(joinType==1){
                                Activity.GetDefaultInfo(1,date);
                            }
                            
                        }else if(d.ret ==0){
                            showMsg("您已经报名该活动！");                                        
                        }else if(d.ret ==-1){
                            showMsg("系统错误，请稍候再试！");                                            
                        }else if(d.ret==-2){
                            showLoginBox();
                        }else if(d.ret==-3){
                            showMsg("请先完善资料后再报名！");  
                            window.open(decodeURIComponent(d.url));
                        }
                    }
           });        
    },
    // 客户端进入房间 
    Go:function(roomIdx){
        if(from){ 
            $.ajax({
                        type: "POST",
                        url: "../Apps/Room.ashx",
                        dataType:"json", 
                        data: {act:1,roomidx:roomIdx,from:from},
                        beforeSend: function () {
                            $.blockUI({
                                message: "<img src='/images/activity/loading.gif'/>"
                            });
                        },
                        success: function(d) {
                            
                            if(d.ret==1){                    
                                if(d.fun==null||d.fun==""){
                                    showMsg("获取房间信息失败，请稍候再试！");
                                }else{
                                    eval(d.fun);
                                }        
                            }else if(d.ret ==-1){
                                showMsg("系统错误，请稍候再试！");                                            
                            }else if(d.ret==-2){
                                showLoginBox();                                           
                            }
                        }
               }); 
         }else{
              window.open(TgBase.Com.Link.Site+"/"+roomIdx);
         }
    },
    // 显示活动详情 
    Show:function(type,actId,idx){
       var _d = [];  
        type==1&&(_d=json.r);
        type==2&&(_d=json.m);   
        if(_d.length>0){  
            
            var d = _d[idx]; 
            if(actId == d.id){ 
               var ishow = "display:block;";
               json.t = type; 
               var status =  getActivityStatus(d.startdate,d.enddate), _r = !d.reward?"0|0|0":("1|"+d.reward), ary = _r.split('|');
               if(status == -1){
                     ishow = "display:none;"
               } 
               $("#d_layout").find(".name").html(d.activename).end()
               .find(".time").html(getTimeModule(idx)+"&nbsp;&nbsp;"+getUserNumModule(idx)).end()
               .find(".num").html("<i>"+d.roomidx+"</i>房间").end()
               .find(".text").html(TgBase.Util.getCutString(d.content,240)).end()
               .find(".join_btn").html(getBtnModule(idx)).end()
               .find(".bg1 > img").attr("src",d.imageurl).end()
               .find(".jiathis_style").attr("style",ishow).end()
               .find(".award li").each(function (i) {
                     ary[i] == "1" ? $(this).show() : $(this).hide();
                });
               
               $('#hide_aid').val(d.roomidx);  
                 
                $.blockUI({ message: $('#d_layout'), 
                    css: {
                        width:'600px',
                        height:'400px', 
                        left: ($(window).width() - 600) / 2 + 'px',
                        top: ($(window).height() - 400) / 2 + 'px',
                        textAlign:'left'
                    },          
                    overlayCSS: {opacity:0.4} 
                });      
                $('.blockOverlay').attr('title','单击关闭').click($.unblockUI);  
                $('.close').click($.unblockUI);   
               
           }else{
               showMsg("获取活动信息失败！");
           }  
           
     
       }else{
            showMsg("请刷新页面后重试！");
       }  
    },
    CloseDeatil:function(){      
       $("#d_layout").hide(); 
       
       //TgBase.UI.closeMask(); 
    },
    ScrollLoading:function(){
       // $(".scrollLoading").scrollLoading(); 
    }   
    
}

var Timer = {
    Cont:null,
    Set:function(s,callback){  // 时间(秒)，回调函数
        this.Clear();
        Timer.Cont = setInterval(callback,1000*s);
    },
    Clear:function(){
        if(Timer.Cont){
            clearInterval(Timer.Cont);
        }         
    } 
}

// 按钮模块
function getBtnModule(idx){ //id,roomidx,status,isjoin
    var btn = "", _d = []; 
    json.t == 1 && (_d = json.r);    
    json.t == 2 && (_d = json.m); 
    if(_d.length>0){  
        var d = _d[idx]; 
        var status =  getActivityStatus(d.startdate,d.enddate);
        switch(status){
            case 0:  
            case 2: 
                if(d.isjoin=="1")
                    btn = "<a class=\"btn btn_ed\" title=\"已报名\" onclick=\"\"></a>";
                else
                    btn = "<a href=\"javascript:void(0);\" class=\"btn btn_go\" title=\"报名\" onclick=\"Activity.Join("+d.id+",'"+d.startdate.slice(0,10)+"',"+d.activetype+")\"></a>";       
                break;
            case 1:  
                btn = "<a href=\"javascript:void(0);\" class=\"btn btn_in\" title=\"进入\" onclick=\"Activity.Go("+d.roomidx+")\"></a>";
                break;
            case -1:  
                btn = "<a title=\"己结束\" class=\"btn btn_end\" >己结束</a>";
                break;                                             
        }         
   } 
   return btn;
}
// 时间模块
function getTimeModule(idx){   //status,time
    var ret = "", _d = []; 
    json.t == 1 && (_d = json.r);    
    json.t == 2 && (_d = json.m); 
    if(_d.length>0){  
        var d = _d[idx];  
        var status =  getActivityStatus(d.startdate,d.enddate);
        switch(status){
            case 1:  
                ret = '<span class="clock">'+getDateDiffTxt(d.startdate)+'</span>';
                break;
            default:
                var date = new Date(d.startdate.replace(/\-/g, "/")); 
                ret = add0(date.getMonth()+1)+"月"+add0(date.getDate())+"日 "+add0(date.getHours())+":"+add0(date.getMinutes())+"开始";
                break;                              
        }        
   } 
   return ret;

}
// 人数模块
function getUserNumModule(idx){
    var ret = "", _d = []; 
    json.t == 1 && (_d = json.r);    
    json.t == 2 && (_d = json.m); 
    if(_d.length>0){  
        var d = _d[idx]; 
        var status =  getActivityStatus(d.startdate,d.enddate);
        switch(status){
            case 0:  
            case 2:  
                ret = '【报名人数：<i>'+d.joinnum+'</i>人】';
                break;
            case 1:  
                ret = '【在线人数：<i>'+d.onlinenum+'</i>人】';
                break;   
            case -1:  
                ret = '【参与人数：<i>'+d.joinnum+'</i>人】';
                break;                                              
        }         
   } 
   return ret;
}
// 获取当前活动状态
function getActivityStatus(startTime, endTime){
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
	var nTime = new Date(); //当前时间    
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间
	var stTemp = new Date(nTime.getFullYear()+'/'+add0(nTime.getMonth()+1)+'/'+add0(nTime.getDate())+' '+add0(sTime.getHours())+':'+add0(sTime.getMinutes())+':'+add0(sTime.getSeconds()));
	var etTemp = new Date(nTime.getFullYear()+'/'+add0(nTime.getMonth()+1)+'/'+add0(nTime.getDate())+' '+add0(eTime.getHours())+':'+add0(eTime.getMinutes())+':'+add0(eTime.getSeconds()));
	var iRet = 0; //活动状态
	
	if(nTime < sTime){
	    iRet = 0;  // 未开始
	}else if(sTime < nTime && nTime < eTime){
	    if(nTime >= stTemp && nTime < etTemp){
	        iRet = 1;  // 进行中
	    }else{
	        iRet = 2;  // 活动已经进行，但未开始
	    }  
	}else if(eTime < nTime){
	    iRet = -1; // 已结束	    
	}    
    return iRet;
}

function getDateDiffTxt(time){
    var day = getDateDiff(time, getNowTime(), "D");
    var hour =  getDateDiff(time, getNowTime(), "H");
    var minute =  getDateDiff(time, getNowTime(), "M"); 
    var txt = "己开始 ";
    if(day>0)
        txt +=  "<i>"+day+"</i> 天";
    if(hour>0)
        txt +=  " <i>"+(hour>=24?hour-(day*24):hour)+"</i> 小时"; 
    if(minute>0)
        txt +=  " <i>"+(minute>=60?minute-(hour*60):minute)+"</i> 分钟";        

    return txt;
}


//获取当前时间
function getNowTime(time){
    var date= new Date(); 
    if(time){
        date= new Date(time.replace(/\-/g, "/")); 
    }
	var theYear=date.getFullYear();
	var theMonth=date.getMonth()+1;
	var theDay=date.getDate();
	var theHour=date.getHours();
	var theMinutes=date.getMinutes();
	var theSeconds=date.getSeconds();
	
	return theYear+'-'+add0(theMonth)+'-'+add0(theDay)+' '+add0(theHour)+':'+add0(theMinutes)+':'+add0(theSeconds);
}
function add0(num){
	if(num<10)
	{
		return "0"+num;
	}
	else
	{
		return num;	
	}
} 


// 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
// 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
// 返回精度为：秒，分，小时，天

function getDateDiff(startTime, endTime, diffType) {
	//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
	startTime = startTime.replace(/\-/g, "/");
	endTime = endTime.replace(/\-/g, "/");
	//将计算间隔类性字符转换为小写
	//diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间
	//作为除数的数字
	var divNum = 1;
	switch (diffType) {
	case "S":
		divNum = 1000;
		break;
	case "M":
		divNum = 1000 * 60;
		break;
	case "H":
		divNum = 1000 * 3600;
		break;
	case "D":
		divNum = 1000 * 3600 * 24;
		break;
	default:
		break;
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}



//打开登陆框
function showLoginBox() {
    requireDialog(function () {
        $.iframe(TgBase.Com.Link.Site + '/v2/login.aspx?rd=' + Math.random(), 700, 450);
    }); 
}

function showMsg(txt) {
    requireDialog(function () {
        $.alert(txt);
    });
}

var ishow = false;
function showInfoByAId(aId, idx){
    if(!ishow){
        ishow = true;  
        if(aId){
            if(idx >=0){ 
                setTimeout(function(){
                    Activity.Show(aId,idx);
                },500);   
           }else{
                showMsg("获取活动信息失败！");
           }
        }
    }
    
}


// 日历模块
var DatePicker = function () {
	var init = function (n, config) {
		window[n] = this;
		var self = this, now = this.today = new Date(), year = now.getFullYear(), month = now.getMonth() + 1;
		this.n = n;
		this.config = config;
		this.D = new Date;
		this.el = $('#d_calendar');
		this.el.y = this.el.find('.month span:eq(0)');
		this.el.m = this.el.find('.month span:eq(1)');
		this.el.list = this.el.find('.calendar_list ul');
		this.selectday = "";
		//this.el.title = '查看当天活动';
		this.el.find('.title a').each(function (i) {
		    $(this).click(function () {
		         self.monthEvent(null, (i==0?-1:1));
		    })
		})		
		this.initCalendar(year,month);
		this.bindEvent();
	};
	var calendar = function(date){
	    this.date = date ? new Date(+date) : new Date;
    };
    calendar.prototype = {
	    getMonthFirstDate: function(){
		    var date = new Date(+this.date);
		    date.setDate(1);
		    return date;
	    },
	    getCalendarFirstDate: function(isSundayFirst){
		    var date = this.getMonthFirstDate(), day = date.getDay();
		    date.setDate(date.getDate() - (isSundayFirst ? day : day == 0 ? -6 : (day - 1)));
		    return date;
	    }
    };
	init.prototype = {
		initCalendar : function (year,month) {			
			var _this = this, $el = this.el;
		    var joindate = {};
		    $.each(_this.config.jointime, function(_, key){
			    joindate[key] = 'arrow';
		    });
		    var d = new Date(year, month - 1, 1), c = new calendar(d), firstDay = c.getCalendarFirstDate(true), t = this.today;
		    this.year = d.getFullYear();
		    this.month = d.getMonth() + 1;
		    var iterator = new Date(firstDay), rowsHtml = $.map(new Array(42), function(_, i){
			    var y = iterator.getFullYear(), m = iterator.getMonth(), d = iterator.getDate(), w = iterator.getDay();
			    var selector = [], key = 'm' + (m + 1) + 'd' + d;
			    m != month - 1 && selector.push('nextbefor');
			    d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
			    (w == 0 || w == 6) && selector.push('weekend');
			    m == month - 1 && _this.selectday == d && selector.push('select');
//			    if (y == 2013) {
				    joindate[key] && selector.push(joindate[key]);
//			    }
			    iterator.setDate(iterator.getDate() + 1);
               return '<li class="'+selector.join(' ')+'" date="'+[y, m + 1, d].join('/')+'"><a title="查看当天活动">' + d + '</a></li>'; 
		    });		    
			_this.setDatePicker(year,month);
			$el.list.html(rowsHtml.join(' '));
		},
		initDatePicker: function () { 
		   var year = this.el.y.html(), month = this.el.m.html();
		   this.initCalendar(parseInt((this.config.year||year),10),parseInt((this.config.month||month),10));
		},
		setDatePicker: function (year,month) {
		    this.el.y.html(year);
			this.el.m.html(month);
		},
		monthEvent : function (y,m) {
//		    var D = this.D;
//            y && D.setYear(D.getFullYear() + y);
//			m && D.setMonth(D.getMonth() + m);
//			var year = D.getFullYear(), month = D.getMonth() + 1;
            var year = this.el.y.html(), month = parseInt(this.el.m.html(),10);
            m  && (month = month+m);
            if(month == 0 || month == 13) return;
			this.selectday = "";
            this.initCalendar(year,month);
		},
		dayEvent : function (obj, y, m, d) {
		    var t = this.today; 
		    m != (this.el.m.html()) && this.initCalendar(y,m); 
		    $(obj).addClass('select').parent().siblings().children().removeClass('select'); 
			Activity.GetDefaultInfo(4,[y,add0(m),add0(d)].join('-'));
		},
		bindEvent : function () {
		    var self = this;
		    $('li', self.el.list).live('click', function(){
		        
			    self.el.list.find('li.select').removeClass('select');
			    var $li = $(this).addClass('select'), strDate = $li.attr('date'), d = new Date(strDate), year = d.getFullYear(), month = d.getMonth() + 1, day = d.getDate();
			    if (year != self.year) return;  
			    self.selectday = day; 
//			    if (month != self.month) {
//				    self.el.list.find('li[date="' + strDate + '"]').click();
//			    } else {
//				    self.initCalendar(year,month);
//			    }
			    month != self.month && self.initCalendar(year,month);
                Activity.GetDefaultInfo(4,[year,add0(month),add0(day)].join('-'));
		    });		    
		}
	}
	return init;
}();


function start(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike){
    Invoke.SetRegName(from);
    Invoke.SetCommandType("1");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function start2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike){
    Invoke.SetRegName(from);
    Invoke.SetCommandType("2");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startKTV(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("33");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort(ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startKTV2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("34");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startVIP(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("35");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startVIP2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("36");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startGuest(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("1098");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startGuest2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    KTVPort="9999";
    Invoke.SetRegName(from);
    Invoke.SetCommandType("1099");
    Invoke.SetKTVPort("9999");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}  

function showMenu(idx){

    for(var i=0;i<4;i++)
    {
        $("#a_tab_"+i).removeClass(getCss(i));
    }        
    $("#a_tab_"+idx).addClass(getCss(idx));
   
    function getCss(n){
        var css = ""; 
        switch(n){
            case 0:
               css = "room2_sel";
               break; 
            case 1:
               css = "room1_sel";
               break; 
            case 2:
               css = "my_sel";
               break;    
            case 3:
               css = "history_sel";
               break;                                            
        }
       return css; 
    }  
} 

function InitPage(){
    from = TgBase.Util.getQueryStr("from");
    switch(from){
        case "T":
        //default:         
            from = "T58web";
            break;
        case "K":            
            from = "9158web";
            break; 
    }

    $(document).ready(function(){
        var listobj = $('#d_list'), tabobj = listobj.find('.item_tab'), atype=0;
         
        //每日活动
        $("#a_tab_0").click(function(){
             showMenu(0);
             //$('#d_now').show();
             tabobj.hide();
             atype=0;
             joinType = 1;
             datePicker.selectday = "";
             Activity.GetDefaultInfo(1);
        });
         //我的活动 
        $("#a_tab_2").click(function(){
             showMenu(2);
             $('#d_now').hide();
             tabobj.hide();
             Activity.GetRoomInfo(0); 
             atype=0;
        });        
       //活动总览
       $("#d_tab_1").bind("mouseover",function(){
            $(".history_list").show();       
       }).bind("mouseout",function(){
            $(".history_list").hide(); 
       });  
       //活动预告
       $("#a_future").click(function(){ 
             showMenu(3);
             $('#d_now').hide();
             tabobj.show(); 
             if (atype!=1) {
                atype = 1; 
                joinType = 2;
                tabobj.find('a:eq(0)').removeClass('sel').click();
             }
                
       });  
       //历史回顾
       $("#a_past").click(function(){
             showMenu(3);     
             $('#d_now').hide();
             tabobj.show();
             if(atype!=2){
                 atype = 2;
                 tabobj.find('a:eq(0)').removeClass('sel').click();
             }
       });
       
       tabobj.find('a').each(function (i) {
           $(this).click(function () {
                 $(this).attr("class") != "sel" && atype==1 && i==0 && Activity.GetRoomInfo(1);  //房间活动预告
                 $(this).attr("class") != "sel" && atype==1 && i==1 && Activity.GetRoomInfo(3); //官方活动预告
                 $(this).attr("class") != "sel" && atype==2&& i==0 && Activity.GetRoomInfo(2);    //房间历史活动
                 $(this).attr("class") != "sel" && atype==2&& i==1 && Activity.GetRoomInfo(4);  //官方历史活动
                 $(this).addClass('sel').siblings().removeClass('sel');               
           });
       }); 
       // 活动备忘录刷新
        $('#d_now').find('.refresh').click(function () {
            var year = datePicker.el.y.html(), month = datePicker.el.m.html(), day = datePicker.selectday,
            date = day == "" ? "" : [year,month,day].join('-');
            Activity.GetDefaultInfo(4,date); 
        });        
                            
    });
   
   //Activity.GetOfficialInfo(2,1);
   //Activity.GetRoomInfo(0,1); 
   Activity.GetDefaultInfo(1);

}


