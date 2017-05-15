
$(document).ready(function(){
	$(".module .title .tool span.deleteBtn").click(removeView);

	$(".module .title .tool span.moreBtn").click(function(){
		parent.addTab(this);
	});
	$(".moduleList .content ul li").click(addView);
});

function addView(){

	var module=$("<div class='"+$(this).attr("classStr")+"'></div>");
	var title=$("<div class='title'></div>");
	var info=$("<div class='info'>"+$(this).text()+"</div>");
	var tool=$("<div class='tool'></div>");
	var moreBtn=$("<span class='moreBtn'>更多</span>");
	var deleteBtn=$("<span class='deleteBtn'>移除</span>");
	var content=$("<div class='content'></div>");
	var iframe=$("<iframe frameborder='0' scrolling='no' src='"+$(this).attr("src")+"' height='100%'></iframe>");
	title.append(info);
	title.append(tool);
	tool.append(moreBtn);
	tool.append(deleteBtn);
	content.append(iframe);
	module.append(title);
	module.append(content);
	$(".bottom").before(module);
	deleteBtn.click(removeView);
	moreBtn.click(function(){
		parent.addTab(this);
	});
	$(this).remove();
	
}

function removeView(){
	var li=$("<li src='"+$(this).parent().parent().parent().find("iframe").attr("src")+"' classStr='"+$(this).parent().parent().parent().attr("class")+"'>"+$(this).parent().parent().find(".info").text()+"</li>");
	li.click(addView);
	$(".moduleList .content ul").append(li);
	$(this).parent().parent().parent().remove();
	
}