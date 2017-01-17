(function(window)
{
	window.StageWebViewBridge = (function()
	{         
	
		/* Used to call an AS3 function. */
		/* Usage: StageWebViewBridge.call( 'as3FunctionToCall', jsCallBack, ...restParams ) */
		var call = function(name,callback,param)
		{
			self.location="/ios/func/"+param;
		};

		
		/* Return public methods */
		return {
            call: call
		};
	})();
})(window);