/**
 * Created by WeiJun_Xiang on 2016/04/09.
 */

$(function(){
	$("form").submit(function(){
		return false;
	});
});
function pageInit(param){

	param = $.extend(true, {
		action: "",  //PROJECTNAME/rest/o/ACTIONNAME,
		normal: true,  //正常数据获取
		parse: function(data){return data},  //数据解析
		before: function(type){ return false; },  //页面数据获取之前，处理事件
		after: function(data){ return false; },   //页面数据获取之后，处理事件
		otherCheck: null
	}, param);
	
	var type = _getRequest("type");

	//event before getting data
	if(param.before){
		param.before(type);
	}
	
	if(null == type && param.normal){
	//page of add
		$("form").attr("action", window.location.origin + "/" + param.action + "/add");
		_elementInit();
	}else{
	//page of edit or detail
		if("edit" == type && param.normal){
			$("form").attr("action", window.location.origin + "/" + param.action + "/update");
		}
		var url = "";
		if(param.normal){
			url = window.location.origin + "/" + param.action + "/get/" + window.location.hash.substring(1)
		}else{
			url = window.location.origin + "/" + param.action + window.location.hash.substring(1);
		}
		junAjax({
			url: url,
			success: function(json){
				if("string" == typeof json){
    		    	json = JSON.parse(json);
    		    }
    		    if("200" == json.code){
    		    	var data = param.parse(json.data);
        		    _elementInit(data);

        		    //event after getting data
        		    if(param.after){
        		    	param.after(data);
        		    }
    		    }else{
    		    	alert("数据获取失败！");
    		    }
			},
			error: function(){
				alert("数据获取失败！");
			}
		});
	}

	if(type != "detail"){
		//表单校验
		if(typeof formCheck != "undefined"){
			formCheck(document.getElementsByTagName("form")[0], {
				onCheckError: function(prompt){
					alert(prompt);
				},
				otherCheck: param.otherCheck
			});
		}
	}

	//表单元素初始化
	function _elementInit(data){
		var elements = document.getElementsByTagName("form")[0].elements;
		if("undefined" == typeof data){
		//no data, page of add
			for(var i=0,iLen=elements.length; i<iLen; i++){
				var value = elements[i].getAttribute("dvalue");
				elements[i].removeAttribute("dvalue");
				if(/^\{\{.+\}\}$/.test(value)){
				//判断是否符合格式{{field}}
					elements[i].setAttribute("value", "");

					if("TEXTAREA" == elements[i].tagName){
						elements[i].defaultValue = "";
					}
				}
			}
		}else{
		//hava data, page of edit or detail
			for(var i=0,iLen=elements.length; i<iLen; i++){
				var value = elements[i].getAttribute("dvalue");
				elements[i].removeAttribute("dvalue");
				if(/^\{\{.+\}\}$/.test(value)){
				//判断是否符合格式{{field}}
					var key = value.substring(2, value.length-2);
					var newValue = _check(data[key]);
					elements[i].setAttribute("value", newValue);
					
					if("SELECT" == elements[i].tagName){
						elements[i].value = newValue;
						for(var j=0,jLen=elements[i].length; j<jLen; j++){
							if(newValue == elements[i][j].value){
								elements[i][j].setAttribute("selected", "selected");
								break;
							}
						}
					}

					if("TEXTAREA" == elements[i].tagName){
						elements[i].defaultValue = newValue;
					}
				}

				if("detail" == type){
					if("SELECT" == elements[i].tagName){
						elements[i].setAttribute("disabled", "disabled");
					}else{
						elements[i].setAttribute("readonly", "readonly");
					}
				}
			}
		}
	}

	//校验空数据
	function _check(data){
		if(undefined == data || "null" == data){
			return "";
		}
		return data;
	}

	//关键字获取
	function _getRequest(name){
		var search = window.location.search;  //获取url中"?"符后的字串
		if(search.indexOf("?") != -1){
			search = search.substr(1);
			var strs = search.split("&");
			for(var i=0; i<strs.length; i++) {
				if(name == strs[i].split("=")[0]){
					return strs[i].split("=")[1];
				}
		    }
		}
		return null;
	};
}

//文件上传后页面生成的文件样式
var fileStyle = {
	creatFile: function(file, detailFlag){
		var $file = null;
		if("undefined" == typeof file.downloadUrl){
			file.downloadUrl = "javascript:;";
		}
		if(detailFlag){
		//详情
			$file = $(
				'<div class="jun-attachment detail">\
					<div class="jun-fiel-item jun-file jun-file-'+file.type+'"></div>\
					<div class="jun-fiel-item jun-file-info">\
						<div class="jun-file-title" title="'+file.name+'">'+file.name+'</div>\
						<span class="jun-file-size">'+file.size+'</span>\
					</div>\
					<div class="jun-fiel-item jun-file-btn">\
						<a class="jun-file-download" href="'+file.downloadUrl+'">下载</a>\
					</div>\
				</div>'
			);
		}else{
			$file = $(
				'<div class="jun-attachment">\
					<div class="jun-fiel-item jun-file jun-file-'+file.type+'"></div>\
					<div class="jun-fiel-item jun-file-info">\
						<div class="jun-file-title" title="'+file.name+'">'+file.name+'</div>\
						<div class="jun-file-other">\
							<progress max="100" value="0"></progress>\
							<div style="display:none">\
								<span class="jun-file-size">'+file.size+'</span>\
								<span class="jun-file-result">上传完成</span>\
							</div>\
						</div>\
					</div>\
					<div class="jun-fiel-item jun-file-btn" style="display:none">\
						<a class="jun-file-download" href="'+file.downloadUrl+'">下载</a>\
						<a class="jun-file-delete" title="点击删除">删除</a>\
					</div>\
				</div>'
			);
			$(".jun-file-delete", $file).on("click", function(){
				$(this).parents(".jun-attachment").fadeOut("normal", function(){
					$(this).remove();
				});
			});
		}
		return $file;
	},
	creatFileSimple: function(file, detailFlag){
	//简约式
		var $file = null;
		if("undefined" == typeof file.downloadUrl){
			file.downloadUrl = "javascript:;";
		}
		if(detailFlag){
		//详情
			$file = $(
				'<div class="jun-attachment detail size16">\
					<div class="jun-fiel-item jun-file jun-file-'+file.type+'"></div>\
					<a class="jun-file-title" title="'+file.name+'" href="'+file.downloadUrl+'">'+file.name+'</a>\
				</div>'
			);
		}else{
			$file = $(
				'<div class="jun-attachment size16">\
					<div class="jun-fiel-item jun-file jun-file-'+file.type+'"></div>\
					<a class="jun-file-title" title="'+file.name+'" href="'+file.downloadUrl+'">'+file.name+'</a>\
					<a class="jun-file-delete" title="点击删除">x</a>\
				</div>'
			);
			$(".jun-file-delete", $file).on("click", function(){
				$(this).parents(".jun-attachment").fadeOut("normal", function(){
					$(this).remove();
				});
			});
		}
		return $file;
	},
	createFilePicture: function(file, detailFlag){
		var $file = null;
		if("undefined" == typeof file.width || "undefined" == typeof file.height){
			file.width = 100;
			file.height = 100;
		}
		if(detailFlag){
		//详情
			$file = $(
				'<div class="jun-attachment picture" style="width:'+file.width+'px;height:'+file.height+'px;">\
					<img src="'+file.src+'">\
				</div>'
			);
		}else{
			$file = $(
				'<div class="jun-attachment picture" style="width:'+file.width+'px;height:'+file.height+'px;">\
					<img src="'+file.src+'">\
					<div class="empty"></div>\
				</div>'
			);
			$(".empty", $file).on("click", function(){
				$(this).parent().fadeOut("normal", function(){
					$(this).remove();
				});
			});
			//删除
			$(".empty", $file).on("click", function(){
				$(this).parent().fadeOut("normal", function(){
					$(this).remove();
				});
			});
		}
		//图片加载失败
		$("img", $file).on("error", function(){
			this.parentNode.error = true;
		});

		$("img", $file)[0].onload = function(){
			_sizeSet(this, "zOut");
		};
	
		//双击全屏预览
		$file.on("dblclick", function(){
			if(this.error){
				return false;
			}
			$(this).addClass("preview");
			_sizeSet($("img", this)[0], "zIn");
		});

		//单击缩小为原来尺寸
		$file.on("click", function(){
			if($(this).hasClass("preview")){
				$(this).removeClass("preview");
				_sizeSet($("img", this)[0], "zOut");
			}
		});
		
		//设置图片尺寸
		function _sizeSet(img, type){
			var refer = {},
				nature = {
					width: img.naturalWidth,
					height: img.naturalHeight
				},
				width =  null,
				height = null,
			    x_per = null,
				y_per = null,
				per = null;
			
			if("zIn" == type){
			//放大
				refer = {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				};
			}else{
			//缩小
				refer = {
					width: file.width,
					height: file.height
				};
			}
			
		    x_per = nature.width/refer.width;
			y_per = nature.height/refer.height;

			if(x_per > 1 || y_per > 1){
			//原图尺寸大于屏幕，需要缩小
				per = x_per > y_per ? x_per : y_per;
				width = nature.width/per;
				height = nature.height/per;
			}else{
				width = nature.width;
				height = nature.height;
			}
			img.style.width = width + "px";
			img.style.marginLeft = -width/2 + "px";
			img.style.marginTop = -height/2 + "px";
		}
		return $file;
	}
};