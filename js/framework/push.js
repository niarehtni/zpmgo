var ii=0;
(function(w) {
	function Push(param){
		var type={
			option:{
				form:false,
				dataType:"json",
				url:false,
				timeout:40*1000,
				index:0,
				isStop:false,
				callBack:function(data){}
			},
			initParam:function(param){
				if(param){
					for(var name in param){
						this.option[name]=param[name];
					}
				}
			},
			destory:function(){
				this.option.isStop=true;
			},
			request:function(){
				ii++;
				console.log("第"+ii+"访问");
				var _this=this;
				var data="";
				var url="";
				var method="get";
				if(_this.option.form){
					var form=_this.option.form;
					if(form.attr("action")){
						url=form.attr("action");
					}
					if(form.attr("method")){
						method=form.attr("method");
					}
					data=form.serialize();
				}
				if(_this.option.url){
					url=_this.option.url;
				}
				
				if(url.indexOf("?")>0)
				{
					url=url+"&time="+new Date().getTime();
				}else
				{
					url=url+"?time="+new Date().getTime();
				}
				
				$.ajax({
					url: url,
					type: method,
					data:data,
					dataType: _this.option.dataType,
					timeout: _this.option.timeout,
					error: function(data){
						if(!_this.option.isStop){
							_this.request();
						}
					},
					success: function(data){
						if(!_this.option.isStop){
							_this.request();
							_this.option.callBack(data);
						}
					}
				});
			}
		};
		type.initParam(param);
		type.request();
		return type;
	}
	w.Push=Push;
})(window);