<style>
    .skin_info{height: 330px;}
    .skin_info .skin-line{height: 1px;border-bottom: 1px solid #CCCACA;width: 100%;margin:10px 0 0 0;}
    .skin_info ul{height:330px;}
    .skin_info ul li{float: left;margin:15px;width: 150px;height: 135px;font-size: 12px;}
    .skin_info ul li .sk-name{border-radius: 3px;border: 1px solid #f77599;text-align: center;color: #f77599;width: 78px;line-height:24px;display: inline-block;}
    .skin_info ul li img{width:118px;height: 66px;margin-top: 10px;margin-bottom: 10px;}
    .skin_info ul li .usee{line-height:24px;border-radius: 3px;width: 78px;display: inline-block;text-align: center;}
    .skin_info ul li .sk-useit{background-color: #3B5FDA;color: #FFffff}
    .skin_info ul li .sk-isuse{background-color: #FFFFFF;color: #333;border:1px solid #D2D2D2;}

</style>
<div id="pop" class="pop">
    <a href="javascript:;" id="close" class="close">×</a>
    <div class="noti_mana_song" id="noti_mana_song">
        <a href="javascript:;" class="notice active">公告</a>
        <a href="javascript:;" id="manage" class="manage">管理</a>
        <a href="javascript:;" class="choose-skin">换肤</a>
    </div>
    <div id="info">
        <div style="display:block;" id="notice_info">
            <div class="noti_bg">
                <span class="laba"></span>
                <span class="notice">公告</span>
            </div>
            <textarea id="roomNotice" class="textarea"></textarea>
            <input type="hidden" id="id" value=""/>
            <div id="save" class="save">保存</div>
        </div>

        <div id="manage_info">
            <div class="tit clearFix">
                <span class="rank fl">排序</span>
                <span class="name fl">称号</span>
                <span class="operate fl">操作</span>
                <span class="add fr" id="add_user">添加</span>
            </div>
            <div class="divide"></div>
            <div class="no_added" id="no_added">
                <div class="manage_detail">
                    <p class="tip">您还未添加任何管理，请添加</p>
                    <div class="add_btn" id="add_btn">添加</div>
                </div>
                <div class="bottom clearFix">
                    <p class="bottom_tip fl">每位管理都必须满足消费额度才可以添加</p>
                    <a class="fl" href="javascript:;">查看管理成长体系></a>
                </div>
            </div>
            <div class="added" id="added">
                <ul class="added_list" id="added_list"></ul>
                <div class="bottom clearFix">
                    <p class="bottom_tip fl">每位管理都必须满足消费额度才可以添加</p>
                    <a class="fl" href="javascript:;">查看管理成长体系></a>
                </div>
            </div>
        </div>

        <div id="skin_info" class="skin_info nano">
            <div class="skin-line"></div>
            <ul class="content">
                <li>
                    <span class="sk-name">动漫</span>
                    <img src="/img/pic_qiehuan_01.png" alt="风格一" />
                    <a href="javascript:;" data-sk="comic" class="sk-useit usee" >使用</a>
                </li>
            </ul>
        </div>
        <div id="song_info">
            <h4 id="add_tip" style="margin-top:16px; font-size:14px; color:#333; margin-left:88px; margin-bottom:6px;">添加歌曲</h4>
            <div class="add_song clearFix">
                <input class="songname fl" type="text" id="songsName" />
                <span class="save_song fl" id="songsSave">保存</span>
            </div>
            <h4 class="song_list">歌曲列表</h4>
            <div class="list_tit clearFix">
                <span class="rank_tit fl">排序</span>
                <span class="name_tit fl">歌曲名称</span>
                <span class="operate_tit fl">操作</span>
            </div>
            <div class="divide"></div>
            <div class="song_detail" id="song_detail"></div>
        </div>
    </div>
    <div class="mana_shadow" id="mana_shadow">
        <div class="add_mana">
            <a class="mana_close" id="mana_close" href="javascript:;">×</a>
            <h2 class="tit">添加管理</h2>
            <p>通过ID查找需要添加的管理</p>
            <div class="search">
                <span></span>
                <input type="text" id="userId"/>
            </div>
            <span class="search_btn" id="search_btn">查找</span>

            <div class="appear" id="appear">
                <p class="find" >查找到一下用户</p>
                <div class="divide"></div>
                <div class="user_info clearFix">
                    <div class="img fl">
                        <img src="" id="userImg" style="width:60px;height：60px"/>
                    </div>
                    <div class="name_id fl">
                        <p class="name" id="userName"></p>
                        <p><span>ID：</span><span id="idNum"></span></p>
                    </div>
                    <div class="user_add fl" id="user_add">添加</div>
                </div>
            </div>
        </div>
    </div>
</div>