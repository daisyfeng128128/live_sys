<?php 
exit;
include('../include/header.inc.php');
set_time_limit(0);
/*$rs=$db->Execute("select * from bot");
while($arr=$rs->FetchRow()){
        $db->Execute("insert into user (nickname,usernumber,accountfrom,totalcost,isblock)
        value('$arr[botname]','$arr[botnumber]','9','".rand(0,15000)."','1')");
        sleep(1);
}*/
while(true){
        //$db->debug=true;
        $user=$db->GetRow("select userid,totalcost,usernumber from user where accountfrom=9 order by rand() limit 1");
        $showid=$db->GetOne("select roomnumber from shows where endtime is null order by rand() limit 1");
        $botnum=$db->GetOne("select count(a.userid) from show_users a,user b where a.userid=b.userid and b.accountfrom=9 and a.roomnumber='$showid'");
        $total=$db->GetOne("select count(userid) from show_users where roomnumber='$showid'");
        if($botnum<(($total-$botnum)*100)){
         $db->Execute("insert into show_users(usernumber,roomnumber,totalcost,userid,ishide) values('$user[usernumber]','$showid','$user[totalcost]','$user[userid]','0')");
       $del=$db->GetRow("SELECT a.userid,a.roomnumber from show_users a,user b,user c where a.roomnumber=b.usernumber and b.isshowing=0 and c.accountfrom=9 and c.userid=a.userid");
        $db->Execute("delete from show_users where userid='$del[userid]' and roomnumber='$del[roomnumber]'");
        echo "$user[usernumber] InTo $showid\r\n";
        }
        sleep(5);
}
?>
