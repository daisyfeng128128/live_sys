<?php
/*
* centeros class
 */
class centerosController{
     public $db;
     public $page_var;
     public $view;
     public $user;

    //centeros index
    function index(){
        $this->showCommon();
        $user = $this->user;
        $page_var = $this->page_var;
        //guardianship
        $datas = curl_post(_INTERFACE_."/rest/personCenter/myGuard.mt","userid={$user['userId']}");
        $parseData=json_decode($datas, true);
        $this->view->assign('guardianship',$parseData['data']);
        //exit(var_dump($acceptData));
        //over
        // approach effects m_index.html
        $flage = false;
        $rs=$this->db->Execute("select g.giftid,g.giftimage,g.giftname,g.giftprice,
        (SELECT if(Count(1) = 1,1,0) FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = {$user['userId']} AND c.`status`=1) as ts,
        (SELECT c.active FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = {$user['userId']} AND c.`status`=1) as active,
        (SELECT c.valiDT FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = {$user['userId']} AND c.`status`=1) as valiDT,
        (SELECT c.id FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = {$user['userId']} AND c.`status`=1) as id
        FROM gift g where g.giftcateid = 8 ORDER BY g.giftid ASC");
        $arrs = array();
        while($arr=$rs->FetchRow()){
            $flage = true;
            $arr=safe_output($arr,true);
            if($arr['ts']==0){
                $tss='?g=1';
                $use="尚未拥有";
                $arr['tss'] = $tss;
                $arr['use'] = $use;
            }else{
                $tss ='';
                $day = floor((strtotime($arr['valiDT']) - time())/3600/24);
                if($arr['active']==1){
                    $use="<span class='use-car'>正在使用</span>";
                }else{
                    $use="<span class='no-use-car'>使用</span>";
                }
                $arr['tss'] = '';
                $arr['day'] = $day;
                $arr['use'] = $use;
            }
            $arrs[] = $arr;
        }
        $this->view->assign('arrs',$arrs);
                //over          
        $this->view->display('m_index.html');

  }

    //my care
    function history(){
        $this->showCommon();
        $user = $this->user;
        $current_page = "care";
        $this->view->assign('current_page',$current_page);
        // get data my care
        $rs=$this->db->Execute("select b.roomNumber,
        (SELECT o.online from bu_user_online o where o.roomnumber = b.roomNumber and o.anchors=1) online,
        u.nickname,u.userId,u.avatar,
        a.followeds
        from  bu_user_studio b,bu_user u,bu_user_anchors a
        where b.userId='{$user['userId']}'
        and a.roomNumber = b.roomNumber
        and u.userId = a.userId
        and b.isFollow =1
        ");
        $arrs = array();
		if(!$rs){
            $nodata = '没有关注的主播哟';
            $this->view->assign('nodata',$nodata);
            $this->view->assign('arrs',$arrs);
			$this->view->display('m_care.html');
            exit;
		}
        while($arr=$rs->FetchRow()){
            $arr=safe_output($arr,true);
            $arr['starlevel']=point2star($arr['totalpoint']);
            $arr['nickname'] = urldecode($arr['nickname']);
            $arrs[] = $arr;
        }
        $this->view->assign('arrs',$arrs);
        $this->view->display('m_care.html');
        //over
        
  }

    //basic info
    function info(){
        $this->showCommon();
        //$user = $this->user;
        $user = checklogin();
        $current_page = "info";

        $tmp_b = explode('-', $user['birthday']);
        if (is_array($tmp_b)) {
        $birthday_year = $tmp_b[0];
        $birthday_month = $tmp_b[1];
        $birthday_day = $tmp_b[2];
        }
        //exit(var_dump($user));
        if ($user['gender'] == '') {

        } else if ($user['gender'] == 0) {
            $femalechecked = 'checked';
        } else {
            $malechecked = 'checked';
        }

        $this->view->assign('birthday_year',$birthday_year);
        $this->view->assign('birthday_month',$birthday_month);
        $this->view->assign('birthday_day',$birthday_day);
        $this->view->assign('femalechecked',$femalechecked);
        $this->view->assign('malechecked',$malechecked);
        $this->view->assign('current_page',$current_page);
        $this->view->assign('province',$user['province']);
        $this->view->assign('city',$user['city']);
        $this->view->display('m_self.html');
  }

    //change pwd
    function mpass(){
        $this->showCommon();
        $current_page = "mpass";
        $this->view->assign('current_page',$current_page);
        $this->view->display('m_pass.html');
  }

    //bind phone
    function mphone(){
        $this->showCommon();
        $current_page = "mphone";
        $user = $this->user;
        $sql = "select mobile from bu_user where userId = {$user['userId']}";
        $mobile = $this->db->GetOne($sql);
        //$mobile = '18255001881';
        $this->view->assign('mobile',$mobile);
        $this->view->assign('current_page',$current_page);
        $this->view->display('m_phone.html');
  }

    //change avatar
    function mportrait(){
        $user = checklogin();
        $this->showCommon();
        $current_page = "mportrait";
        $this->view->assign('current_page',$current_page);
        $this->view->assign('userId',$user['userId']);
        $this->view->display('m_portrait.html');
  }

    //recharge
    function recharge(){
        $this->showCommon();
        $current_page = "recharge";
       
        $this->view->assign('monlist',$this->monlist());
        $this->view->assign('current_page',$current_page);
        $this->view->display('m_recharge.html');
  }

    //trade page
    function record(){
        $this->showCommon();
        $current_page = "record";

        $this->view->assign('current_page',$current_page);
        $this->view->assign('monlist',$this->monlist());
        $this->view->display('m_record.html');

  }

    //recieved gifts
    function receive(){
        $this->showCommon();
        $current_page = "receive";
        $this->view->assign('current_page',$current_page);
        $this->view->assign('monlist',$this->monlist());
        $this->view->display('m_receive.html');
  }

    //news notice
    function notice(){
        $this->showCommon();
        $current_page = "notice";
        //state

        $this->view->assign('current_page',$current_page);
        $this->view->display('m_notice.html');
  }

    function treasure(){
        exit();
  }

    //initialization
    function __construct(){
        global $db;
        global $view;
        global $page_var;
        $this->db = $db;
        $this->view = $view;
        $this->page_var = $page_var;

        $this->view->left_delimiter = "<{";
        $this->view->right_delimiter = "}>";

        $current_page = "index";
        if (isset($_GET['ptype']) && $_GET['ptype'] == 'pay') {
            $current_page = "pay";
        }

        $user = checklogin();
        if (!$user) {
            header("location:kedo.php");
            exit();
        }

        $userinfo=search_save_user($user['userId']);
        set_login_info($userinfo);
        $user=$userinfo;
        $this->user = $user;

        $_GET = safe_output($_GET);
        $_POST = safe_output($_POST);
        // assign user data to view
        foreach ($user as $key => $value) {
            $this->view->assign($key,$value);
        }
        //over
        $res_path = "././public/centeros";
        $this->view->assign('res_path',$res_path);
        $this->view->assign('cdn_domain',$page_var['cdn_domain']);
        // include tpl_header.php
        //$page_var['current_page']=$current_page;
        $page_var['current_page'] = '';
        foreach($page_var as $key=>$val){
        $this->view->assign($key,$val);
        }
        // delieve user array data to page
        $this->view->assign("user",$user);
        //over
        //footer
        $site_skin = isset($page_var['site_skin'])?$page_var['site_skin']:'desert';
        //$footer = 'footer-'.$site_skin.".html";
        $footer = "../public/footer.html";
        $this->view->assign('site_skin',$site_skin);
        $this->view->assign('footer',$footer);

        //state
        $userId = $this->user['userId'];
        $stateNum = $this->getNoticeState($userId);
        //$stateNum = 1;
        $this->view->assign('stateNum',$stateNum);

  }

    function __destruct(){
        //close db
        $this->db->close();
  }

    //get date list table
    function monlist(){
        $monlist="";
        $time = time();
        $month = date('m',$time);
        for($m=1;$m<13;$m++){
            if($m==$month){
                $monlist.="<option selected = 'selected'>".$m."</option>";
            }else{
                $monlist.="<option>".$m."</option>";
            }
        }
        return $monlist;
  }

    //common notice API
    function noticeAPI(){
        $userId = $_POST['userId'];
        //$userId = 12;
        $retData = array();
        $retData['state'] = 0;
        $stateNum = $this->getNoticeState($userId);
        //$retData['stateNum'] = $stateNum;
        if ($stateNum>0) {
            $retData['state'] = 1;
        }
        $retData['userId'] = $userId;
        echo json_encode($retData);
  }

    //get unread news numbers by userId
    function getNoticeState($userId){
        $userinfo = $this->db->Execute("select state from bu_station_message where userId = {$userId} and (state = 0 or state is null)");
        if ($userinfo) {
            return $userinfo->RecordCount();
        }else{
            return 0;
        }
  }

    function showCommon(){
        $this->view->display('common.html');
        $this->view->display('header_public.html');
  }

    //upload avatar
    function imgupload(){
        $APP_ROOT = $_SERVER['DOCUMENT_ROOT'];
        $dir = $APP_ROOT.'/public/upload/';
        if (PHP_OS != "WINNT") {
            $dir = str_replace("/","\\",$dir);
        }
        $result = array();
        $result['success'] = false;
        $success_num = 0;
        $msg = '';
        if (!file_exists($dir)) {
            mkdir($dir,0755);
        }

        $filename = date("YmdHis").'_'.floor(microtime()*1000).'_'.$this->createRandomCode(8);
        $imgfile = $_FILES['__avatar1'];
        
            if ($imgfile['error']>0) {
                $msg = $imgfile['error'];
            }else{
                $fileA = explode('.',$imgfile['tmp_name']);
                $ext = end($fileA);
                $savepath = $dir.$filename.'.ico';
                //debug info
                //$result["dir"] = $dir;
                //$result["filename"] = $filename;
                //$result['ext'] = $ext;
                //$result["savepath"] = $savepath;
                //$result['userid'] = $this->user['userId'];
                if (move_uploaded_file($imgfile["tmp_name"],$savepath)) {
                    $success_num++;
                    $md5_img = $this->uploadImg($savepath);

                    $result['avatarUrls'] = _IMAGES_DOMAIN_.'/'.$md5_img;
                    //save avatar to user
                    $userId = $this->user['userId'];
                    $this->db->Execute("update bu_user set avatar= '{$md5_img}' where userId = {$userId}");

                    $_SESSION['avatar'] = $md5_img;
                    $result['res'] = $this->db->Affected_Rows();
                    if ($this->db->Affected_Rows()>0) {
                        $result['message'] = 200;
                    }else{
                        $result['message'] = $savepath;
                    }

                }else{
                    $result['success'] = "error to load to local server";
                }
            }

            $result['msg'] = $msg;
            if ($success_num > 0){
                $result['success'] = true;
            }
            //return picture save result,json format
            return json_encode($result);


  }

    //create random code
    function createRandomCode($length){
        $randomCode = "";
        $randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for ($i = 0; $i < $length; $i++)
        {
            $randomCode .= $randomChars { mt_rand(0, 35) };
        }
        return $randomCode;
  }

    //upload avatar to server
    function uploadImg($imgurl){
        $zimg_upload_url = _IMAGES_DOMAIN_;
        $simg=$imgurl;

        $ch = curl_init();

        $post_data = file_get_contents($simg); // raw_post方式

        $headers = array();
        $headers[] = 'Content-Type:jpg'; // 还有这里！

        curl_setopt($ch, CURLOPT_URL, $zimg_upload_url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $info = curl_exec($ch);
        curl_close($ch);
        $json = json_decode($info, true);
        if($json['ret']==true){
            return $json['info']['md5'];
        }
        return false;
  }


}
?>


