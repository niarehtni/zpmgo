$(function(){
	var selects=$("div.form-ui-select");
	
	//初始化
	selects.find("div.form-ui-option[selected]").each(function(){
		var select=$(this).parent();
		var name=select.attr("name");
		var value=$(this).attr("value");
		$(this).append("<input type='hidden' name='"+name+"' value='"+value+"' />");
	});
	
	selects.on("click","div.form-ui-option",function(){
		var select=$(this).parent();
		var all=select.find("div.form-ui-option");
		var multi=select.attr("multi");
		var title=select.attr("title");
		var name=select.attr("name");
		var value=$(this).attr("value");
		if(multi){
			var selected=$(this).attr("selected");
			if(selected){
				$(this).find("input").remove();
				$(this).removeAttr("selected");
			}else{
				$(this).append($("<input type='hidden' title='"+title+"' name='"+name+"' value='"+value+"' />"));
				$(this).attr("selected","selected");
			}
		}else{
			all.removeAttr("selected");
			$(this).attr("selected","selected");
			all.find("input[name='"+name+"']").remove();
			$(this).append($("<input type='hidden' title='"+title+"' name='"+name+"' value='"+value+"' />"));
		}
		
		var cascade=select.attr("cascade");
		if(cascade){
			var key=select.attr("key");
			if(!key){
				key=select.attr("name");
			}
			var cascadeSelect=$("[name='"+cascade+"']");
			var cascadeSelectOptions=cascadeSelect.find("div.form-ui-option["+key+"='"+value+"']").show()
			cascadeSelectOptions.find("input").removeAttr("disabled");
			cascadeSelect.find("div.form-ui-option").not(cascadeSelectOptions).hide().find("input").attr("disabled","disabled");
			
			
		}
	});
	
	//selects.find("div.form-ui-optionselected:first").click();
	

	/**附件上传***/
	$(".form-ui-file .form-ui-file-add").each(function(i){
		var label=$(this).find("label");
		var input=$(this).find("input[type='file']");
		var name=input.attr("name");
		var id=name+i;
		label.attr("for",id);
		input.attr("id",id);
		
	});
	
	$(".form-ui-file").on("click",".form-ui-file-item",function(){
		if(confirm("确定删除附件？")){
			$(this).parent().find("input[type='file']").val("");
			$(this).parent().find("input[type='file']").removeAttr("value");
			$(this).parent().find("label").text("添加附件");
			$(this).remove();
		}
	});
	
	$(".form-ui-file").on("change","input[type='file']",function(){
		var multi=$(this).attr("multi");
		var value=$(this).val();
		if(value&&value.length>0){
			if(multi){
				var newFileInput=$(this).clone();
				newFileInput.removeAttr("value");
				$(this).parent().append(newFileInput);
				
				var itemBtn=$("<div class='form-ui-file-item'>"+value.substr(value.lastIndexOf("\\")+1)+"</div>");
				$(this).parent().after(itemBtn);
				$(this).removeAttr("id");
				itemBtn.append($(this));
			}else{
					$(this).parent().parent().find(".form-ui-file-item").remove();
					$(this).parent().find("label").text("更改附件");
					var itemBtn=$("<div class='form-ui-file-item'>"+value.substr(value.lastIndexOf("\\")+1)+"</div>");
					var newFile=$(this).clone();
					newFile.removeAttr("id");
					itemBtn.append(newFile);
					$(this).parent().after(itemBtn);
			}
		}
	});
});