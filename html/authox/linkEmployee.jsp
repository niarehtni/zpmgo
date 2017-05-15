<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.sucsoft.zsxh.core.entity.system.*,cq.base.util.BaseUtil"%>
<%@page import="com.sucsoft.zsxh.core.util.SysInfo"%>
<%@page import="orm.Authoxuser"%>
<%@page import="com.sucsoft.authox.item.RoleItem"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd HTML 4.01 Transitional//EN" "http://www.w3.org/tr/html4/loose.dtd">
<html>
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">

		<title>关联员工</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
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
		<!-- 自定义 -->
		<script type="text/javascript" src="js/authox/authority.js"></script>
		<%
		String disabled="";
	 	Object data=request.getAttribute("data");
		RoleItem roleItem=(RoleItem)data;
		if(roleItem==null)roleItem=new RoleItem();
		
		Object deptObject=request.getAttribute("deptList");
		Object userObject=request.getAttribute("userList");
	 	List<DeptBean> deptList = (List<DeptBean>)deptObject;
	 	if(deptList==null){
	 		deptList = new ArrayList<DeptBean>();
	 	}
	 	List<AdminUserBean> employeeList = (List<AdminUserBean>)userObject; 
	 	if(employeeList==null){
	 		employeeList = new ArrayList<AdminUserBean>();
	 	}
	 	List<Authoxuser> adminMap = (ArrayList<Authoxuser>)request.getAttribute("adminMap");
	 	%>
	</head>

	<body>
		<form action="authox/role_editRoleUser.action" method="post">
			<div class="module default">
		    	<div class="title">
		    		<div class="item selected">关联员工</div>	
		    	</div>
		    	<div class="content" style="height:100%;">
		    		<div class="item selected" style="padding:10px;">    
						<table class="detailTable" border="1">
							<tbody>
								<tr>
									<th>
										角色名:
									</th>
									<td>
										<input type="hidden" name="roleItem.role"
											value="<%=roleItem.getRole() %>" />
										<input type="text" name="name" id="roleItem.name"
											value="<%=roleItem.getName()!=null?roleItem.getName():"" %>"
											readonly="readonly" />
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<div class="tree" style="margin-top: 5px; padding-left: 3px;">
											<%
								int l=0,j=0;
								for(DeptBean dept:deptList){
										l++;
								%>
											<fieldset class="group" style="width: 96%;">
												<legend class="group_info">
													<input id="group<%=l %>" <%=disabled %> type="checkbox" />
													<label for="group<%=l%>"><%=dept.getName()%></label>
												</legend>
												<div class="object">
													<%for(AdminUserBean employee:employeeList){
										if(employee.getDept()!=null&&employee.getDept().equals(dept.getDid())){
											boolean isExist = false;//标识是否该客体的操作
											for (Authoxuser user:adminMap) {
												String account=user.getAccountname();
												if(account.equals(employee.getAuid())){
													isExist=true;
													break;
												}
											}
											j++;
									%>
													<div class="object_menu" style="float: left; width: 15%;">
														<input id="group<%=l+""+j %>" <%=disabled %>
															type="checkbox" name="oids"
															value="<%=employee.getAuid() %>"
															<%=isExist?"checked='checked'" : ""%> />
														<label for="group<%=l+""+j %>"><%=employee.getName() %></label>
													</div>
													<%}
													
													}%>
												</div>
											</fieldset>
											<%}%>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="submit">
	    		<center>
					<input class="saveBtn" type="button" value=" 保 存 "/>
					<!-- <input type="button" value="关 闭" onclick="window.close()" />-->
				</center>
	    	</div>
		</form>
	</body>
</html>
