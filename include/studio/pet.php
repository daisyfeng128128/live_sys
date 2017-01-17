<style>
@media only screen and (max-width:4096px){
	#Pet{		
		top : 362px;
		left : 350px;
		width : 440px;
		height : 320px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 440px;
		height : 320px; 
	}
	.petName{
		top : 320px;
		left : 0px;
		width : 440px;
	}
	.clickRect{
		top : 522px;
		left : 490px;
		width : 160px;
		height : 160px;
	}
}
@media only screen and (max-width:1920px){
	#Pet{		
		top : 362px;
		left : 350px;
		width : 440px;
		height : 320px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 440px;
		height : 320px; 
	}
	.petName{
		top : 320px;
		left : 0px;
		width : 440px;
	}
	.clickRect{
		top : 520px;
		left : 490px;
		width : 160px;
		height : 160px;
	}
}
@media only screen and (max-width:1919px){
	#Pet{		
		top : 362px;
		left : 18.2%;
		width : 440px;
		height : 320px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 440px;
		height : 320px;
	}
	.petName{
		top : 320px;
		left : 0px;
		width : 440px;
	}
	.clickRect{
		top : 520px;
		left : 490px;
		width : 160px;
		height : 160px;
	}
}

@media only screen and (max-width:1680px){
	#Pet{		
		top : 400px;
		left : 268px;
		width : 385px;
		height : 280px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 385px;
		height : 280px;
	}
	.petName{
		top : 280px;
		left : 0px;
		width : 385px;
	}
	.clickRect{
		top : 540px;
		left : 390px;
		width : 140px;
		height : 140px;
	}
}

@media only screen and (max-width:1448px){
	#Pet{		
		top : 280px;
		left : 240px;
		width : 330px;
		height : 240px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 330px;
		height : 240px; 
	}
	.petName{
		top : 240px;
		left : 0px;
		width : 330px;
	}
	.clickRect{
		top : 400px;
		left : 355px;
		width : 120px;
		height : 120px;
	}
}

@media only screen and (max-width:1284px){
	#Pet{		
		top : 250px;
		left : 240px;
		width : 275px;
		height : 200px;
	}
	#PetSwf{
		top : 0px;
		left : 0px;
		width : 275px;
		height : 200px; 
	}
	.petName{
		top : 200px;
		left : 0px;
		width : 275px;
	}
	.clickRect{
		top : 350px;
		left : 327px;
		width : 100px;
		height : 100px;
	}
}
	#Pet{
		position : absolute;
		z-index : 800;
		pointer-events : none;
	}
	#PetSwf{
		position : absolute;
		z-index : 801;
	}
	.petName{
		position : absolute;
		z-index : 802;
		text-align : center;
		color : #ffffff;
	}
	.clickRect{
		position : absolute;
		cursor : pointer;
		z-index : 803;
	}
	.pet-opt-ui{
		position : absolute;
		display : none;
		font-family : "Microsoft YaHei";
		z-index : 804;
		background: url("/images/pet/board.png") no-repeat;
			
		width : 345px;
		height : 230px;
	}
	.pet-opt-ui button{
		outline : 0;
		border : none;
		cursor : pointer;
	}
	.pet-opt-ui-title{
		position: absolute;
		line-height : 20px;
		text-align : center;
		color : #2f241d;
		font-weight : bold;
		font-size : 14px;
		
		left : 85px;
		top : 7px;
		width : 167px;
		height : 20px;
	}
	.pet-opt-ui-closeBtn{
		position: absolute;
		background: url("/images/pet/close.png") no-repeat;
		
		left : 313px;
		top : 15px;
		width : 21px;
		height : 14px;
	}
	.pet-opt-ui-changenameBtn{
		position: absolute;
		background: url("/images/pet/edit.png") no-repeat;
		
		top : 62px;
		left : 137px;
		width : 15px;
		height : 14px;	
	}
	.pet-opt-ui-trainBtn{
		position: absolute;
		background: url("/images/pet/xunlian.png") no-repeat;
		
		top : 84px;
		left : 254px;	
		width : 46px;
		height : 31px;
	}
	.pet-opt-ui-trainBtn-disable{
		position: absolute;
		background: url("/images/pet/xunlian_disable.png") no-repeat;
		
		top : 84px;
		left : 254px;
		width : 46px;
		height : 31px;
	}
	.pet-opt-ui-helpBtn{
		position: absolute;
		background: url("/images/pet/help.png") no-repeat;
		
		top : 92px;
		left : 186px;
		width : 15px;
		height : 15px;
	}
	.pet-opt-ui-changename-confirmBtn{
		position: absolute;
		background: url("/images/pet/save.png") no-repeat;
		
		top : 66px;
		left : 137px;
		width : 20px;
		height : 10px;
	}
	.pet-opt-ui-changename-cancelBtn{
		position: absolute;
		background: url("/images/pet/cancel.png") no-repeat;
		
		top : 66px;
		left : 166px;
		width : 20px;
		height : 10px;	
	}
	.pet-opt-ui-hpTxt{
		position: absolute;
		left : 65px;
		top : 119px;
		width : 20px;
		height : 14px;
		font-size : 14px;
		font-weight : bold;
		color : #a21d1a;
	}
	.pet-opt-ui-powerTxt{
		position: absolute;
		left : 171px;
		top : 119px;
		width : 20px;
		height : 14px;
		font-size : 14px;		
		font-weight : bold;
		color : #a21d1a;
	}
	.pet-opt-ui-petNameInput{
		position: absolute;
		left : 23px;
		top : 56px;
		width : 100px;
		height : 13px;
		font-size : 12px;	
		text-align:center;			
		color : #dad1c8;
		background-color: transparent;
		border : none;
		outline : 0;
	}
	.pet-opt-ui-petlevelBar{
		position: absolute;
		left : 59px;
		top : 93px;
		width : 118px;
		height : 12px;
		background: url("/images/pet/jingyantiao.png") no-repeat;
		max-width : 118px;
	}
	.pet-opt-ui-level{
		position: absolute;
		left : 38px;
		top : 94px;
		width : 20px;
		height : 11px;
		line-height : 11px;
		color : #1f1614;
		font-weight : bold;
		font-size : 11px;
	}
	.pet-opt-ui-trainGap{
		position: absolute;
		left : 230px;
		top : 120px;
		width : 100px;
		height : 11px;
		line-height : 11px;
		color : #1f1614;
		font-weight : bold;
		font-size : 11px;
		text-align : center;
	}
	.pet-opt-ui-trainCountleft{
		position: absolute;
		left : 230px;
		top : 120px;
		width : 100px;
		height : 11px;
		line-height : 11px;
		color : #1f1614;
		font-weight : bold;
		font-size : 11px;
		text-align : center;
	}
	.pet-opt-ui-expText{
		position: absolute;
		left : 59px;
		top : 93px;
		width : 118px;
		height : 12px;
		line-height : 12px;
		color : #f2ebe4;
		font-size : 12px;
		text-align : center;
	}
	.pet-opt-ui-helpTip{
		position : absolute;
		display : none;
		font-family : "Microsoft YaHei";
		z-index : 820;
		background: url("/images/pet/help_board.png") no-repeat;
			
		width : 154px;
		height : 104px;
	}
	#pet-opt-ui-helpTip-textArea{
		position: absolute;
		left : 4px;
		top : 4px;
		width : 146px;
		height : 96px;
		line-height : 15px;
		color : #ffffff;
		font-size : 12px;
		background-color: transparent;
		border : 0;
	}
	.pet-opt-ui-nameTag{
		position : absolute;
		background: url("/images/pet/bg_nameTag.png") no-repeat;
		
		top : 50px;
		left : 22px;
		width : 112px;
		height : 27px;
	}
	.pet-opt-ui-nameTag-Edit{
		position : absolute;
		background: url("/images/pet/bg_nameTag_edit.png") no-repeat;
		
		top : 51px;
		left : 23px;		
		width : 110px;
		height : 25px;
		
		display : none;
	}
	
</style>
<!--宠物部分  开始-->
<div id = "Pet" class="Pet">
    <div id="PetSwf" class = "PetSwf"></div>
    <div id="petName" class = "petName"></div>   
</div>
<div id="clickRect" class = "clickRect"></div>
<div class = "pet-opt-ui">
	<span id = "pet-opt-ui-title" class = "pet-opt-ui-title">熊宝宝</span>
	<button id = "pet-opt-ui-closeBtn" class = "pet-opt-ui-closeBtn"></button>
	<div id = "pet-opt-ui-nameTag" class = "pet-opt-ui-nameTag"></div>
	<div id = "pet-opt-ui-nameTag-Edit" class = "pet-opt-ui-nameTag-Edit"></div>
	<input id = "pet-opt-ui-petNameInput" class = "pet-opt-ui-petNameInput" type="text" readOnly = "true" value="精通css的龙基基" />
	<span id = "pet-opt-ui-level" class = "pet-opt-ui-level">999</span>
	<button id = "pet-opt-ui-changenameBtn" class = "pet-opt-ui-changenameBtn"></button>
	<button id = "pet-opt-ui-changename-confirmBtn" class = "pet-opt-ui-changename-confirmBtn"/>
	<button id = "pet-opt-ui-changename-cancelBtn" class = "pet-opt-ui-changename-cancelBtn"/>
	<button id = "pet-opt-ui-helpBtn" class = "pet-opt-ui-helpBtn"></button>
	<button id = "pet-opt-ui-trainBtn" class = "pet-opt-ui-trainBtn"></button>
	<span id = "pet-opt-ui-trainGap" class = "pet-opt-ui-trainGap">训练中...剩余30s</span>
	<span id = "pet-opt-ui-trainCountleft" class = "pet-opt-ui-trainCountleft">还可以训练5次</span>
	<span id = "pet-opt-ui-hpTxt" class = "pet-opt-ui-hpTxt">9999999</span>
	<span id = "pet-opt-ui-powerTxt" class = "pet-opt-ui-powerTxt">99999999</span>
	<div id = "pet-opt-ui-petlevelBar" class = "pet-opt-ui-petlevelBar"></div>
	<span id = "pet-opt-ui-expText" class = "pet-opt-ui-expText">99999999</span>
</div>
<div id = "pet-opt-ui-helpTip" class = "pet-opt-ui-helpTip">
	<textarea id = "pet-opt-ui-helpTip-textArea" class = "pet-opt-ui-helpTip-textArea"></textarea>
</div>
<!--宠物部分  结束-->