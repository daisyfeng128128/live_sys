var type=0;
var rows=null;
function changetype(rowstr,colnum)
{
	if(rows!=null && rows!=rowstr)typeaction(rows,colnum,"close");//将上一行改为显示状态
	if(type==0)//开启当前编辑状态
	{
		typeaction(rowstr,colnum,"open");
		type=1;//编辑状态
	}
	else//关闭当前编辑状态
	{
		if(rows!=rowstr)
		{
			typeaction(rowstr,colnum,"open");
			type=1;
		}
		else
		{
			typeaction(rowstr,colnum,"close");
			type=0;
		}
	}
	rows=rowstr;
	return false;
}

function typeaction(rowstr,colnum,action)
{
	if(action=="open")
	{
		for(var i=1;i<=colnum;i++)
		{
			var str1="oldtype_"+rowstr+"_"+i;
			var str2="newtype_"+rowstr+"_"+i;

			document.getElementById(str1).className="lihide";
			document.getElementById(str2).className="lishow";
		}
	}
	else
	{
		for(var i=1;i<=colnum;i++)
		{
			var str1="oldtype_"+rowstr+"_"+i;
			var str2="newtype_"+rowstr+"_"+i;
			document.getElementById(str1).className="lishow";
			document.getElementById(str2).className="lihide";
		}
	}
}