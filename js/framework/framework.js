$(document).ready(function(){
	
	$("div.menu div span").click(function(event){
		$(".menu div").removeClass("selected");
		$(this).parent().addClass("selected");
	});
	
	$("div.menu div ul li").click(function(event){
		addTab(this);
	});
	
	$("div.menu div:first span").click();
	$("div.menu div ul li:first").click();
	
	$("div.nav div.tool i.closeBtn").click(function(i){
		$("div.nav div.banner ul li.default").click();
		$("div.nav div.banner ul li").not(".default").remove();
		$("div.body div.content").not(".default").remove();
	});

	$("div.nav div.tool i.screenBtn").click(function(i){
		$("div.nav").toggleClass("screen");
		$("div.body").toggleClass("screen");
		$("div.body div.content iframe").height($("div.body").height());
	});
	$("div.nav div.banner ul li").each(function(i){
		$(this).attr("index","f_i_"+i);
	});
	$("div.body div.content").each(function(i){
		$(this).attr("index","f_i_"+i);
	});
	
	
	$("div.nav div.banner ul li").click(function(i){
		$("div.nav div.banner ul li").removeClass("selected");
		$("div.body div.content").removeClass("selected");
		$(this).addClass("selected");
		$("div.body div.content[index='"+$(this).attr("index")+"']").addClass("selected");
	});
	$("div.nav div.banner ul i").click(function(i){
		if($(this).parent().attr("class").indexOf("selected")>=0){
			if($(this).parent().next().length>0){
				$(this).parent().next().click();
			}else if($(this).parent().prev().length>0){
				$(this).parent().prev().click();
			}
		}
		$("div.body div.content[index='"+$(this).parent().attr("index")+"']").remove();
		$(this).parent().remove();
	});
	$("div.body div.content iframe").height($("div.body").height());
	//a.framework({});
	//pushMessageInit();
});

function addTab(obj){
	var lis=$("div.nav div.banner ul li[index='"+$(obj).attr("index")+"']");
	if(lis.length>0){
		lis.click();
	}else{
		$("div.nav div.banner ul li").removeClass("selected");
		$("div.body div.content").removeClass("selected");
		if($(obj).attr("index")){
			index=$(obj).attr("index");
		}else{
			index="f_i_"+new Date().getTime();
			$(obj).attr("index",index);
		}
		var title=$(obj).attr("title");
		if(title==null||title.length==0){
			title=$(obj).text();
		}
		var li=$("<li class='selected' index='"+index+"'>"+title+"</li>");
		var i=$("<i></i>");
		li.append(i);
		if($("div.nav div.banner ul li.default").length>0){
			$("div.nav div.banner ul li.default").after(li);
		}else{
			$("div.nav div.banner ul").prepend(li);
		}
		var content=$("<div class='content selected' index='"+index+"'></div>");
		var iframe=$("<iframe src='"+$(obj).attr("href")+"' frameborder='0'></iframe>");
		content.append(iframe);
		iframe.height($("div.body").height());
		iframe.attr("height",$("div.body").height());
		$("div.body").append(content);
		li.click(function(i){
			$("div.nav div.banner ul li").removeClass("selected");
			$("div.body div.content").removeClass("selected");
			$(this).addClass("selected");
			$("div.body div.content[index='"+$(this).attr("index")+"']").addClass("selected");
		});
		i.click(function(i){
			if($(this).parent().attr("class").indexOf("selected")>=0){
				if($(this).parent().next().length>0){
					$(this).parent().next().click();
				}else if($(this).parent().prev().length>0){
					$(this).parent().prev().click();
				}
			}
			$("div.body div.content[index='"+$(this).parent().attr("index")+"']").remove();
			$(this).parent().remove();
		});
	}
}

/**
 * 消息推送初始化
 * @return
 */
function pushMessageInit(){
	var pushUrl=$("div.message").attr("href");
	if(pushUrl==null||pushUrl==''){
		pushUrl=getProjectPath()+"/system/messagePush_listJson.action";
	}
	try{
	var p=new Push({
		url: pushUrl,
		timeout:20*1000,
		callBack:function(data){
			$.each(data.rows,function(i,row){
				addMessage(row.mid,row.mtitle,row.mcontent,row.mhref);
			});
		}
	});
	}catch(e){}
}
/**
 * 添加一个消息显示
 * @param id
 * @param title
 * @param content
 * @param href
 * @return
 */
function addMessage(id,title,content,href){
	if($("div.message ul li#"+id).length<=0){
		window.focus();
	}
	$("div.message ul li#"+id).remove();
	var li=$("<li id='"+id+"' href='"+href+"' title='"+title+"'>" +content+
			"</li>");
	li.click(function(){
		addTab($(this));
		$(this).remove();
	});
	$("div.message ul").append(li);
//	li.mouseover(function() {
//		$(this).stop(true,false);
//		$(this).css({"opacity":1});
//    });
//	li.mouseout(function() {
//		$(this).fadeOut(30000,function(){
//			$(this).remove();
//		});
//    });
//	li.mouseout();
}