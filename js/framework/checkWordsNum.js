$(document).ready(function(){
	var wordlen=$(".checkWordsNum").attr("wordlen");
	var parent=$(".checkWordsNum").parent();
	var div=$("<div class='checkNumDiv'><span>0</span>/"+wordlen+"</div>");
	parent.addClass("checkNumParent");
	//$(".checkNumParent").append(div);	
	parent.append(div);
	$(".checkWordsNum").keyup(function(){
		value=$(this).val().length;
		$(".checkNumDiv span").text(value);		
		if($(".checkWordsNum").val().length>wordlen){
			alert("您已经输入超过"+wordlen+"个字了！");
			return false;
		}
	});
	
});

function prompt(){
	if($(".checkWordsNum").val().length>120){
		alert("您已经输入超过120个字了！");
		return false;
	}
}

