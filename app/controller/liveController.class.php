<?php
	class liveController{
		public function index(){
			global $view;
			global $db;
			global $page_var;

			header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
			header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
			header("Pragma: no-cache");
			/*if(strpos($_SERVER['HTTP_USER_AGENT'],'MSIE 6.0') !== false ){
				header("Location:/html/noie6.html");
			}*/

			$roomnumber = (int)$_GET['roomnumber'];

			$user = checklogin();
			if (ismobile()) {
				header("Location:/livemb?roomnumber={$roomnumber}");
				exit();
			}

			//背景
			$bgclassList = array("bg1", "bg2");
			$index = rand(0, count($bgclassList) - 1);

			$BSG = $bgclassList[$index];
			if (!$_COOKIE["sbg"]) {
				setcookie("sbg", $BSG, time() + 10, '/', _COOKIE_DOMAIN_);
			} else {
				$BSG = $_COOKIE["sbg"];
			}

			//tokern校验
			$db->Execute("update bu_user_packs set liveDT='" . time() . "' where userId=$user[userId]");
			$liveDT = $db->GetRow("select liveDT from bu_user_packs where userId=$user[userId]");
			if ($liveDT) {
				$currentToken = base64_encode(md5($user["username"] . $user["password"] . $liveDT["liveDT"]));
				$tokens = $user["username"] . $user["password"] . $liveDT["liveDT"];
			}

			$showinfo = $db->CacheGetRow(10, "select u.userId as userId,u.avatar as avatar,u.nickname as nickname,u.city as city,a.roomNumber as roomNumber from bu_user_anchors a LEFT JOIN bu_user u on a.userId = u.userId WHERE a.roomNumber = $roomnumber and a.`status` =1 and u.`status` =1");

			if (!$showinfo) {
				$db->close();
				header("Location:/blank.php");
				exit;
			}
			$showinfo = safe_output($showinfo);

			$b = urldecode($showinfo['nickname']);
			$showinfo['nickname'] = $b;
			$showinfo['starlevel'] = 1;

			//是否主播
			if ($roomnumber == $user['roomNumber']) {
				$thisHome = 1;
			}
			$vhistory = explode(',', $_COOKIE['vhistory']);
			if (!in_array($roomnumber, $vhistory)) {
				array_unshift($vhistory, $roomnumber);
				$carr = array_chunk($vhistory, 5);
				$result = join(',', $carr[0]);
				setcookie('vhistory', $result, time() + 3600 * 356 * 10, '/', _COOKIE_DOMAIN_);
			}
			//礼物
			$rs = $db->Execute("select * from gift a, giftcate b where a.giftcateid =b.giftcateid AND b.type=0 order by a.indexs DESC");
			$giftId = $giftinfo = array();

			$zhou_xing = explode(",", $global_config_data["top_week0"] . "," . $global_config_data["top_week1"]);
			$giftId = $giftinfo = $zhou_xing_gift = array();
			while ($arr = $rs->FetchRow()) {
				$arr['class'] = str_replace('.png', '', $arr['giftimage']);
				$arr['class'] = str_replace('.gif', '', $arr['class']);
				if (in_array($arr['giftid'], $zhou_xing)) {
					$arr['week'] = true;
					$zhou_xing_gift[$arr["giftid"]] = $arr;
				}
				$giftinfo[$arr['giftcateid']][] = $arr;
				$giftId[$arr["giftid"]] = $arr;
			}
			shuffle($zhou_xing_gift);
			$rs = $db->Execute("select * from giftcate WHERE type=0 order by indexs DESC");

			$giftcate = array();
			while ($arr = $rs->FetchRow()) {
				$giftcate[$arr["giftcateid"]] = $arr;
			}
			$page_var['cdn'] = _CDNDOMAIN_;

			if ($_GET['param'] == "built") {
				$skinType = "qqgame_built";
				$roomType = 'custom';
				//include($app_path . "/skin/qqgame_built/index.php");
				header("Location:/liveqqgame");
				$db->close();
				exit();
			}


			if (($_SESSION['pf'] == "QQGame" or $_SESSION['pf'] == "qqgame") and $_SESSION['openid'] != null) {
				$skinType = "desert";
				$roomType = 'hall';
				//include($app_path . "/skin/desert/index.php");
				header("Location:/livedesert");
				$db->close();
				exit();
			}

			$redis = new Redis();
			$redis->connect(_REDIS_HOST_, 6379);
			$redis->auth(_REDIS_PWD_);
			$key = _REDIS_KEYB_ . "_c.mt.cs.ea.rt.nx." . $roomnumber . "_6";
			$skid = $redis->get($key);

			$rtp_key = _REDIS_KEYB_ . "_c.mt.cs.ea.rt.hash." . $roomnumber . "_4";
			$hash_room = $redis->hGetAll($rtp_key);


			if($_GET['ttt'] == "ttt"){
				console_log($hash_room['rtype']);
			}
			if($hash_room['rtype'] == "") {
				$h2rtype = $db->CacheGetRow(10, "select packs from bu_user_packs WHERE  userId = {$showinfo['userId']}");
				if ($h2rtype != null and $h2rtype != "") {
					$json = json_decode($h2rtype['packs'], 1);
					if (array_key_exists('rtype', $json)) {
						$hash_room['rtype'] = $json['rtype'];
					}
				}
			}

			$roomType_p = '';
			$roomType = $hash_room['rtype'] ? $hash_room['rtype'] : "";
			if ($hash_room['rtype'] == "2") {
				$roomType = 'game';
				$roomType_p = $roomType . "_";
				$skinType = $roomType_p . "comic";

				$gameInfo =array();
				$anchorUserId= $showinfop['userId'];
				$conn = $db->CacheGetRow(10, "select * from bu_game_room_set s LEFT JOIN bu_game_room g ON s.gaid = g.id  WHERE s.uid = {$showinfo['userId']}");
				if(!empty($conn)){
					$gameInfo['set'] = 1;
					$gameInfo['bgImage'] = _IMAGES_DOMAIN_."/".$conn['bgImage'];
					$gameInfo['gameUrl'] = $conn ['gameUrl'];
					$params = json_decode($conn ['params'],true);
					$gameInfo['startGame'] = $params['open'];
					$gameInfo['startGameUrl'] = $params['url'];
					$gameInfo['gamePacks'] =  $params['gamePacks'];
					$gameInfo['gid'] =  $conn['gaid'];
				}else{
					$gameInfo['set'] = 0;
				}

				if($_GET['ttt'] == "ttt"){
					console_log($conn);
				}

				//include($app_path . "/skin/game_comic/index.php");
				//header("Location:/livegamecomic");
				$view->display('gamecomic.html');
				exit();
			} else {
				$roomType = 'kedo';
			}

			if ($skid != "" and file_exists(dirname(__FILE__) . "/live_{$skid}.php")) {
				$tt = $skid;
			} else {
				$tt = "comic";
			}

			$skinType = $roomType_p . $tt;
			//include($app_path . "live_comic.php");
			header("Location:/live_comic.php");
			$db->close();
		}
 }
?>