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
		<title>角色管理</title>
		<link rel="styleSheet" class="css" title="normal" href="css/framework/framework.css" />
		<link rel="styleSheet alternate" class="css" title="old" href="css/framework/framework_old.css" />
		<script src="js/jquery/jquery.js"></script>
		<script src="js/framework/css.js" type="text/javascript" language="javascript"></script>
		
		<link href="css/jquery/jquery.alerts.css" type="text/css" rel="stylesheet" />
		<link href="css/jquery/jquery.flexigrid.css" type="text/css" rel="stylesheet" />
		<script src="js/jquery/jquery.flexigrid.js"></script>
		<script language=javascript src="js/jquery/jquery.alerts.js"></script>
		<link href="css/framework/iframe.css" type="text/css" rel="stylesheet" />
		<script>
		var openHeight=window.screen.height;
		var openWidth=window.screen.width;
		if(openWidth>1280){
			openWidth=1280;
		}
		$(document).ready(function() {
	
		var q={
			//title:'角色数据',
			url : 'authox/role_listJson.action',			
			colModel : [ {
					name : 'role',
					display : '角色编号',
					width : 100,
					sortable : true,
					hide:'hide'
				},{
					name : 'name',
					display : '角色名',
					width : 120,
					sortable : true
				}
				],
			form : $("form"),
			sortname : 'role',
			sortorder : 'asc',
			add:{
					url : "<%=basePath%>html/authox/roleManager.jsp",
					width : 500,
					height : 180,
					primaryKey : "roleItem.role",
					name:"新增",
					success : function() {
						///**alert("修改成功");**/
					},
					error : function() {
						///**alert("新增失败");**/
					}
				},
			edit : {
				url : "<%=basePath%>authox/role_get.action?type=edit",
				width : 500,
				height : 180,
				primaryKey : "roleItem.role",
				name:"编辑",
				success : function() {
					///**alert("修改成功");**/
				},
				error : function() {
					///**alert("新增失败");**/
				}
			},
			detail : {
				url : "<%=basePath%>authox/role_get.action?type=detail",
				width : 500,
				height : 180,
				name:"详情",
				primaryKey : "roleItem.role",
				success : function() {
					///**alert("修改成功");**/
				},
				error : function() {
					///**alert("新增失败");**/
				}
			},
			deletes : {
				url : "<%=basePath%>authox/role_deletesJson.action",
				primaryKey : "roleItem.roles",
				success : function() {
					///**alert("删除成功");**/
				},
				error : function() {
					///**alert("删除失败");**/
				}
			},
			buttons:[
				{
				name : '编辑权限',
				bclass : 'editBtn',
				onpress : function(g){
					executeRow({
							url : "<%=basePath%>authox/role_editLimit.action",
							width:1000,
							height:600,
							primaryKey : "roleItem.role",
							name:"编辑权限",
							success : function() {
							
							},
							error : function() {
						
							}
							},g);
					}
				},{
				name : '关联员工',
				bclass : 'editBtn',
				onpress : function(g){
					executeRow({
							url : "<%=basePath%>authox/role_editUser.action",
							width:800,
							height:500,
							primaryKey : "roleItem.role",
							name:"关联员工",
							success : function() {
								//alert("审核成功");
							},
							error : function() {
								//alert("审核失败");
							}
							},g);
					}
				}]
		};	
	
	 q.form = $("#qj")
	 $(".qj").flexigrid(q);
	
	});
		
</script>
	</head>
	<body>
		<form id="qj" action="<%=basePath%>authox/role_listJson.action">
			<table class="searchTable">
				<tr>
					<td>
						角色名<input type="text" name="roleItem.name">
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
