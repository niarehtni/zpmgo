<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="com.sucsoft.zsxh.core.util.SysInfo"%>
<!--<%@page import="com.sucsoft.zsxh.core.entity.system.DeptBean"%>-->
<%@page import="com.sucsoft.zsxh.core.entity.system.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String disabled="disabled='disabled'";
UserBean adminItem=(UserBean)request.getAttribute("adminItem");
//List<DeptBean> deptList=SysInfo.deptList;//(List<Department>)request.getAttribute("deptList");
%>

<!DOCTYPE HTML>
<html>
<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <base href="<%=basePath%>">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<!-- 自定义 -->
	<link rel = "stylesheet" type = "text/css" href = "css/system.css"/>

	<script type="text/javascript" src = "js/jquery/jquery-1.7.1.min.js"></script>
	<!-- 自定义 -->	
	<script type="text/javascript" src = "js/system/adminAdd.js"></script>
<title>贝因美后台管理</title>
</head>

<body>
	<form action="authox/admini_updateAdmin" method="post">
	<div class="page" id="content">
	    <div class="main" style="height: 360px;">
			<table class="info_basic" width="100%" align="center" cellpadding="0" cellspacing="0">
				<tr height="30px" bgcolor="#F6AF3D">
					<td colspan="2" align="center">
						<span class="info">管理员添加</span>
					</td>
				</tr>
				<tr height="20px">
					<td></td>
				</tr>
				<tr height="40px">
					<td align="right" width="30%">
						<span class="must">*</span> 用&nbsp;户&nbsp;名：
					</td>
					<td><input type="text" id="account" value="<%=adminItem.getuAccount() %>" readonly="readonly" /></td>
				</tr>
				<tr height="40px">
					<td align="right" width="30%">
						<span class="must">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：
					</td>
					<td><input type="text" name="adminItem.ename" id="aname" value="<%=adminItem.getuName()!=null?adminItem.getuName():"" %>" /></td>
				</tr>
				<tr height="40px">
					<!--  
					<td align="right" width="30%">
						<span class="must">*</span>所属部门：
					</td>
					<td>
						<select name="adminItem.deptBean.id" id="did">
						<%//for(DeptBean dept:deptList){ %>
							<option value="<%=//dept.getId()%>" <%=//adminItem.getDeptBean()!=null&&adminItem.getDeptBean().getId().equals(dept.getId())?"selected='selected'":"" %>><%=//dept.getdName() %></option>
						<%//} %>
						
						</select>
					</td>
					-->
				</tr>
				<tr height="40px">
					<td align="right" width="30%">
						性&nbsp;&nbsp;&nbsp;&nbsp;别：
					</td>
					<td>
						<input type="radio" value="0" <%=adminItem.getuSex()!=null&&adminItem.getuSex().equals("1")?"":"checked='checked'" %> name="adminItem.esex" /> 男 
						<input class="radio" type="radio" value="1" name="adminItem.esex" <%=adminItem.getuSex()!=null&&adminItem.getuSex().equals("1")?"checked='checked'":"" %>  /> 女
					 </td>
				</tr>
				<tr height="40px">
					<td align="right" width="30%">联系方式：</td>
					<td><input type="text" name="adminItem.etel" value="<%=adminItem.getuPhone()!=null?adminItem.getuPhone():"" %>" /></td>
				</tr>
				<tr height="40px">
					<td align="right" width="30%">电子邮箱：</td>
					<td><input type="text" name="adminItem.eemail" value="<%=adminItem.getuEmail()!=null?adminItem.getuEmail():"" %>" /></td>
				</tr>
				<tr height="50px">
					<td colspan="2" align="center">
						<input type="button" id="edit" value="编辑" style="width: 65px;"/>
				   		<input type="button" id="saveEdit" value="确定" style="width: 65px; display: none;" />
				    	<input type="reset" id="ret" value="重置" style="width: 65px; display: none;"/>
					</td>
				</tr>
			</table>
		</div>
	</div>
	</form>
</body>
</html>
