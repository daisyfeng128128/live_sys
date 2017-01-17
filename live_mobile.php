<?php
$roomnumber = (int)$_GET['roomnumber'];

function curl_post_data($url,$post){
  $options = array(
    CURLOPT_RETURNTRANSFER=>true,
    CURLOPT_HEADER=>false,
    CURLOPT_POST=>true,
    CURLOPT_POSTFIELDS=>$post,
    );
  $ch = curl_init($url);
  curl_setopt_array($ch,$options);
  $result = curl_exec($ch);
  curl_close($ch);
  return $result;
}
$post = array('roomnumber'=>$roomnumber);
$interface = _INTERFACE_."/rest/homeAnchors/livePhone.mt?roomNumber=".$roomnumber;
$datas = curl_post_data($interface,$post);
$data = json_decode($datas,true);

//print_r($data);
$zhuboinfo = $data['data'];
$roomUsers = $zhuboinfo['roomUsers'];
//print_r($data['data']);
//
$url = 'http://1b7a61-0.sh.1252349838.clb.myqcloud.com/rest/site/transcoding.mt?roomNumber='.$roomnumber;
$udata = array('roomnumber'=>$roomnumber);
$result = curl_post_data($url,$udata);
// var_dump($url);
// var_dump($result);
?>
<!DOCTYPE html>
<html>
<head>
    <title>视频播放</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/templates/livePhone/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/templates/livePhone/css/style.css">
    <script src="/js/jquery-1.12.2.min.js"></script>
    <style type="text/css">
      .downgame{
        width: 250px;
        height: 80px;
        margin-left: 67%;
        margin-top: 6%;
        border-radius: 8px;
        border: solid 0px gray;
        /*background: transparent;*/
        z-index: 10000;
        position: absolute;
        font-family: Microsoft Yahei;
        color: white;
        font-size: 34px;
        font-weight: 400;
        letter-spacing: 3px;
        background-color: #ec4356;
      }
      .msty{
        width: 64%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    </style>
</head>
<body class="body">
    <div class="header">
    	<section class="jumbotron banner row">
      <div class="col-xs-12" style="">
          <video src="http://hls.181show.com/mutian-ucloud/m<?php echo $roomnumber;?>/playlist.m3u8" id="player"
		  x5-video-player-type="h5" x5-video-player-fullscreen="true"
                   x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" controls poster="<?php echo $zhuboinfo['image']."?p=0&w=640&h=360";?>"></video>

            <!--<img src="img/live_girl.png" width="100%" height="100%" alt="" />-->
            <div><a href="<?php echo $zhuboinfo['uploadAdd'];?>"><button class="downgame">下载游戏</button></a></div>
            <div class="txt clearfix">
                <div class="txtL pull-left" style="margin-top: 30px;">
                    <p class="tit colorR f3_4"><?php echo urldecode($zhuboinfo['nickName']);?></p>
                    <p class="color99 f2_8">
                      <span class="glyphicon glyphicon-eye-open f3_3"></span>
                        <span style="color:#999;"><?php echo $zhuboinfo['personNum'];?></span></p>
                </div>
                <div class="txtR pull-right f3" style="margin-top: 30px;clear: both;margin-top: -6.5%;margin-right: 40%;color:#999;">
                    关注她
                    <span class="glyphicon glyphicon-heart colorR"></span>
                </div>
            </div>
      </div>
    </section>
	</div>
	<section class="recommend">   
       <div class="page-header clearfix">
            <h4 class="pull-left f3_4">
              <span class="glyphicon glyphicon-fire" style="margin-top: 30px;"></span>
                精彩推荐
            </h4>     
        </div>
       <div class="row">
       <?php 
            
            $hotAnchors = $data['data']['hotAnchors'];
            $hotNum = count($hotAnchors)<6?count($hotAnchors):6;
            $imgsize = '&w=330&h=181';
            //$imgsize = '';
            //$hotNum = 0;
            for ($i=0; $i <$hotNum ; $i++) { 
              if($hotNum<=0) break;
              if ($i == 0) {
                echo '<div class="col-xs-6" ng-repeat="reply in replies">
                <a href="'.$hotAnchors[$i]['roomNumber'].'" class="thumbnail">
                  <div class="recommImg thumbnail">
                    <img src="'.$hotAnchors[$i]['image'].$imgsize.'" alt=""/>
                    <div class="thumb-bar"></div>
                  </div>
                  <div class="recommB">
                    <div class="clearfix">
                      <span class="color00 pull-left ellipsis msty f3">'.$hotAnchors[$i]['title'].'</span>
                      <div class="color99 pull-right f2_8">
                        <span class="glyphicon glyphicon-eye-open"></span>
                        <span>'.$hotAnchors[$i]['numbers'].'</span>
                      </div>
                    </div>
                    <p class="color99 ellipsis msty f3">'.$hotAnchors[$i]['descri'].'</p>
                  </div>

                </a>
              </div>';
              }else{
                echo '<div class="col-xs-6">
            <a href="'.$hotAnchors[$i]['roomNumber'].'" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="'.$hotAnchors[$i]['image'].$imgsize.'" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left ellipsis msty f3">'.$hotAnchors[$i]['title'].'</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>'.$hotAnchors[$i]['numbers'].'</span>
                  </div>
                </div>
                <p class="color99 ellipsis msty f3">'.$hotAnchors[$i]['descri'].'</p>
              </div>

            </a>
          </div>';
              }
            }
       ?>
          <!-- <div class="col-xs-6" ng-repeat="reply in replies">
                <a href="#" class="thumbnail">
                  <div class="recommImg thumbnail">
                    <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                    <div class="thumb-bar"></div>
                  </div>
                  <div class="recommB">
                    <div class="clearfix">
                      <span class="color00 pull-left f3">{{reply.id}}</span>
                      <div class="color99 pull-right f2_8">
                        <span class="glyphicon glyphicon-eye-open"></span>
                        <span>2143324</span>
                      </div>
                    </div>
                    <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
                  </div>

                </a>
              </div> -->
          <!-- <div class="col-xs-6">
            <a href="#" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left f3">女人如歌节目</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>2143324</span>
                  </div>
                </div>
                <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
              </div>

            </a>
          </div>
          <div class="col-xs-6">
            <a href="#" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left f3">女人如歌节目</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>2143324</span>
                  </div>
                </div>
                <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
              </div>

            </a>
          </div>
          <div class="col-xs-6">
            <a href="#" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left f3">女人如歌节目</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>2143324</span>
                  </div>
                </div>
                <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
              </div>

            </a>
          </div>
          <div class="col-xs-6">
            <a href="#" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left f3">女人如歌节目</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>2143324</span>
                  </div>
                </div>
                <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
              </div>

            </a>
          </div>
          <div class="col-xs-6">
            <a href="#" class="thumbnail">
              <div class="recommImg thumbnail">
                <img src="/templates/livePhone/img/pic_01.png" alt=""/>
                <div class="thumb-bar"></div>
              </div>
              <div class="recommB">
                <div class="clearfix">
                  <span class="color00 pull-left f3">女人如歌节目</span>
                  <div class="color99 pull-right f2_8">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span>2143324</span>
                  </div>
                </div>
                <p class="color99 ellipsis f3">谢霆锋百科知识 舒淇变迷妹点赞</p>
              </div>

            </a>
          </div> -->
       </div>
    </section>

</body>
</html>


