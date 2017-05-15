<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.sucsoft.zsxh.core.entity.system.*,cq.base.util.BaseUtil"%>
<%@page import="orm.Authoxoperate"%>
<%@page import="com.sucsoft.authox.item.PageOperateItem"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd HTML 4.01 Transitional//EN" "http://www.w3.org/tr/html4/loose.dtd">
<html>
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">

		<title>操作信息</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<link href="css/framework/table.css" type=text/css rel=stylesheet>
		<link href="css/framework/module.css" type=text/css rel=stylesheet>
		<link href="css/jquery/jquery.autocomplete.css" type=text/css
			rel=stylesheet>
		<LINK href="css/jquery/jquery.datepicker.css" type="text/css"
			rel="stylesheet">
		<link href="css/framework/dialog.css" rel="styleSheet" />
		<SCRIPT language=javascript src="js/jquery/jquery.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/form.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/table.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/module.js"></SCRIPT>
		<script type="text/javascript" src="js/jquery/jquery.datepicker.js"></script>
		<script type="text/javascript" src="js/jquery/jquery.autocomplete.js"></script>
		<%
	  	Object data = request.getAttribute("data"); 
	  	String type = request.getParameter("type");
	  	String action = "authox/pageOperate_addJson.action";
	  	String title="新增";
		String disabled = "";
	  	if (data != null) {
			if("detail".equals(type)){
				title = "详情";
				disabled = "disabled='disabled'";
			}else{
				title = "编辑";
			}
			action = "authox/pageOperate_updateJson.action";
		}
	  	PageOperateItem pageOperate= (PageOperateItem)data;
	  	if(pageOperate==null){
		  	pageOperate=new PageOperateItem();
	 	}
	  %>
	</head>

	<body>
		<form action="<%=action%>" method="post">
			<div class="module default">
		    	<div class="title">
		    		<div class="item selected">角色<%=title %></div>	
		    	</div>
		    	<div class="content" style="height:100%;">
		    		<div class="item selected" style="padding:10px;">    
						<table class="detailTable" border="1">
							<tbody>
								<tr>
									<th width="20%">
										操作编号
									</th>
									<td width="30%">
										<input name="code" class="null" title="操作编号" <%=disabled %> value="<%=pageOperate.getCode()!=null?pageOperate.getCode():"" %>" />
									</td>
								</tr>
								<tr>
									<th width="20%">
										操作名称
									</th>
									<td width="30%">
										<input class="null" title="操作名称" name="name" <%=disabled %> value="<%=pageOperate.getName()!=null?pageOperate.getName():""%>" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="submit">
	    		<center>
					<%
					if(!"detail".equals(type)){
					%>
					<input class="saveBtn" type="button" value=" 保 存 "
						<%=disabled%> />
					<%} %>
					<!--<input type="button" value="关 闭" onclick="window.close()" />-->
				</center>
	    	</div>
		</form>
	</body>
</html>
