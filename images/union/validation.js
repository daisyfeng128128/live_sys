	/**
	 * 清除提示
	 */
    function clearTip(itemObj){
    	var tipObj=itemObj.nextAll(".error");
    	tipObj.text("");
    }
    
    /**
     * 设置提示信息
     * 提示属性值
     */
    function setTip(itemObj,msgAttr){
    	var msg=$(itemObj).attr(msgAttr);
    	var tipObj=itemObj.nextAll(".error");
    	tipObj.text(msgAttr);
    }
    
    function setRight(itemObj){
    	itemObj.nextAll(".error").html("<img src='/images/union/img/in_right.png'/>");
    }
    
    /**
     * 检查空值
     */
    function checkEmpty(itemObj){
    	//var required=itemObj.attr("required");
    	//if(typeof(required) != "undefined" && Boolean(required) == true){
    		if ($.trim(itemObj.val()).length==0){
    			setTip(itemObj , "不能为空");
    			return false;
    		}
	    //}
    	return true;
    }

    /**
     * 检查字符是否合法：允许 英文字符，数字以及英文状态下的特殊字符，不允许Tab，中文标点，中文符号
     */
    function checkCharactor(itemObj){
        var val=itemObj.val();

        var pattern = /[A-Za-z0-9(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
        if(pattern.test(val)){
            return true;
        }else{
            var charactor=itemObj.attr("charactorTip");
            if(typeof(charactor) != "undefined"){
                setTip(itemObj , "charactorTip");
                return false;
            }
        }
        return false;
    }
    
    /**
     * 检查value长度
     */
	function checkValueLen(itemObj){
		   var valLen = itemObj.val().length;
		   var minLen = itemObj.attr("data-minLength");
	    	if(typeof(minLen) != "undefined"){
	    		if (valLen < minLen){
	    			setTip(itemObj , "太短");
	    			return false;
	    		}
		    }
	    	
	    	var maxLen = itemObj.attr("data-maxLength");
	    	if(typeof(maxLen) != "undefined"){
	    		if (valLen > maxLen){
	    			setTip(itemObj , "太长");
	    			return false;
	    		}
		   }
	    	return true;
	   };
	   
	   
	   /**
	    * 检查是否为中文字符
	    */
	   function checkCNChar(itemObj){
	        var val=itemObj.val();
		   var pattern = /.*[\u4e00-\u9fa5]+.*$/;
		   if(pattern.test(val)){
			   setTip(itemObj , "不能为中文");
			   return false;
		   }
		   return true;
	   }
	   
	   /**
	    * 
	    *检察是否中文名
	    */
	   function checkChineseName(itemObj){
		   var val=itemObj.val();
		   var checkType=itemObj.attr("chinese_name");
		   var pattern=/^[\u4E00-\u9FFF]{2,5}$/;
	    	if(typeof(checkType) != "undefined" && Boolean(checkType) == true){
		 		   if (pattern.test(val)){
		 			  return true;
				   }
		    }
	    	setTip(itemObj , "chinese_name_tip");
	    	return false;
	   }
	   
	   function checkNumber(text){
		   return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(text);
	   }
	   
	   /**
	    * 检查是否非数字
	    * @param itemObj
	    */
	   function checkNotNumber(itemObj){
		   var val=itemObj.val();
		   var checkType=itemObj.attr("not_number");
			   if (checkNumber(val)){
	 			  setTip(itemObj , "不能为数字");
	 			  return false;
			   }
			return true;
	   }