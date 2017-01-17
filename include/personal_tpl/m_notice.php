<!--main-->
<div class="inmiddle" ng-controller="center">
    <?php
    $current_page="notice";
    include_once('./include/personal_tpl/center-info.php');
    include_once('./include/personal_tpl/menu_left.php');
    ?>
    <div class="succ">删除成功</div>
    <div class="deErr">删除失败</div>
    <div class="center-right">

        <div class="cr-care" >
        	
        	<div class="clearfix">
                <div class="cr-title pull-left">消息中心</div>
                <ul class="pagination pull-right">
                    <li class="prev"><a href="#">&laquo;</a></li>
                    <li ng-repeat="item in tPages" ng-class="item==curPage ?'active':''" ng-click="getPage(item,userId)"><a href="javascript:;">{{item}}</a></li>
                    <li class="next"><a href="#">&raquo;</a></li>
                </ul>
            </div>

            <div class="none-message" ng-if="news==null||news.length==0">暂无消息</div>
            <div class="cr-notice-main" style="">
                <div class="mlb-handlar">
                    <span class="systitle">系统消息</span>
                </div>
                <div class="has-message">
                	<!--开播通知-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==0">
                        <div class="message-list-title">
                        {{new.title}}<span class="times">{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}</span></div>
                        <div class="message-sf">
                           <div class="message-sf-cont">
                               你关注的 <a ng-href="{{new.roomNumber}}" class="names" id="{{new.userId}}">{{((new.details|toJson).userName)|decode}}</a> 已经开始直播<span id="{{new.id}}" hidden></span>
                           </div>
                            <div class="message-sf-control">
                                <a ng-href="{{new.roomNumber}}" class="btn btn-sm btn-default">进入房间</a>
                                <button type="button" data-toggle="modal" data-target="deleData" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>

                    </div>
                    
                    <!--爵位冻结数据库挂了-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==1">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                {{(new.details|toJson).month}} 月 {{(new.details|toJson).day}} 前再消{{(new.details|toJson).money}}才能继续点亮当前爵位，记得不要让尊贵的爵位暗淡咯<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--亲密度升级-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==2">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                你和<a ng-href="{{new.roomNumber}}" class="names"> {{((new.details|toJson).userName)|decode}} </a>的亲密度等级达到 <span class="colorPin">{{(new.details|toJson).level}}</span> 级<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--守护到期-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==3">
                        <div class="message-list-title">
                        {{new.title}}<span class="times">{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}</span></div>
                        <div class="message-sf">
                           <div class="message-sf-cont">
                               你<a ng-href="{{new.roomNumber}}" class="names"> {{((new.details|toJson).userName)|decode}} </a>的守护还有一天就要到期了，再多留点时间守护在TA身边吧<span id="{{new.id}}" hidden></span>
                           </div>
                            <div class="message-sf-control">
                                <a ng-if="new.roomNumber>0" ng-href="{{new.roomNumber}}" class="btn btn-sm btn-default">继续守护TA</a>
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>

                    </div>
                    
                    <!--获得礼物-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==4">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                <a ng-href="{{new.roomNumber}}" class="names"> {{((new.details|toJson).userName)|decode}} </a>送给你 <span class="colorPin">{{(new.details|toJson).amount}}</span> 个 <span class="colorPin">{{(new.details|toJson).itmename}}</span>，你的K豆增加了 <span class="colorPin">{{(new.details|toJson).coins}}</span><span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--成为房间管理-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==5">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                频道号：<a ng-href="new.number" class="names">{{new.roomNumber}} </a>的 <a ng-href="{{new.roomNumber}}" class="names">{{((new.details|toJson).userName)|decode}}</a> 将你设为了TA的房间管理员，你在这里享有踢人、禁言权利哦，请帮助TA管理频道秩序吧<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                            	<a ng-href="{{new.roomNumber}}" class="btn btn-sm btn-default">前去管理房间</a>
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--背包道具到期-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==6">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                亲爱的用户，你的背包里有{{(new.details|toJson).amount}}个{{(new.details|toJson).itmename}}即将在 {{(new.details|toJson).mouth}} 月 {{(new.details|toJson).day}} 日失效，请记得在失效前赶紧用掉哦<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--背包道具过期-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==7">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                亲爱的用户，你的背包里有 {{(new.details|toJson).amount}} 个 {{(new.details|toJson).itmename}} 超过有效期，系统已自动清理。如有疑问请联系客服<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--爵位升级-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==8">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                尊贵的用户恭喜你升级成为了 <span class="colorPin">{{(new.details|toJson).nobility}}</span> 贵族<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    <!--活跃度升级-->
                    <div class="message-list-box" ng-repeat="new in news" ng-if="new.type==9">
                        <div class="message-list-title">
                            {{new.title}}
                            <span class="times">
                            	{{new.createDT|date:"yyyy-MM-dd HH:mm:ss"}}
                            </span>
                        </div>
                        <div class="message-gl">
                            <div class="message-sf-cont">
                                你的活跃度等级达到了 <span class="colorPin">{{(new.details|toJson).level}}</span> 级<span id="{{new.id}}" hidden></span>
                            </div>
                            <div class="message-sf-control">
                                <button type="button" ng-click="dele(new.id,item,userId)" class="btn btn-sm btn-danger">删除</button>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    

                </div>
                <div class="message-buy-box" style="display: none">
                    <div class="mbb-top">守护独享特权</div>
                    <div class="mbb-middle">
                        <div class="mbb-img-left"></div>
                        <div class="mbb-con-right">
                            <div class="mbb-con-title">年费会员特权</div>
                            <div class="mbb-con-content">专属进场特效、专属表情、每月两次专属道具、每天一次踢人权限    <a href="#">更多</a></div>
                        </div>
                    </div>
                    <div class="mbb-bottom">
                        <div class="mbb-bot-top">
                            <div class="mbb-bot-title">守护购买</div><div class="mbb-bot-ii">开通年会会员,用用排名考前红名等特权</div>
                        </div>
                        <div class="mbb-buu-table">
                            <table>
                                <tr>
                                    <td>购买方式</td>
                                    <td><span class="an-zf an-zf-select">按月支付</span></td>
                                    <td><span class="an-zf">按月支付</span></td>
                                </tr>
                                <tr>
                                    <td>购买时长</td>
                                    <td clospan="2"><span class="an-zf">按月支付</span></td>
                                </tr>
                                <tr>
                                    <td>总价格</td>
                                    <td clospan="2"><span class="zf-db">123114逗比</span></td>
                                </tr>
                            </table>
                        </div>
                        <div class="mbb-buu-but"><button type="button" >购买</button></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>



</div>
</div>


<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>