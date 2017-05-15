<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="orm.*"%>
<%@ page import="java.util.*,com.sucsoft.zsxh.core.util.*"%>
	<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String disabled="";
	String code=(String)request.getAttribute("code");
	
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
	List<Authoxobjop> operateMap = (List<Authoxobjop>)request.getAttribute("operateMap");
	%>

<!DOCTYPE html>
<html>
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>关联菜单</title>
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
	</head>
	<body>
		<form action="authox/pageOperate_editObjectOperate.action" method="post">
			<div class="module default">
		    	<div class="title">
		    		<div class="item selected">关联菜单</div>	
		    	</div>
		    	<div class="content" style="height:100%;">
		    		<div class="item selected" style="padding:10px;">    
						<table class="detailTable" border="1">
							<tbody>
								<tr>
									<th>
										操作名:
									</th>
									<td>
										<input type="hidden" name="code" value="<%=code %>" />
										<input type="text" name="name" id="name" value="${name }"
											readonly="readonly" />
									</td>
								</tr>
								<tr>
									<td colspan="2">
									<div class="tree" style="margin-top: 5px;padding-left: 3px;">	
										<%
								int l=0,j=0;
								for(Authoxobject authoxobject:object0){
										l++;
								%>
										<fieldset class="group" style="width: 96%;">
											<legend class="group_info">
												<input id="group<%=l %>" <%=disabled %> type="checkbox" />
												<label for="group<%=l %>"><%=authoxobject.getName() %></label>
											</legend>
											<div class="object">
												<%for(Authoxobject ox:object1){	
										if(ox.getTeam().equals(authoxobject.getCode())){
											boolean isExist = false;//标识是否该客体的操作
											for (Authoxobjop authoxobjop : operateMap) {
												if(authoxobjop.getId().getObjcode().equals(ox.getCode())){
													isExist=true;
													break;
												}
											}
											j++;
									%>
												<div class="object_menu" style="float: left; width: 20%;">
													<input id="group<%=l+""+j %>" <%=disabled %> type="checkbox"
														name="oids" value="<%=ox.getCode() %>"
														<%=isExist?"checked='checked'" : ""%> />
													<label for="group<%=l+""+j %>"><%=ox.getName() %></label>
												</div>
												<%}}%>
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
					<!--<input type="button" value="关 闭" onclick="window.close()" />-->
				</center>
	    	</div>
		</form>
	</body>
</html>