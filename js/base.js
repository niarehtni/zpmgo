(function(undefined){
	function Base(){};

	Base.prototype.editPwd = function() {
		var url="../html/system/changePwd.html";
		top.addTab({href:url,name:"修改密码",closeCallBack:function(result){
			
		},closeCheckBefore:function(){return confirm("是否确定关闭？")}});
	};

	BASE = new Base();
})();
