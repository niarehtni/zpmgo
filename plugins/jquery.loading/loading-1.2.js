/**
 *  Ajax Width Loading State  -  v1.2
 *
 *  Author    WeiJun_Xiang <xwjunself@163.com>
 *  Date      2015/07/20
 *  Revision  2016/04/18
 *  Depend    jQuery
 */

/*----------------------------------
    ajax操作-加载图标

    执行顺序:
    1.ajaxStart(全局事件)
    2.beforeSend
    3.ajaxSend(全局事件)
    4.success
    5.ajaxSuccess(全局事件)
    6.error
    7.ajaxError (全局事件)
    8.complete
    9.ajaxComplete(全局事件)
   10.ajaxStop(全局事件
------------------------------------*/

(function($, win, undefined){
	//全局变量
	$.junAjax = {};

	win.junAjax = function(param){
		var $loading = null,
			ajaxParam = {};

		param = $.extend(true, {
	 		target: "body",  //加载图标父元素, null-无加载图标
	 		position: "fixed",  //定位方式
	 		fadeOut: true,  //加载图标渐隐
	 		newClass: "",  //样式
			url: "",
	 		type: "GET",
	 		dataType: "json",
	 		timeout: 30000,
	 		cache: false,
	 		error: function(XMLHttpRequest, textStatus, errorThrown){ console.log("[junAjax] 请求失败！"); }
		}, $.junAjax, param);

	 	if(param.target != null){
	 	//有加载图标
	 		$loading = $('<div class="jun-loading '+param.newClass+'" style="position: '+param.position+'">');
	 	}
		
		for(var name in param){
			if(param.hasOwnProperty(name)){
				if(!("target" == name || 
					"fadeOut" == name || 
					"position" == name || 
					"style" == name))
				{
					ajaxParam[name] = param[name];
				}
			}
		}
		
		ajaxParam.beforeSend = function(XMLHttpRequest){
			if(param.target != null){
				$loading.appendTo(param.target);
			}
			if(typeof param.beforeSend != "undefined"){
				param.beforeSend(XMLHttpRequest);
			}
		};

		ajaxParam.complete = function(XMLHttpRequest, textStatus){
			if(param.target != null){
				if(param.fadeOut){
				//渐隐效果
					$loading.fadeOut("slow", function(){
						$(this).remove();
					});
				}else{
					$loading.remove();
				}
			}
			if(typeof param.complete != "undefined"){
				param.complete(XMLHttpRequest, textStatus);
			}
		};

		$.ajax(ajaxParam);
	};
})(jQuery, window);