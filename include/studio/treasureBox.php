<style>
@media only screen and (max-width:4096px){
	#treasureBox_div{
		width : 125px;
		height : 164px;
	}
	#treasureBox_swf{		
		width : 125px;
		height : 164px;
	}
	#treasureBox_clickRect{
		width : 125px;
		height : 164px;
	}
	#treasureBox_text{		
		top : 164px;
		width : 125px;
	}
}
@media only screen and (max-width:1920px){
	#treasureBox_div{
		width : 125px;
		height : 164px;
	}
	#treasureBox_swf{		
		width : 125px;
		height : 164px;
	}
	#treasureBox_clickRect{
		width : 125px;
		height : 164px;
	}
	#treasureBox_text{		
		top : 164px;
		width : 125px;
	}
}
@media only screen and (max-width:1919px){
	#treasureBox_div{
		width : 125px;
		height : 164px;
	}
	#treasureBox_swf{		
		width : 125px;
		height : 164px;
	}
	#treasureBox_clickRect{
		width : 125px;
		height : 164px;
	}
	#treasureBox_text{		
		top : 164px;
		width : 125px;
	}
}
@media only screen and (max-width:1680px){
	#treasureBox_div{
		width : 110px;
		height : 143px;
	}
	#treasureBox_swf{		
		width : 110px;
		height : 143px;
	}
	#treasureBox_clickRect{
		width : 110px;
		height : 143px;
	}
	#treasureBox_text{		
		top : 143px;
		width : 110px;
	}
}
@media only screen and (max-width:1448px){
	#treasureBox_div{
		width : 93px;
		height : 123px;
	}
	#treasureBox_swf{		
		width : 93px;
		height : 123px;
	}
	#treasureBox_clickRect{
		width : 93px;
		height : 123px;
	}
	#treasureBox_text{		
		top : 123px;
		width : 93px;
	}
}
@media only screen and (max-width:1284px){
	#treasureBox_div{
		width : 82px;
		height : 108px;
	}
	#treasureBox_swf{		
		width : 82px;
		height : 108px;
	}
	#treasureBox_clickRect{
		width : 82px;
		height : 108px;
	}
	#treasureBox_text{		
		top : 108px;
		width : 82px;
	}
}
	#treasureBox_div{
		font-family : "微软雅黑","宋体","Helvetica Neue",Helvetica,Arial,sans-serif;
		position : absolute;
		z-index : 820;
		display : none;
		
		top : 44%;
		right : 25%;
	}
	#treasureBox_swf{
		position : absolute;
		pointer-events : none;
	}
	#treasureBox_clickRect{
		position : absolute;
		cursor : pointer;
	}
	#treasureBox_text{
		position : absolute;
		text-align : center;
		font-size : 14px;
		color : #ffffff;
		line-height : 14px;
	}
	
	#treasureBox_reward{
		position : absolute;
		z-index : 1000;
		font-family : "微软雅黑","宋体","Helvetica Neue",Helvetica,Arial,sans-serif;
		background: url("/images/treasurebox/bg.png") no-repeat;
		
		margin: 0 auto;
		left : 0%;
		right : 0%;
		top : 50%;
		width : 521px;
		height : 222px;
	}
	#treasureBox_reward_div{
		position : absolute;
		z-index : 1000;
		font-family : "Microsoft YaHei";
		background: url("/images/treasurebox/bg.png") no-repeat;
		display : none;
		
		margin: 0 auto;
		left : 0%;
		right : 0%;
		top : 50%;
		width : 521px;
		height : 222px;
	}
	#treasureBox_reward_div img{		
		width : 50px;
		height : 50px;
		border : none;
	}
	#treasureBox_reward_success{
		position : absolute;
		background: url("/images/treasurebox/success.png") no-repeat;
		
		top : -79px;
		left : 135px;
		width : 252px;
		height : 112px;
	}
	#treasureBox_reward_name{
		position : absolute;
		line-height : 12px;
		text-align : center;
		color : #ffffff;
		font-size : 12px;
		
		top : 16px;
		left : 189px;
		width : 143px;
		height : 12px;
	}
	#treasureBox_reward_frame{
		position : absolute;
		background: url("/images/treasurebox/coins.png") no-repeat;
		
		top : 26px;
		left : 215px;
		width : 90px;
		height : 90px;
	}	
	#treasureBox_reward_rewardIcon{
		position : absolute;
		background: url("http://images.181show.com/e0d39a48ccf30b4fd7a74293bef3b1ba?p=0") no-repeat;
		background-size:contain;
		
		top : 46px;
		left : 235px;
		width : 50px;
		height : 50px;
	}	
	#treasureBox_reward_light{
		position : absolute;
		background: url("/images/treasurebox/light.png") no-repeat;
		
		top : 54px;
		left : 209px;
		width : 102px;
		height : 52px;
	}		
	#treasureBox_reward_num{
		position : absolute;
		line-height : 12px;
		text-align : center;
		color : #ffffff;
		font-size : 12px;
		
		top : 107px;
		left : 189px;
		width : 143px;
		height : 12px;
	}
	#treasureBox_reward_notice{
		position : absolute;
		background: url("/images/treasurebox/notice.png") no-repeat;
		
		top : 139px;
		left : 189px;
		width : 143px;
		height : 21px;
	}
	#treasureBox_reward_confirm{
		position : absolute;
		background: url("/images/treasurebox/btn.png") no-repeat;
		outline : 0;
		border : none;
		cursor : pointer;
		
		top : 178px;
		left : 228px;
		width : 64px;
		height : 33px;
	}
</style>
<div id = "treasureBox_div" class = "treasureBox_div">
	<div id = "treasureBox_swf" class = "treasureBox_swf"></div>
	<span id = "treasureBox_text" class = "treasureBox_text">剩余00:00:00</span>
	<div id = "treasureBox_clickRect" class = "treasureBox_clickRect"></div>
</div>

<div id = "treasureBox_reward_div" class = "treasureBox_reward_div">
	<div id = "treasureBox_reward_success" class = "treasureBox_reward_success"></div>
	<span id = "treasureBox_reward_name" class = "treasureBox_reward_name">棒棒糖</span>
	<div id = "treasureBox_reward_frame" class = "treasureBox_reward_frame"></div>
	<div id = "treasureBox_reward_rewardIcon" class = "treasureBox_reward_rewardIcon"></div>
	<div id = "treasureBox_reward_light" class = "treasureBox_reward_light"></div>
	<span id = "treasureBox_reward_num" class = "treasureBox_reward_num">x666</span>
	<div id = "treasureBox_reward_notice" class = "treasureBox_reward_notice"></div>
	<button id = "treasureBox_reward_confirm" class = "treasureBox_reward_confirm"></button>
</div>