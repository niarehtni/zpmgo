(function(undefined){
	function Base(){
		this.basePath = "https://g.zpmgo.com/";
		this.basePathC = "https://c.zpmgo.com/";
		this.uploadBase = "https://file.zpmgo.com/api/upload/temp";
		this.downloadBase = "https://file.zpmgo.com/api/download/temp/";
	};

	Base.prototype.getBasePath = function(){
		return this.basePath;
	};

	Base.prototype.getBasePathC = function(){
		return this.basePathC;
	};

	Base.prototype.getUploadBase = function(){
		return this.uploadBase;
	};

	Base.prototype.getDownloadBase = function(){
		return this.downloadBase;
	};

	Base.prototype.editPwd = function() {
		var url="../html/_system/updatePwd.html";
		top.addTab({href:url,name:"修改密码",closeCallBack:function(result){
			
		},closeCheckBefore:function(){return confirm("是否确定关闭？")}});
	};

	Base.prototype.logout = function(){
		alert("预留功能");
	};

	Base.prototype.setUrl = function(url, cFlag){
		if(cFlag){
			return this.basePathC+url;
		}
		return this.basePath+url;
	};

	Base.prototype.getRequest = function(name) {
		var url = window.location.search;
		if(url.indexOf("?") != -1){
			url = url.substr(1);
			var strs = url.split("&");
			for(var i=0; i<strs.length; i++) {
				if(name == strs[i].split("=")[0]){
					return strs[i].split("=")[1];
				}
		    }
		}
		return null;
	};

	BASE = new Base();
})();
