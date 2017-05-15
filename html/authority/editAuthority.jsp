<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.sucsoft.authox.item.RoleItem"%>
<%@page import="orm.Authoxoperate"%>
<%@page import="orm.Authoxobject"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd HTML 4.01 Transitional//EN" "http://www.w3.org/tr/html4/loose.dtd">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>编辑权限</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link href="css/framework/table.css" rel="stylesheet" />
		<link href="css/framework/module.css" rel="stylesheet" />
		<link href="css/jquery/jquery.autocomplete.css" rel="stylesheet" />
		<LINK href="css/jquery/jquery.datepicker.css" rel="stylesheet" />
		<link rel="styleSheet" href="css/base.css" />
		
		<script src="js/jquery/jquery-1.8.3.min.js" ></script>
		<SCRIPT language=javascript src="js/dzpt/form.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/table.js"></SCRIPT>
		<SCRIPT language=javascript src="js/framework/module.js"></SCRIPT>
		<script type="text/javascript" src="js/jquery/jquery.datepicker.js"></script>
		<script type="text/javascript" src="js/jquery/jquery.autocomplete.js"></script>
		<!-- 自定义 -->
		<script type="text/javascript" src="js/authox/authority.js"></script>
		<script src="js/loading/loading.js" ></script>
		<script src="js/base.js"></script>
		<%
		String disabled="";
	 	Object data=request.getAttribute("data");
		RoleItem roleItem=(RoleItem)data;
		if(roleItem==null)roleItem=new RoleItem();
		
		Object firstObject = request.getAttribute("firstList");
		Object secondObject = request.getAttribute("secondList");
		List<Authoxobject> object0 = (List<Authoxobject>)firstObject;
		if(object0==null){
			object0 = new ArrayList<Authoxobject>();
		}
		List<Authoxobject> object1 = (List<Authoxobject>)secondObject; 
		if(object1==null){
			object1 = new ArrayList<Authoxobject>();
		}
		Object operateObject = request.getAttribute("operateList");
		List<Authoxoperate> operateList = (List<Authoxoperate>)operateObject; 
		if(operateList==null){
			operateList = new ArrayList<Authoxoperate>();
		}
		Map authorityMap = (HashMap)request.getAttribute("authorityMap"); 
		Map operateMap = (HashMap)request.getAttribute("operateMap");
	 	%>
	</head>

	<body>
		<form action="authox/role_editRoleAuthority.action" method="post">
			 <div class="module default">
		    	<div class="title">
		    		<div class="item selected">编辑权限</div>
		    		<div class="self-close"></div>	
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
							int a=0,b=0,c=0,e=0;
							for(Authoxobject authoxobject:object0){
								a++;
							%>
											<fieldset class="group" style="width: 96%;">
												<legend class="group_info">
													<input id="group<%=a %>" <%=disabled %> type="checkbox" />
													<label for="group<%=a %>"><%=authoxobject.getName() %></label>
												</legend>
												<div class="object">
													<% 
								for(Authoxobject ox:object1){	
									if(ox.getTeam().equals(authoxobject.getCode())){
										b++;
										for (Authoxoperate authoxoperate : operateList) { 
											List<String> operateIdList = (List<String>)operateMap.get(ox.getCode());
											boolean isObjectOperate = false;//标识是否该客体的操作
											if(operateIdList!=null){
												for(int i=0;i<operateIdList.size();i++){
													String operateId = operateIdList.get(i);
													if(operateId.equals(authoxoperate.getCode())){
														isObjectOperate = true;
														break;
													}
												}
											}
											if(isObjectOperate){
												c++;
												boolean isExist=false;//标识改操作在课题中是否已经存在
												Set keySet = authorityMap.keySet();
												Iterator it = keySet.iterator();
												while(it.hasNext()){
													String objectoperate = (String)it.next();
													String[] oos = objectoperate.split("_");
													if(oos[0].equals(ox.getCode())){
														if(oos[1].equals(authoxoperate.getCode())){
															isExist = true;
															break;
														}
													}
												}
										%>
													<div class="object2_menu" style="float: left; width: 25%;">
														<input type="checkBox" id="group<%=a+""+b+""+c %>"
															<%=disabled %> name="oids"
															value="<%=authoxobject.getCode()%>,<%=ox.getCode()%>_<%=authoxoperate.getCode() %>"
															<%=isExist?"checked='checked'" : ""%> />
														<label for="group<%=a+""+b+""+c %>"><%=authoxoperate.getName() %>-<%=ox.getName() %></label>
													</div>
													<%}}}} %>
												</div>
											</fieldset>
											<%} %>
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
				</center>
	    	</div>
		</form>
	</body>
</html>
