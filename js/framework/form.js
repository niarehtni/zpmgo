var debug=false;
window.returnValue='none';
var selectClone;
var formParam={
		form:false,
		checkBefore:function(){return true},
		check:function(form){
			if(debug){
				alert("调试模式,忽略验证");
				return true;
			}
			
			/**验证空字符串**/
			var objs=form.find(".null");
			for(var i=0;i<objs.length;i++){
				if(!checkNull($(objs.get(i))))
				{
					return false;
				}
			}
			
			/**验证密码长度**/
			objs=form.find(".pwd");
			for(var i=0;i<objs.length;i++){
				if(!checkPassworkLength($(objs.get(i))))
				{
					return false;
				}
			}
			
			/**验证数字**/
			objs=form.find(".num");
			for(var i=0;i<objs.length;i++){
				if(!checkNum($(objs.get(i))))
				{
					return false;
				}
			}
			
			/**验证数字**/
			objs=form.find(".integer");
			for(var i=0;i<objs.length;i++){
				if(!checkInteger($(objs.get(i))))
				{
					return false;
				}
			}

			/**验证日期**/
			objs=form.find(".date");
			for(var i=0;i<objs.length;i++){
				if(!checkDate($(objs.get(i))))
				{
					return false;
				}
			}

			
			/**验证电话**/
			objs=form.find(".phone");
			for(var i=0;i<objs.length;i++){
				if(!checkPhone($(objs.get(i))))
				{
					return false;
				}
			}
			
			/**验证正数**/
			objs=form.find(".plus");
			for(var i=0;i<objs.length;i++){
				if(!checkPlus($(objs.get(i))))
				{
					return false;
				}
			}
			/**验证备注的字数**/
			objs=form.find(".length");
			for(var i=0;i<objs.length;i++){
				if(!checkLength($(objs.get(i))))
				{
					return false;
				}
			}
			/**验证相同输入**/ 
			objs=form.find(".copy");
			for(var i=0;i<objs.length;i++){
				if(!checkCopy($(objs.get(i))))
				{
					return false;
				}
			}

			/**验证最大长度限制**/
			objs=form.find("[checkMaxLength]");
			for(var i=0;i<objs.length;i++){
				if(!checkMaxLength($(objs.get(i))))
				{
					return false;
				}
			}

			/**验证最小长度限制**/
			objs=form.find("[checkMinLength]");
			for(var i=0;i<objs.length;i++){
				if(!checkMinLength($(objs.get(i))))
				{
					return false;
				}
			}
			
			/**验证是否有重复**/
			objs=form.find("[checkExistUrl]");
			for(var i=0;i<objs.length;i++){
				if(!checkExist($(objs.get(i)),false))
				{
					return false;
				}
			}
			
//			/**验证小数点位数默认4位，可通过设定placesNum的值自定义限定位数**/
//			objs=form.find(".decimal");
//			for(var i=0;i<objs.length;i++){
//				if(!checkDecimal($(objs.get(i))))
//				{
//					return false;
//				}
//			}
			
			return true;
		},
		checkBack:function(){return confirm("是否确定提交数据?")},
		callBack:function(){return true;}
	};
$(document).ready(function(){
//	document.body.contentEditable = "true";
	
	/**验证是否有重复**/
	$("[checkExistUrl]").change(function(){
		if($(this).val().length>0){
			if(!checkExist($(this),true))
			{
				return false;
			}
		}
	});
	$("form").find(":disabled").attr("readonly","readonly");
	$("form").find(":disabled").attr("disabled","");
	$("input.saveBtn,input.updateBtn").click(function(event){
		//$(this).attr("disabled","disabled");
		save({});
	});
	
	$(".editBtn").click(function(){
		edit();
	});
	$("form").filter(function(){
		return $(this).attr("class")!="notJson";
	}).submit(function(){
		return false;
	});
	$("form").filter(function(){
		return $(this).attr("class")!="notJson";
	}).keydown(function(event){
		if(event.keyCode==13)
		{
			if(event.srcElement.tagName!='TEXTAREA')
			{
				$(".saveBtn,.updateBtn").eq(0).click();
			}
		}
	});
	//$("input,textArea,select").eq(0).focus();
	
	
	/**
	 * 级联下拉
	 */
	selectClone=$("<select></select>");
	var selects=$(".cascade");
	for(var i=0;i<selects.length;i++){
		var select=selects.eq(i);
		var options=select.find("option[value!='']");
		select.attr("cascadeType","select_"+i);
		options.attr("cascadeType","select_"+i);
		selectClone.append(options.clone());
	}
	$(".cascade").change(function(){
		var childClass=$(this).attr("childClass");
		
		var fathers=$("[childClass='"+childClass+"']");

//		var id=$(this).find("option:selected").attr("id");
//		var key=$(this).attr("key");
		var keyStr="";
		var noKeyStr="";
		var allKeyStr="";
		for(i=0;i<fathers.length;i++){
			var father=fathers.eq(i);
			var key=father.attr("key");
			var id=father.find("option:selected").attr("id");
			if(id!=null&&id!=''){
				keyStr+="["+key+"='"+id+"']";
				noKeyStr+="["+key+"!='"+id+"']";
				allKeyStr+="["+key+"]";
			}
		}
		$("."+childClass+" option"+allKeyStr).not("[value='']").remove();
		
		$("select."+childClass).append(selectClone.find("option[cascadeType='"+$("."+childClass).attr("cascadeType")+"']"+keyStr).clone());
		$("li."+childClass+noKeyStr).hide();
		$("li."+childClass+keyStr).show();
		$("li."+childClass+keyStr).find("label,input").show();
		
		
		cascade($("."+childClass));
	});
	
	$("select.cascade[selected='second']").each(function(){
		$(this).find("option:first").next().attr("selected","selected");
		$(this).change();
	});
	/**
	 * 
	 */
//	$("form").find(".num").keydown(function(event){
//		//考虑小键盘上的数字键
//		if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||event.keyCode==8||event.keyCode==37||event.keyCode==39||event.keyCode==46||event.keyCode==189||event.keyCode==110||event.keyCode==190||event.keyCode==9))
//		{
//			event.returnvalue=false;
//			return false;
//		}
//	});
});

function showDialog(url,width,height,callBack)
{
	//window.parent.showFillFrame();
	if(url.indexOf("?")>0)
	{
		url=url+"&time="+new Date().getTime();
	}else
	{
		url=url+"?time="+new Date().getTime();
	}
	var result=window.showModalDialog(url,window.parent,'dialogWidth:'+width+'px;dialogHeight:'+height+'px');
	//pageskip(url,width,height,"员工");
	if(result)
	{
		$(callBack);
	}
	window.parent.hiddenFillFrame();
}

function edit()
{
	$("form").find("[title!='read-only']:disabled").attr("disabled","");
	$("form").find("input[title!='read-only'],textArea,select").attr("readonly","");
	$(".editBtn").attr("disabled","disabled");
}
function save(){
	var param={
		form:$("form"),
		callBack:function(json){
			if(json.resultBean.result=='true')
			{
//				window.returnValue=json.resultBean.message;
//				window.close();
				top.removeTab({index:document.body.attributes['framework'].nodeValue,callBackParam:json.resultBean.message});
			}else
			{
				window.returnValue='error';
				$(".message").text("保存失败");
				if(json.resultBean.message.length>0){
					alert(json.resultBean.message);
					param.form.find("input[title!='read-only'],textArea,select").attr("disabled","");
				}
				$(".saveBtn,updateBtn").attr("disabled","");
			}	
		}
	};
	submitForm(param);
}
function save(param)
{
	param = $.extend({
		form:$("form"),
		callBack:function(json){
			if(json.code == '200')
			{
				top.removeTab({index:document.body.attributes['framework'].nodeValue,callBackParam:json.data});
			}else
			{
				if(json.data.length>0){
					alert(json.data);
					//param.form.find("input[title!='read-only'],textArea,select").attr("disabled","");
				}
				//$(".saveBtn,updateBtn").attr("disabled","");
			}	
		}
	},param);
	submitForm(param);
}


/**
 * 异步提交表单
 * @param form form的jquery对象
 * @param callBack 回调方法
 */
function submitForm(param)
{
	param = $.extend(formParam,param);
	if(param.checkBefore()&&param.check(param.form)&&param.checkBack()){
		showFillFrame();
		if(param.form.attr("class")!=null&&param.form.attr("class").indexOf("notAjax")>=0){
			param.form.get(0).submit();
			//hiddenFillFrame();
			return true;
		}
		var data=param.form.serialize();
		var url=param.form.attr('action');
		//确保不会因为路径缓存问题，而不提交数据
		if(url.indexOf("?")>0)
		{
			url=url+"&time="+new Date().getTime();
		}else
		{
			url=url+"?time="+new Date().getTime();
		}
		$.ajax({
			url: url,
			type: 'post',
			data:data,
			dataType: 'json',
			timeout: 30000,
			error: function(json){
				param.form.find("input[title!='read-only'],textArea,select").removeAttr("disabled","");
				param.form.find("input[title!='read-only'],textArea,select").removeAttr("readonly","");
				hiddenFillFrame();
				json={
					resultBean:{
						result:false,
						message:'提交超时'
					}
				}
				param.callBack(json);
			},
			success: function(json){
				param.form.find("input[title!='read-only'],textArea,select").removeAttr("disabled","");
				param.form.find("input[title!='read-only'],textArea,select").removeAttr("readonly","");
				hiddenFillFrame();
				param.callBack(json);
			}
		});
		param.form.find("input[title!='read-only'],textArea,select").attr("disabled","disabled");
	}
}
/**
 * 异步提交表单
 * @param url 路径
 * @param success 成功回调方法
 * @param error 异常回调方法
 */
function submitUrl(url,success,error)
{
	//确保不会因为路径缓存问题，而不提交数据
	if(url.indexOf("?")>0)
	{
		url=url+"&time="+new Date().getTime();
	}else
	{
		url=url+"?time="+new Date().getTime();
	}
	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		timeout: 30000,
		error:error,
		success: success
	});
}
/**
 * 验证数字
 * @param obj
 * @return
 */
function checkNum(obj){
	var num=obj.val();
	if(num.length>0){
		if(num.search(/^-?[0-9]*(\.\d*)?$/) <0){
			alert(obj.attr("title")+"数字格式有误!");
			obj.focus();
			return false;
		}
	}
	return true;
}
/**
 * 验证数字
 * @param obj
 * @return
 */
function checkInteger(obj){
	var num=obj.val();
	if(num.length>0){
		if(num.search(/^-?[0-9]*(\.\d*)?$/) <0||num.indexOf(".")>0){
			alert(obj.attr("title")+"必须为整数!");
			obj.focus();
			return false;
		}
	}
	return true;
}
/**
 * 验证空字符串
 * @param obj
 * @return
 */
function checkNull(obj){
	if(obj.val()==null||obj.val().length==0){
		alert(obj.attr("title")+"不能为空!");
		obj.focus();
		return false;
	}
	return true;
}

function checkPassworkLength(obj){
	if(obj.val().length<6){
		alert("请输入6到12位"+obj.attr("title")+"!");
		obj.focus();
		return false;
	}
	return true;
}
/**
 * 验证最大长度
 * @param obj
 * @return
 */
function checkMaxLength(obj){
	if(obj.val().length>parseFloat(obj.attr("checkMaxLength"))){
		alert(obj.attr("title")+"长度不能多于"+obj.attr("checkMaxLength")+"字!");
		obj.focus();
		return false;
	}
	return true;
}
/**
 * 验证最大长度
 * @param obj
 * @return
 */
function checkMinLength(obj){
	if(obj.val().length<parseFloat(obj.attr("checkMinLength"))){
		alert(obj.attr("title")+"长度不能少于"+obj.attr("checkMinLength")+"字!");
		obj.focus();
		return false;
	}
	return true;
}

/**
 * 验证日期
 * @param obj
 * @return
 */
function checkDate(obj){
	var pattern = /^((\d{2}(([02468][048])|([13579][26]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0[0-9])|(2[0-3])|(1[0-9]))\:([0-5][0-9])\:([0-5][0-9])))?$/;
	if(obj.val().length>0){
		if(obj.val().search(pattern)<0){
			alert(obj.attr("title")+"日期格式有误");
			obj.focus();
			return false;
		}
	}
	return true;
}

/**
 * 验证电话及手机
 * @param obj
 * @return
 */
function checkPhone(obj){
	/**
	var phone=obj.val();
	if(phone.length>0)
	{
		if (!(phone.search(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/) != -1||phone.search(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/) != -1)){    
			alert(obj.attr("title")+"电话或手机格式有误");
			obj.focus();
			return false;
		}
	}
	**/
	return true;
}

/**
 * 验证正数
 * @param obj
 * @return
 */
function checkPlus(obj){
	var num=obj.val();
	if(num.length>0){
		if(parseFloat(num)==null||parseFloat(num)<0){
			alert(obj.attr("title")+"只能为正数!");
			obj.focus();
			return false;
		}
	}
	return true;
}
/**
 * 验证备注字数
 * @param obj
 * @return
 */
function checkLength(obj){
	var len=obj.val();
	var wordlen=obj.attr("wordlen");
	if(len.length>wordlen){
		alert(obj.attr("title")+"的字数不得超过"+wordlen+"个字!");
		obj.focus();
		return false;
	}
	return true;
}
/**
 * 验证两次输入是否相同
 * @return
 */
function checkCopy(obj){
	var objs=$("[copy='"+obj.attr("copy")+"']");
	for(var i=0;i<objs.length;i++){
		if($(objs.get(i)).val()!=obj.val())
		{
			alert(obj.attr("title")+"和"+$(objs.get(i)).attr("title")+"输入值不一致!");
			obj.focus();
			return false;
		}
	}
	return true;
}
/**
 * 验证小数位(默认4位，可定义placesNum值自定义小数位)
 * @param obj
 * @return
 */
function checkDecimal(obj){	
	var decimal=obj.val();
	decimal=decimal.replace(/^\s+|\s+$/g,""); //去掉空格
	var dLength=decimal.length;
	var placesNum;
	placesNum=obj.attr("placesNum");
	if(placesNum==null||placesNum==undefined){
		placesNum=4;
	}
    if(decimal.indexOf(".")>0){
    	var places=dLength-decimal.indexOf(".")-1;
    	if(places>placesNum){
    		alert(obj.attr("title")+"的小数位超过"+placesNum+"位，请重新输入!");
    		obj.focus();
    		return false;
    	}
    }
	return true;	
}

function checkExist(obj,async){
	if(async==null){
		async=true;
	}
	var checkExistUrl=obj.attr("checkExistUrl");
	var value=obj.val();
	var result=false;
	if(value||value.length>0){
		$.ajax({
            type: "GET",
            url: checkExistUrl+value,
            dataType: "json",
            async:async,
            success: function (data) {
                // Play with returned data in JSON format
				result=data.rows.length==0;
				if(!result){
					alert("该"+obj.attr("title")+"已经存在，请重新输入!");
					obj.focus();
				}
            },
            error: function (msg) {
            }
        });
	}
	return result;
}


var fillDiv;
/**
 * 弹出遮盖层
 *
 **/
function showFillFrame()
{
	//alert(document.documentElement.clientHeight+","+document.body.clientHeight+","+document.body.offsetHeight+","+window.screen.availHeight+","+document.body.scrollHeight);
	var fillDiv=$("#fillDiv");
	if(fillDiv.size()==0){
        $(document.body).append("<div id='fillDiv' style='height:"+document.body.scrollHeight+"px;'><div><img src='"+getProjectPath()+"/images/loading.gif' alt='正在加载...' /></div></div>");
	}else
	{
		$("#fillDiv").css({"display":"block"});
	}
}
/**
 * 隐藏遮盖层
 *
 **/
function hiddenFillFrame()
{
	$("#fillDiv").css({"display":"none"});
}
/**
 * 转换为浮点数
 * @param str 待转换的数据
 * @param size 保留的小数位
 * @return
 */
function parseDoubleStr(str,size){
	var value=parseFloat(str);
	var count=1;
	if(size==null){
		size=3;
	}
	for(var i=0;i<size;i++){
		count=count*10;
	}
	return Math.round(value * count) / count;
//	return value.toPrecision(size);
}

/**
 * 浮点数格式化
 * @param str 待转换的数据
 * @param size 保留的小数位
 * @return
 */
function doubleFormat(str,length){
	if(length==null){
		length=3;
	}
	var value=parseFloat(str);
	if(value==null){
		return str;
	}
	var count=1;
	for(var i=0;i<length;i++){
		count=count*10;
	}
	var val=Math.round(value * count) / count+"";
	if(val!="NaN"&&length>0){
		if(val.indexOf('.')<0){
			val+=".";
		}
		while(val.substring(val.indexOf('.')).length<=length){
			val+="0";
		}
	}
	return val;
}
/**
 * 把时间字符串转换成绝对时间
 * 
 * @param datastr 时间格式为：2012-12-26 16:46:46
 * @return
 */
function parseDateTime(datastr) {
 var date = new Date();
 var perfex = datastr.split(" ")[0];
 var surfex = datastr.split(" ")[1]
 if (perfex) {
  var y = perfex.split("-")[0] / 1;
  //因为月是从0开始的，所以减一
  var m = perfex.split("-")[1] / 1-1;
  var d = perfex.split("-")[2] / 1;
  date.setFullYear(y, m, d);
 }
 if (surfex) {
  var h = surfex.split(":")[0] / 1;
  var m = surfex.split(":")[1] / 1;
  var s = surfex.split(":")[2] / 1;
  date.setHours(h, m, s, 0);
 }
 return date.getTime();
}
/**
 * 获取项目路径
 * @returns
 */
function getProjectPath(){
	var strFullPath=window.document.location.href;
	var strPath=window.document.location.pathname;
	var pos=strFullPath.indexOf(strPath);
	var prePath=strFullPath.substring(0,pos);
	var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
	return(prePath+postPath);
}

/**
 * 递归级联
 * @param obj
 * @return
 */
function cascade(obj){

	var childClass=$(obj).attr("childClass");
	var key=$(obj).attr("key");
	var child=$("."+$(obj).attr("childClass"));
	if(child.length>0&&(!child.attr("notMutiStage"))){
		$("."+childClass+" option["+key+"]").remove();
		var key=$(obj).attr("key");
		var option = $(obj).find("option");
		var checkbox = $("."+childClass).not("select");
		checkbox.hide();
		var optionc = selectClone.find("option[cascadeType='"+child.attr("cascadeType")+"']");
		for(var i=0;i<optionc.length;i++){
			for(var j=0;j<option.length;j++){
				if(optionc.eq(i).attr(key)==option.eq(j).attr("id")){
					$("select."+childClass).append(optionc.eq(i).clone());
					break;
				}
			}
		}
		for(var i=0;i<checkbox.length;i++){
			for(var j=0;j<option.length;j++){
				if(checkbox.eq(i).attr(key)==option.eq(j).attr("id")){
					checkbox.eq(i).show();
					checkbox.eq(i).find("input,label").show();
					break;
				}
			}
		}
		cascade(child);
	}
	
}

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

	$(win.document).find("head").prepend('<style>position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 9999;background: url(../../images/loading-124.gif) 50% 50% no-repeat;background-color: rgba(0, 0, 0, .5);-ms-filter: "progid:DXImageTransform.Microsoft.gradient (startColorstr=#7f000000, endColorstr=#7f000000)";filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000, endColorstr=#7f000000);</style>');
})(jQuery, window);