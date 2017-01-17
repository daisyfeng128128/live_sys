var oSongDetail=document.getElementById("song_detail");
var oAddedList=document.getElementById("added_list");
var oAddUser=document.getElementById("add_user");
window.onload=function(){
	var oSet=document.getElementById("setting");
	var oPop=document.getElementById("pop");
	var oClose=document.getElementById("close");
	var oShadow=document.getElementById("shadow");
	var oSave=document.getElementById("save");
	var oAppear=document.getElementById("appear");
	var oUserAdd=document.getElementById("user_add");
	
	
	oSet.onclick=function(){
		oPop.style.display="block";
		oPop.style.zIndex="999";
		oShadow.style.display="block";
		oSet.style.background="#ffab03";
		 
			//�༭����
		WIO.getNotice({},function(data){
			data = jQuery.parseJSON(data);
			if(data != null&& data.id != undefined){
				document.getElementById("id").value=data.id;
				document.getElementById("notice").value=data.notice;
			}
		});
		 
		
	};
	
	oSave.onclick=function(){
		var oNotice=document.getElementById("notice").value;
		var oId= document.getElementById("id").value;
		//���湫��
		WIO.sendNotice({id:oId,notice:oNotice},function(data){
			console.log("���湫�棺"+data);
		});
		
		

	};
	
	oClose.onclick=function(){
		oPop.style.display="none";
		oShadow.style.display="none"
		oSet.style.background="#ffab03";
	
	};
	
	var oAddBtn=document.getElementById("add_btn");
	var oManaShadow=document.getElementById("mana_shadow");
	var oManaClose=document.getElementById("mana_close");


	var oInfo=document.getElementById("info");
	var aInfo=oInfo.children;
	var Onms=document.getElementById("noti_mana_song");
	var aAnchor=Onms.children;
	var oSearchBtn=document.getElementById("search_btn");
	var oUserAdd=document.getElementById("user_add"); 
	var oAddUser=document.getElementById("add_user");

	for(var i=0;i<aAnchor.length;i++){
		aAnchor[i].index=i;
		aAnchor[i].onclick=function(){
			for(var i=0;i<aAnchor.length;i++){
				aAnchor[i].className="";
				aInfo[i].style.display="none";
			}
			this.className="active";
			aInfo[this.index].style.display="block";
			
			
		};
	
	}
	
	oAddBtn.onclick=function(){
		oManaShadow.style.display="block";
	 
	};
	oAddUser.onclick=function(){
		oManaShadow.style.display="block";
	 
	};
	
	oManaClose.onclick=function(){
		oManaShadow.style.display="none"; 
	};
	
	
	aAnchor[1].onclick=function(){
		
		for(var i=0;i<aAnchor.length;i++){
				aAnchor[i].className="";
				aInfo[i].style.display="none";
		}
		this.className="active";
		aInfo[1].style.display="block";
		
		/** �������ù���  �Ȳ��ҹ����б� */
		getRoomMan();
		 
	};
	oSearchBtn.onclick=function(){
		var userId = $("#userId").val();
		//�����û�
		WIO.getUser({userid : userId},function(data){
			data = jQuery.parseJSON(data);
			if(data != null && data.userid != undefined){
					$("#idNum").html(data.userid);
					$("#userName").html(data.nickName); 
					$("#userImg").attr('src',"/apis/avatar.php?uid="+data.userid);  
			}
			oAppear.style.display="block";
			oSearchBtn.style.display="none";
		}); 
	}
		
	
	
	oUserAdd.onclick=function(){
		var userid = $("#idNum").html(); 
		//��ӹ���
		
		WIO.addRoomMan({userid : userid},function(data){
			data = jQuery.parseJSON(data);
			if(data != null && data.resultMessage == "success"){
				oManaShadow.style.display="none";
				getRoomMan(); 
			}
			var oUserId=document.getElementById("userId");
			oUserId.value="";
			oSearchBtn.style.display="block";
			oAppear.style.display="none";
			oManaShadow.style.display="none";
			
		}); 
	};

	
	/** �������ù���  �Ȳ��ҹ����б� */
	var getRoomMan =function(){
				WIO.getRoomMan({},function(data){
					data = jQuery.parseJSON(data);  
					var html ="";
					if(data != null  && data.length  > 0){
						oAddUser.style.display="block";
						$("#no_added").hide();
						$("#added").show(); 
						$.each(data,function (index,$data){
							html+='<li class="clearFix"> <span class="num fl">'+ (index+1) +'</span> <span class="level-bg fl"></span> <span class="name fl">'+ $data.nickName +'</span> <a href="javascript:;" onclick="delRoomMan('+$data.id+')" class="delete fl">ɾ��</a> </li>';
						});
					}
					oAddedList.innerHTML=html;
				});
		}
		
		
		
	
	 //���ϵͳ  ��Ӹ��� 
	$("#songsSave").click(function(){
		var oSongName=document.getElementById("songsName");
		var songsName = $("#songsName").val();
		//��Ӹ���
		WIO.saveSongs({singer : "",songname: songsName},function(data){
			data = jQuery.parseJSON(data);
			if(data != null && data.resultMessage=="success"){
				getSongList();
			}
			oSongName.value="";
			oSongName.focus();
			
		});
	})
	
	// ����б�
	aAnchor[2].onclick=function(){
		
		for(var i=0;i<aAnchor.length;i++){
				aAnchor[i].className="";
				aInfo[i].style.display="none";
		}
		this.className="active";
		aInfo[2].style.display="block";
		
		//��ȡ����б�
		getSongList();
		 
	}; 
	var getSongList= function(){
		WIO.songsListDetails({},function(data){
			data = jQuery.parseJSON(data);
			var html ="";
			if(data != null  && data.length  > 0){
				oAddUser.style.display="block"; 
				$.each(data,function (index,$data){ 
					html+='<li class="clearFix"> <span class="fl num">'+ (index+1) +'</span><span class="fl item">'+ $data.songname +'</span> <a href="javascript:;" onclick="delSong('+$data.songid+')" class="delete fl">ɾ��</a> </li>';
				});
				oSongDetail.innerHTML=html;
			}  
		});
	} 	
	 
};
function delRoomMan(data){
		if(data != null && data != ""){
			WIO.delRoomMan({id:data},function(data){
				data = jQuery.parseJSON(data);  
				if(data != null && data.resultMessage == "success"){  
					/** �������ù���  �Ȳ��ҹ����б� */
					WIO.getRoomMan({},function(data){
						data = jQuery.parseJSON(data);  
						var html ="";
						if(data != null  && data.length  > 0){
							oAddUser.style.display="block";
							$("#no_added").hide();
							$("#added").show(); 
							$.each(data,function (index,$data){
								html+='<li class="clearFix"> <span class="num fl">'+ (index+1) +'</span> <span class="level-bg fl"></span> <span class="name fl">'+ $data.nickName +'</span> <a href="javascript:;" onclick="delRoomMan('+$data.id+')" class="delete fl">ɾ��</a> </li>';
							});
						}else{
							oAddUser.style.display="none";
							$("#no_added").show();
							$("#added").hide(); 
						}
						oAddedList.innerHTML=html;
				});
				}
			});
		} 
	}
//ɾ������
function delSong(id){ 
	WIO.delSongs({songid : id},function(data){
		data = jQuery.parseJSON(data);
		if(data != null && data.resultMessage=="success"){
			WIO.songsListDetails({},function(data){
			data = jQuery.parseJSON(data);
			var html ="";
			if(data != null  && data.length  > 0){
				oAddUser.style.display="block"; 
				$.each(data,function (index,$data){ 
					html+='<li class="clearFix"> <span class="fl num">'+ (index+1) +'</span><span class="fl item">'+ $data.songname +'</span> <a href="javascript:;" onclick="delSong('+$data.songid+')" class="delete fl">ɾ��</a> </li>';
				});
				oSongDetail.innerHTML=html;
			}  
		});
		}
	});
}	