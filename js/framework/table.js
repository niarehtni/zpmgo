
$(document).ready(function(){
	initDetail();
	liveRow();
	$(".listTable").find("tbody").find("tr").dblclick(function(event){
		//dbClickRow(this);
	});
	
	$(".listTable").find(":checkbox").click(function(event){
		selectRow(this);
	});
	
	$(".listTable tbody tr").click(function(event){
		if(event.srcElement.tagName.toLowerCase() !='input'){
			$(this).find(":checkbox").attr("checked",!$(this).find(":checkbox").attr("checked"));
			selectRow($(this).find(":checkbox"));
		}
	})
	$(".listTable,.detailTable").find("input.autoWidth").each(function(){
		if($(this).val().length>0){
			$(this).css({"width":"auto"});
			$(this).attr("size",($(this).val().length));
		}else{
			$(this).css({"width":"auto"});
			$(this).attr("size",1);
		}
	});
	$(".listTable,.detailTable").find("input.autoWidth").keyup(function(){
		if($(this).val().length>0){
			$(this).css({"width":"auto"});
			$(this).attr("size",($(this).val().length));
		}else{
			$(this).css({"width":"auto"});
			$(this).attr("size",1);
		}
	}).focus(function(){
		if($(this).val().length>0){
			$(this).css({"width":"auto"});
			$(this).attr("size",($(this).val().length));
		}else{
			$(this).css({"width":"auto"});
			$(this).attr("size",1);
		}
	}).blur(function(){
		if($(this).val().length>0){
			$(this).css({"width":"auto"});
			$(this).attr("size",($(this).val().length));
		}else{
			$(this).css({"width":"auto"});
			$(this).attr("size",1);
		}
	});
	$("input.null,select.null,textarea.null").not("input[type='hidden']").each(function(){
		var span=$("<span class='nullVal'>*</span>");
		$(this).after(span);
	});
	$(".fixTable").chromatable({});
});

function liveRow()
{
	$(".listTable,.detailTable").find("tbody").find("tr").each(function(index,obj){
		if(index%2==0)
		{
			$(obj).addClass("evenRow");
		}else
		{
			$(obj).addClass("singRow");
		}
	});
}
function initDetail(){
	$("form[detail]").find("textarea[readonly]").each(function(){
		var $this=$(this);
		var text=$this.text();
		var _parent=$this.parent();
		$this.remove();
		_parent.append(text);
	});
	$("form[detail]").find("select[readonly]").each(function(){
		var $this=$(this);
		var text=$this.find("option:selected").text();
		var _parent=$this.parent();
		$this.remove();
		_parent.append(text);
	});
	$("form[detail]").find("input[type='text'][readonly]").each(function(){
		var $this=$(this);
		var text=$this.val();
		var _parent=$this.parent();
		$this.remove();
		_parent.text(text);
	});
}

// JavaScript Document
function dbClickRow(rowObj)
{
	$(rowObj).parent().find("tr").removeClass("dbSelectRow");
	$(rowObj).addClass("dbSelectRow");
}
function selectRow(checkBoxObj)
{
	if($(checkBoxObj).attr("title")=="selectAll")
	{
		$(checkBoxObj).parent().parent().parent().parent().find(":checkbox").attr("checked",$(checkBoxObj).attr("checked"));
		if($(checkBoxObj).attr("checked"))
		{
			$(checkBoxObj).parent().parent().parent().parent().find("tbody").find("tr").removeClass("singRow evenRow");
			$(checkBoxObj).parent().parent().parent().parent().find("tbody").find("tr").addClass("selectRow");
		}else
		{
			$(checkBoxObj).parent().parent().parent().parent().find("tbody").find("tr").removeClass("selectRow");
			liveRow();
		}
	}else
	{
		if($(checkBoxObj).attr("checked"))
		{
			$(checkBoxObj).parent().parent().removeClass("singRow evenRow");
			$(checkBoxObj).parent().parent().addClass("selectRow");
		}else
		{
			$(checkBoxObj).parent().parent().removeClass("selectRow");
			liveRow();
		}
	}
	
}


(function($){ 
	$.chromatable = { 
	defaults: { 
	width: "900px", //設定容器寬度,待擴展程式 
	height: "300px", //設定容器高度,待擴展程式 
	scrolling: "yes" //yes跟隨IE滾動條而滑動, no固定在頁面上僅容器滾動條滑動 
	} 
	}; 
	$.fn.chromatable = function(options){ 
	var options = $.extend({}, $.chromatable.defaults, options);
	return this.each(function(){ 
	var $tableObj = $(this);
	var $uniqueID = $tableObj.attr("ID") + ("wrapper"); 
	var $class = $tableObj.attr("class"); 
	var $tableWidth = $tableObj.width(); 
	var top = $(this).offset().top; 
	var left = $(this).offset().left;
	var table=$("<table class='fixTable' id='"+$uniqueID+"' style='float:left;position:absolute;top:" +top+"px;left:"+left+"px;' width='"+$tableWidth+"' border='1' cellspacing='0' cellpadding='0'></table>");
	var thead=$("<thead>"+$("#"+$tableObj.attr("ID")).find("thead").html()+"</thead>");
	table.append(thead);
	$tableObj.before(table);
	
	var tempWidth= 
	$.each($("#"+$tableObj.attr("ID")).find("thead th"), function(i,item){ 
	$("#"+$uniqueID).find("thead th").eq(i).width($(item).width()); 
	$(item).width($(item).width()); 
	
	}); 

	if(options.scrolling === "yes") 
	{ 
	scrollEvent($tableObj.attr("ID"), $uniqueID); 
	} 
	resizeEvent($tableObj.attr("ID"), $uniqueID); 
	}); 

	function scrollEvent(tableId, uniqueID) 
	{ 
	var element = $("#"+uniqueID); 
	$(window).scroll(function(){ 
	var top = $("#"+tableId).offset().top; 
	var scrolls = $(this).scrollTop(); 

	if (scrolls > top) { 
	if (window.XMLHttpRequest) { 
	element.css({ 
	position: "fixed", 
	top: 0 
	}); 
	} else { 
	element.css({ 
	top: scrolls 
	}); 
	} 
	}else { 
	element.css({ 
	position: "absolute", 
	top: top 
	}); 
	} 

	}); 
	}; 

	function resizeEvent(tableId, uniqueID) 
	{ 
	var element = $("#"+uniqueID); 
	$(window).resize(function(){ 
	var top = $("#"+tableId).offset().top; 
	var scrolls = $(this).scrollTop(); 
	if (scrolls > top) { 
	if (window.XMLHttpRequest) { 
	element.css({ 
	position: "fixed", 
	top: 0 
	}); 
	} else { 
	element.css({ 
	top: scrolls 
	}); 
	} 
	}else { 
	element.css({ 
	position: "absolute", 
	top: top 
	}); 
	} 
	}); 
	} 
	}; 
	})(jQuery); 






