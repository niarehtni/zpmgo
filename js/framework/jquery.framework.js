$(function(){
	$("body").framework();
	window.addTab=function(p){
		return $("body").addTab(p);
	};
	window.removeTab=function(p){
		return $("body").removeTab(p);
	};
});
/**
 * author:陈琪
 * profile:主页
 * date:2014/09/06
 * version:1.0
 */
(function($){
	$.loading=function(t,p){
		var loading={
				initParam:function(t,p){
					loading.t=t;
					loading.p=$.extend({
						//background:"url(images/loading.gif) black center center no-repeat",
						opacity:0.5,
						zIndex:999,
						position:"absolute"
					},p);
				},
				initEvent:function(){
					
				},
				initView:function(){
					var $this=$(loading.t);
					var offset=$this.position();
					var left=offset.left;
					var top=offset.top;
					var width=$this.width();
					var height=$this.height();
					var fillDiv=$("<div class='fillDiv'>&nbsp;</div>");
					fillDiv.css({
						width:width,
						height:height,
						top:top,
						left:left,
						position:loading.p.position,
						opacity:loading.p.opacity,
						zIndex:loading.p.zIndex,
						background:loading.p.background
					});
					$this.append(fillDiv);
				},
				show:function(){
					var $this=$(loading.t);
					$this.find("div.fillDiv").show();
				},
				hide:function(){
					var $this=$(loading.t);
					$this.find("div.fillDiv").hide();
				},
				reload:function(){
					loading.initParam(t,p);
					loading.initEvent();
					loading.initView();
				}
		}
		t.loading=loading;
		loading.reload();
		return loading;
	}
	$.framework=function(t,p){
		var tf={
			initParam:function(t,p){
				tf.t=t;
				tf.p=$.extend({
					pushOption:false
				},p);
			},
			initEvent:function(){
//				$("div.menu div span").click(function(event){
				$("div.menu").delegate("div span","click",function(){
					$(".menu div").removeClass("selected");
					$(this).parent().addClass("selected");
				});
				
//				$("div.menu div ul li").click(function(event){
				$("div.menu").delegate("div ul li","click",function(){
					tf.addTab({obj:this});
				});
				
//				$("div.nav div.tool i.closeBtn").click(function(i){
				$("div.nav").delegate("i.closeBtn","click",function(){
					$("div.nav div.banner ul li.default").click();
					$("div.nav div.banner ul li").not(".default").remove();
					$("div.body div.content").not(".default").remove();
				});

//				$("div.nav div.tool i.screenBtn").click(function(i){
				$("div.nav").delegate("i.screenBtn","click",function(){	
					$("div.nav").toggleClass("screen");
					$("div.body").toggleClass("screen");
					$("div.body div.content iframe").height($("div.body").height());
				});
				
				$("div.nav").delegate("i.prevBtn","click",function(){	
					var selected = $("div.nav div.banner ul li.selected");
					var prev = selected.prev();
					if(prev.length==0)
						return;
					selected.removeClass('selected');
					prev.addClass('selected');
					$("div.body div.content[index='"+selected.attr("index")+"']").removeClass("selected");
					$("div.body div.content[index='"+prev.attr("index")+"']").addClass("selected");
				});
			
				$("div.nav").delegate("i.nextBtn","click",function(){	
					var selected = $("div.nav div.banner ul li.selected");
					var next = selected.next();
					if(next.length==0)
						return;
					selected.removeClass('selected');
					next.addClass('selected');
					$("div.body div.content[index='"+selected.attr("index")+"']").removeClass("selected");
					$("div.body div.content[index='"+next.attr("index")+"']").addClass("selected");
				});
				
//				$("div.nav div.banner ul li").click(function(i){
				$("div.nav").delegate("div.banner ul li","click",function(event){
					if(event.target.nodeName.toUpperCase()!="I"){
						$("div.nav div.banner ul li").removeClass("selected");
						$("div.body div.content").removeClass("selected");
						$(this).addClass("selected");
						$("div.body div.content[index='"+$(this).attr("index")+"']").addClass("selected");
					}
				});
				
//				$("div.nav div.banner ul i").click(function(i){
				$("div.nav").delegate("div.banner ul i","click",function(){
					tf.removeTab({index:$(this).parent().attr("index")});
//					if($(this).parent().attr("class").indexOf("selected")>=0){
//						if($(this).parent().next().length>0){
//							$(this).parent().next().click();
//						}else if($(this).parent().prev().length>0){
//							$(this).parent().prev().click();
//						}
//					}
//					$("div.body div.content[index='"+$(this).parent().attr("index")+"']").remove();
//					$(this).parent().remove();
				});
			},
			initView:function(){

				$("div.nav div.banner ul li").each(function(i){
					$(this).attr("index","f_i_"+i);
				});
				
				$("div.body div.content").each(function(i){
					$(this).attr("index","f_i_"+i);
				});
				
				$("div.menu div:first span").click();
				$("div.menu div ul li:first").click();
				$("div.body div.content iframe").height($("div.body").height());
			},
			initPush:function(){
				var pushUrl=$("div.message").attr("href");
				if(pushUrl==null||pushUrl==''){
					pushUrl=getProjectPath()+"/system/messagePush_listJson.action";
				}
				try{var p=new Push(tf.p.pushOption);}catch(e){}
			},
			changeStyle:function(){
				
			},
			addTab:function(param){
				param=$.extend({
					obj:false,
					href:false,
					name:false,
					title:false,
					closeCheckBefore:false,
					closeCallBack:false
				},param);
				var obj=param.obj;
				if(!obj){
					obj=$("<li href='"+param.href+"' title='"+param.title+"'></li>");
				}
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
					if(!param.name){
						param.name=$(obj).attr("title");
						if(param.name==null||param.name.length==0){
							param.name=$(obj).text();
						}
					}
					var li=$("<li class='selected' index='"+index+"'>"+param.name+"</li>");
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

					content.loading();
					iframe.load(function(){
						iframe.contents().find("body").attr("framework",index);
						if(!param.name){
							li.text(iframe.contents().find("title"));
						}
						content.loaded();
					});
					
					li.get(0).closeCheckBefore=param.closeCheckBefore;
					li.get(0).closeCallBack=param.closeCallBack;
				}
				return $(obj).attr("index");
			},
			removeTab:function(param){
				param=$.extend({
					index:false,
					callBackParam:false
				},param);
				var obj=$("div.banner ul li[index='"+param.index+"']");
				if(!param.callBackParam&&$(obj).get(0).closeCheckBefore){
					var callBeforeResult=$(obj).get(0).closeCheckBefore.apply(obj,[]);
					if(callBeforeResult==false){
						return false;
					}
				}
				if($(obj).get(0).closeCallBack){
					$(obj).get(0).closeCallBack.apply(obj,[param.callBackParam]);
				}
				if($(obj).attr("class").indexOf("selected")>=0){
					if($(obj).next().length>0){
						$(obj).next().click();
						//定制平台添加
						if($("div.body div.content[index='"+$(obj).next().attr("index")+"']").find("iframe").contents().find("input[type='text']").length>0){
							$("div.body div.content[index='"+$(obj).next().attr("index")+"']").find("iframe").contents().find("input[type='text']:eq(0)").focus();
						}else if($("div.body div.content[index='"+$(obj).next().attr("index")+"']").find("iframe").contents().find("textarea").length>0){
							$("div.body div.content[index='"+$(obj).next().attr("index")+"']").find("iframe").contents().find("textarea:eq(0)").focus();
						}//结束
					}else if($(obj).prev().length>0){
						$(obj).prev().click();
						//定制平台添加
						if($("div.body div.content[index='"+$(obj).prev().attr("index")+"']").find("iframe").contents().find("input[type='text']").length>0){
							$("div.body div.content[index='"+$(obj).prev().attr("index")+"']").find("iframe").contents().find("input[type='text']:eq(0)").focus();
						}else if($("div.body div.content[index='"+$(obj).prev().attr("index")+"']").find("iframe").contents().find("textarea").length>0){
							$("div.body div.content[index='"+$(obj).prev().attr("index")+"']").find("iframe").contents().find("textarea:eq(0)").focus();
						}//结束
					}
				}
				$("div.body div.content[index='"+param.index+"']").remove();
				$(obj).remove();
			},
			reload:function(param){
				tf.initParam(tf.t,param);
				tf.initEvent();
				tf.initView();
				tf.initPush();
			}
		};
		
		tf.reload(t,p);
		return tf;
	};
	
	$.fn.framework=function(param){
		var $this=this.get(0);
		if(!$this.tf){
			$this.tf=$.framework($this,param);
		}else{
			$this.tf.reload(param);
		}
	};
	
	$.fn.addTab=function(param){
		var $this=this.get(0);
		if($this.tf){
			return $this.tf.addTab(param);
		}
	};
	
	$.fn.removeTab=function(param){
		var $this=this.get(0);
		if($this.tf){
			return $this.tf.removeTab(param);
		}
	};
	
	$.fn.loading=function(param){
		this.each(function(){
			if(this.loading){
				this.loading.show();
			}else{
				$.loading(this,param);
			}
		});
	};
	
	$.fn.loaded=function(param){
		this.each(function(){
			if(this.loading){
				this.loading.hide();
			}
		});
	};
})(jQuery);