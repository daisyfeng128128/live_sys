//个人中心我的信箱在用
var fget=0;
var axcPager=function(len,fget){
	var perPage=20;
	var optInit={
		items_per_page: perPage,
		num_display_entries: 3,
		callback:function(pageIndex,jq){
			if(fget){
				MailBox.getLs(1+pageIndex,perPage);
			}
			fget=1;
			return false;
		},
		num_edge_entries:2,
		prev_text:'&lt;&lt; 上一页',
		next_text:'下一页 &gt;&gt;'
	};
	var pg=$('#pager');
	pg.pagination(len,optInit);
	if(len<=perPage){
		pg.hide();
	}else{
		pg.show();
	}
};
var MailBox={
	ax:function(cmd,v,cal){
		Main.getDate({url:cmd,data:v},function(data){
			if(200==data.code){
				cal(data);
			}else{
				Main.alert(data.msg);
			}
		});
	},
	comment:function(){
		if(!islogin()){return;}
		var input=$('.reviewInt'),text=$.trim(input.val()),id=input.attr('data_id'),cId=input.attr('data_cmid'),uid=input.attr('data_uid');
		if(''==text){Main.alert('写点东西吧，评论内容不能为空哦。');return false;}
		text='回复 '+$('.mmid p b').text()+text;
		Main.postDate({url:'comment/save.do',data:{content:filter(text),key:id,targetSkyId:uid,targetCommentId:cId}},function(data){
			if(200==data.code){
				Main.alert('评论成功');
				input.val('');
			}else if(80400==data.code){
				Main.alert('含有敏感字符：“'+data.body+'”');
			}else{
				Main.alert(data.msg);
			}
		});
	},
	open:function(){
		var li=$(this);
		$(this).addClass('bg-orange').siblings().removeClass('bg-orange');
		var type=$(this).attr('data_type');
		MailBox.ax('ajax/ucenter/mailview.do.php','id='+$(this).attr('data_id'),function(data){
			li.removeClass('newmaill').find('.icon-newmail').attr('class','icons icon-mail');
			if(6==type){
				$('#mailDetail').hide();
				var cmm=data.body.extendParam.comment;
				if(cmm){
					var ptxt=data.body.extendParam.reply?'回复了我的评论':'评论了我的动态',sPtxt;
					if('51ee85d3da0a052a80774099'==cmm.key){
						sPtxt='在我的“<a href="/hl_apage.html" target="_blank" class="f_o">积分换礼活动</a>”评论';
					}else{
						sPtxt=ptxt+'“<a href="u.html?'+cmm.targetSkyId+'#'+cmm.key+'&c" target="_blank" class="f_o">'+faceReplaceImg(MailBox.getLvIcon(data.body.extendParam.text))+'</a>”';
					}
					var h='<div class="colr msg-body">\
						<div class="mbdet">\
							<div class="col mtop"></div>\
							<div class="col mmid"><p><b>'+cmm.nickName+'：</b>'+faceReplaceImg(cmm.content)+'</p><p class="f_gray">'+sPtxt+'</p></div>\
							<div class="col mbot">\
								<div class="col"><span>'+data.body.createTime+'</span></div>\
								<div class="colr Handles"></div>\
							</div>\
						</div>\
						<div class="reviewbox">\
							<div class="col"><textarea data_id="'+cmm.key+'" data_cmid="'+cmm.id+'" data_uid="'+cmm.targetSkyId+'" onblur="this.className=\'reviewInt\'" onfocus="this.className=\'reviewInt hilightBox\'" class="reviewInt" value="" type="text"></textarea></div>\
							<div class="col reviewstool"><div class="col"><a class="icon smileyBtn" href=""> </a></div><div class="colr"><button class="btn_porange commhandle">评 论</button></div></div>\
							<ul class="col reviews"></ul>\
						</div>\
					</div>';
				}else{
					h='该内容已不存在';
				}
				$('#reviewMsg').html(h);
				MailBox.initViewMsg();
			}else{
				$('#reviewMsg').empty();
				$('#mailDetail').show().children('h2').html(data.body.title).end().children('blockquote').text('收信时间：'+data.body.createTime).end().children('.article-body').html(MailBox.getLvIcon(data.body.text));
			}
			Main.getMainNum(MailBox.setBtn0);
		});
		
	},
	read:function(ids,cal){
		Main.postDate({url:'ajax/ucenter/mailmarkRead.do.php',data:'ids='+ids},function(data){
			if(200==data.code){
				Main.getMainNum(MailBox.setBtn0);
				if(!ids){
					$('li.newmaill').removeClass('newmaill').find('.icon-newmail').attr('class','icons icon-mail'); 
					$('#mailList .stool span').eq(0).removeClass('link');
				}
				if(cal){cal()}
			}
		});
	},
	del:function(id,cal){
		var ids='';
		if('string'!=typeof(id)){
			var p=$(this).parents('li');
			ids=p.attr('data_id');
		}else{
			ids=id;
		}
		Main.postDate({url:'ajax/ucenter/maildelete.do.php',data:'ids='+ids},function(data){
			if(200==data.code){
				if(p){p.remove()}
				if(cal){cal()}
				Main.getMainNum(MailBox.setBtn0);
			}else{
				Main.alert(data.msg);
			}
		});
		return false;
	},
	getLvIcon:function(str){
		return str.replace(/\(level:(\d{1,})\)/g,'<em class="level lv$1"></em>').replace(/\(zlevel:(\d{1,})\)/g,'<em class="zlevel zlv$1"></em>');
	},
	getLs:function(page,pageNum,cal){
		Main.getDate({url:'ajax/ucenter/mailquery.do.php',data:{page:page||1,pageNum:pageNum||20}},function(data){
			if(200==data.code){
				var ls='';MailBox.ids=[];
				var types=['','系统通知','活动通知','升级通知','家族审核通知','VIP通知','评论'];
				for(var i=0;i<data.body.data.length;i++){
					var nCls='',nIcn='icon-mail';
					with(data.body.data[i]){
						if(!read){
							nCls='newmaill';
							nIcn='icon-newmail';
						}
						MailBox.ids.push(id);
						ls+='<li class="'+nCls+'" data_id="'+id+'" data_uid="'+fromSkyId+'" data_type="'+type+'"><span class="s0"><i class="icons '+nIcn+'"></i>'+types[type]+'</span><span class="s1"><b>'+title+'</b></span><span>'+createTime.replace(/\s.*$/,'')+'</span><span class="icons icon_close"></span></li>';
					}
				}
				$('#mailList ul').html(ls||'<span style="margin:0 0 0 20px;line-height:40px">没有信件</span>').children('li').click(MailBox.open).end().find('.icon_close').click(MailBox.del);
				$('#mailList ul li').eq(0).click();
				var b=$('#mailList .stool span').eq(1);
				if(ls){
					b.addClass('link');
					$('#mailList .toolbar').show();
				}else{
					b.removeClass('link');
					$('#mailList .toolbar').hide();
					$('#mailDetail').hide();
					$('#reviewMsg').hide();
				}
				b.off().on('click',function(){
					var $this=$(this);
					if($this.hasClass('link')){
						MailBox.del(MailBox.ids.join(','),function(){
							$this.removeClass('link');
							MailBox.getList();
						});
					}
					return false;
				});
				if(cal){cal(data)}
			}else{
				Main.alert(data.msg);
			}
		});
	},
	getList:function(){
		MailBox.getLs(1,20,function(data){
			axcPager(data.body.items,fget);
		});
	},
	setBtn0:function(){
		var b=$('#mailList .stool span').eq(0);
		if(arguments[0]){
			b.addClass('link');
		}else{
			b.removeClass('link');
		}
	},
	tools:function(){
		var b=$('#mailList .stool span').eq(0);
		b.click(function(){
			var $this=$(this);
			if($this.hasClass('link')){
				MailBox.read('',function(){
					$this.removeClass('link');
				});
			}
			return false;
		});
	},
	selectinEnd:function(esrc){
		if(isIE){
			var rtextRange=esrc.createTextRange();
			rtextRange.moveStart('character',esrc.value.length);
			rtextRange.collapse(true);
			rtextRange.select(); 
		}else{
			setTimeout(function(){
				esrc.focus();
				esrc.selectionStart=esrc.value.length;
			},0);
		}
	},
	initViewMsg:function(){
		if(MailBox.ViewMsg){return}
		MailBox.ViewMsg=true;
		$(document).on('mousedown', function(event) {
			var et=$(event.target);
			if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
				return;
			}else{
				$('.toggleBox').hide();
			}
		});
		$('.smileyBtn').live('click',function(){
			MailBox.CurInput=$('.reviewbox textarea');
			MailBox.CurInput.focus();
			var pnl=$('#faces');
			var offset=$(this).offset();
			if(''==$('#facesBd').html()){
				initFaceList(function(em){
					var limit=1000,text=MailBox.CurInput.val(),tmp=text+em;
					if(limit>=tmp.len()){
						text+=em;
					}
					MailBox.CurInput.val(text).focus();
					MailBox.selectinEnd(MailBox.CurInput[0]);
				});
			}
			pnl.css({top:offset.top+32,left:offset.left}).show();
			return false;
		});
		$('#reviewMsg button.commhandle').live('click',MailBox.comment);
		$('.reviewInt').live({
			'keypress':function(event){
				if(13==event.keyCode){
					$(this).parents('.reviewbox').find('button').click();
				}
			},
			'keyup':function(){
				var val=$(this).val(),len=val.len();
				if(300<len){
					$(this).val(val.sub(300));
				}
				var oh=$(this).attr('_height');
				if(!oh){
					$(this).attr('_height',$(this).height());
				}else{
					$(this).height(oh);
				}
				$(this).height(parseInt($(this)[0].scrollHeight));
			}
		});
	},
	init:function(){
		this.getList();
		this.tools();
	}
};
