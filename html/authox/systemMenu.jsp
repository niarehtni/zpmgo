<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//Dtd HTML 4.01 Transitional//EN" "http://www.w3.org/tr/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
	<%
			
			String path = request.getContextPath();
			String basePath = request.getScheme() + "://"
					+ request.getServerName() + ":" + request.getServerPort()
					+ path + "/";
					
	%> 
		<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>菜单管理</title>
		<link href="css/jquery.autocomplete.css" type=text/css
			rel=stylesheet>
		<link href="css/jquery/jquery.flexigrid.css" type="text/css"
			rel="stylesheet" />
		<link href="css/jquery/jquery.alerts.css" type="text/css"
			rel="stylesheet" />
		<LINK href="css/jquery/jquery.datepicker.css" type="text/css"
			rel="stylesheet">
		<%--
		<link href="css/framework/module.css" type=text/css rel=stylesheet>
		--%>
		<SCRIPT language=javascript src="js/jquery/jquery.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/form.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/module.js"></SCRIPT>
		<SCRIPT language=javascript src="js/jquery/jquery.flexigrid.js"></SCRIPT>
		<SCRIPT language=javascript src="js/jquery/jquery.alerts.js"></SCRIPT>
		<script>
		var openHeight=window.screen.height;
		var openWidth=window.screen.width;
		if(openWidth>1280){
			openWidth=1280;
		}
		$(document).ready(function() {
	
		var q={
			//title:'菜单数据',
			url : 'authox/asystemMenu_listJson.action',			
			colModel : [ {
					name : 'code',
					display : '菜单编号',
					width : 100,
					sortable : true
				},{
					name : 'name',
					display : '菜单名',
					width : 120,
					sortable : true
				},{
					name : 'team',
					display : '上级菜单',
					width : 120,
					sortable : true
				}
				],
			form : $("form"),
			sortname : 'code',
			sortorder : 'asc',
			add:{
					url : "<%=basePath%>html/authox/systemMenuManager.jsp",
					width : 600,
					height : 200,
					primaryKey : "systemMenuItem.code",
					name:"新增",
					success : function() {
						///**alert("修改成功");**/
					},
					error : function() {
						///**alert("新增失败");**/
					}
				},
			edit:{
            	url:"<%=basePath%>authox/systemMenu_get.action?type=edit",
            	width:600,height:270,
            	primaryKey:"systemMenuItem.code",
            	success:function(){},
            	name:"编辑",
            	error:function(){alert("修改失败");}},
           	detail:{
               	url:"<%=basePath%>authox/systemMenu_get.action?type=detail",
               	width:600,height:270,
               	name:"详情",
               	primaryKey:"systemMenuItem.code",
               	success:function(){},
               	error:function(){}},
			deletes : {
				url : "<%=basePath%>authox/systemMenu_deletesJson.action",
				primaryKey : "systemMenuItem.codes",
				success : function() {
					///**alert("删除成功");**/
				},
				error : function() {
					///**alert("删除失败");**/
				}
			}
		};	
	
	 q.form = $("#qj")
	 $(".qj").flexigrid(q);
	
	});
		
	</script>
	</head>
	<body>
		<form id="qj" action="<%=basePath%>authox/systemMenu_listJson.action">
			<table class="searchTable">
				<tr>
					<td>
						菜单名<input type="text" name="systemMenuItem.name">
					</td>
				</tr>
			</table>
		</form>
		<div class="content" style="display: block;">
			<table id="grid" class="listTable qj" border="1">
			</table>
		</div>	
	</body>
</html>
