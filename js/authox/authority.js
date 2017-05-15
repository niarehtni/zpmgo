$(document).ready(function(){
	$("input").live("click",function(){
		if($(this).parent().parent().find('.object').attr("class")=="object"){
			var flag = false;
			if($(this).attr('checked')=="checked"){
				flag = true;
			}
			$(this).parent().parent().find('.object :checkbox').attr('checked',flag);
			$(this).parent().parent().find('.object').attr("class","object1");
		}else if($(this).parent().parent().find('.object1').attr("class")=="object1"){
			$(this).parent().parent().find('.object1 :checkbox').attr('checked',false);
			$(this).parent().parent().find('.object1').attr("class","object");
		}
		else{
			var objects = $(this).parent().parent().find('input:checkbox');
			var allcheck = true;
			$.each(objects,function(){
				if(!$(this).attr("checked")){
					allcheck = false;
				}
			});
			$(this).parent().parent().parent().find("legend").find("input").attr("checked",allcheck);
			if(allcheck){
				$(this).parent().parent().parent().find('.object').attr("class","object1");
			}
			else{
				$(this).parent().parent().parent().find('.object1').attr("class","object");
			}
		}
	});
	$('.title').each(function() {
		$(this).bind("click",function() {
			$('.title').css("background","#d22334");
			$(".item").css("display",'none');
			var i=$(this).attr("value");
			$("#"+i).css("display",'block');
			$(this).css("background","black");
		});
	});
	initAllCheck();
});

function initAllCheck(){
	var fieldset = $("fieldset");
	$.each(fieldset,function(){
		var all = $(this).find("legend").find("input");
		var check = $(this).find(".object").find("input:checkbox");
		var allchecked = true;
		$.each(check,function(){
			if($(this).attr("checked")!="checked"){
				allchecked = false;
			}
		});
		if(allchecked){
			$(all).attr("checked",true);
			$(this).find(".object").attr("class","object1");
		}
	})
}

function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
	var menu=document.getElementById(name+"_"+i);/* zzjs1 */
	var con=document.getElementById(name+"_"+i);/* con_zzjs_1 */
	menu.className=i==cursel?"hover":"";/*三目运算 等号优先*/
	con.style.display=i==cursel?"block":"none";
	}
}




