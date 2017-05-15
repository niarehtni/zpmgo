<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.sucsoft.zsxh.core.util.SysInfo"%>
<%@page import="com.sucsoft.zsxh.core.entity.patrol.PatrolEventBean"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	Object listObject = request.getAttribute("data");
	List<Map> clist = (List<Map>)listObject;
	Object deptObject = request.getAttribute("dept");
	List<Map> deptList = (List<Map>)deptObject;
	Object quarterObject = request.getAttribute("quarter");
	String quarter = (String)quarterObject;
	Object yearObject = request.getAttribute("year");
	String year = (String)yearObject;
	Object nameObject = request.getAttribute("name");
	String deptName = (String)nameObject;
	String stringMouth = (String) request.getAttribute("mouth");
	Integer searchMonth = stringMouth!=null&&stringMouth.trim().length()>0?Integer.parseInt(stringMouth):0;
		
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd XHTML 1.0 Transitional//EN" "http://www.w3.org/tr/xhtml1/Dtd/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">

		<title>自查统计</title>
		<link href="css/framework/table.css" type="text/css" rel="stylesheet" />
		<link href="css/jquery/jquery.datepicker.css" type="text/css" rel="stylesheet" />
		<script src="js/jquery/jquery-1.7.2.min.js" type="text/javascript"></script>
		<script src="js/jquery/highcharts.js" type="text/javascript"></script>
		<script src="js/framework/form.js" type="text/javascript"></script>
		<script src="js/patrol/report4.js" type="text/javascript"></script>
		<script>
		//绑定事件
		//$(document).ready(function() {
		//	try{document.getElementById("ButtonExport").onclick=function(){exportExcelByElement("form");}}catch(err){}
		//});
		</script>
	</head>

	<body>
		<form action="<%=basePath%>patrol/patrolEvent_listZCCount.action">
			<table class="detailTable" border="1">
				<tbody>
					<tr>
					<th width="5.3%">季度月份查询</th>
					<td width="30%">
							<select id="startYear" name="patrolEventBean.startYear" style="width:20%;min-width:50px;" title="开始年份">
							<%for(int i = 2011;i < 2027;i++) {%>
								<option value="<%=i %>" 
								<%if(i== Integer.parseInt(year)) {%>
									selected="selected"
								<%} %>
								><%=i %>年</option>
							<%} %>
							</select>
							<select id="quarter" name="patrolEventBean.quarter" style="width:20%;min-width:50px;" title="开始年份">
							<%
							if(quarter.equals("01")){
							%>
								<option value="01" selected="selected">第一季度</option>
							<%
							}else{
							%>
								<option value="01">第一季度</option>
							<%
							}
							%>
							<%
							if(quarter.equals("02")){
							%>
								<option value="02" selected="selected">第二季度</option>
							<%
							}else{
							%>
								<option value="02">第二季度</option>
							<%
							}
							%>
							<%
							if(quarter.equals("03")){
							%>
								<option value="03" selected="selected">第三季度</option>
							<%
							}else{
							%>
								<option value="03">第三季度</option>
							<%
							}
							%>
							<%
							if(quarter.equals("04")){
							%>
								<option value="04" selected="selected">第四季度</option>
							<%
							}else{
							%>
								<option value="04">第四季度</option>
							<%
							}
							%>
							</select>
							<select id="searchMouth" name="patrolEventBean.searchMonth" style="width:20%;min-width:50px;" title="月份">
								<option value="0">全季度</option>
							<%for(int i = 1 ;i < 4;i++) {
								int month = Integer.parseInt(quarter)*3-3+i;%>
								<option value="<%=(""+month).length()==1?"0"+month:""+month %>" 
								<%if(month == searchMonth) {%>
									selected="selected"
								<%} %>
								><%=month %>月</option>
							<%} %>
							</select>
							<input type="button" id="ButtonExport" value="导出" onclick="javascript:exportExcelByElement('table')"/>
					</td>
					
					</tr>
					<tr>
					<th width="5.3%">自定义时间查询</th>
					<td width="30%">
						<input id="startTime" name="patrolEventBean.startTime" class="date"/>-<input id="endTime" name="patrolEventBean.endTime" class="date"/>
						<input type="button" value="搜索" onclick="searchcustomData()"/>
					</td>
					</tr>
				</tbody>
			</table>
			<div id="table" style="padding-top: 10px;">
				<table class="listTable" border="1">
					<thead>
						<tr>
							<th width="15%" style="text-align: center;">单位</th>
						<%
							List list = com.sucsoft.zsxh.core.util.SysInfo.PATROL_SECOND_TYPE_LIST;
							for(int i=0;i<list.size();i++){
								String name = (String)list.get(i);
						%>
						<th name="<%=name%>" style="text-align: center;"><%=name%></th>
						<%
							}
						%>
							<th width="10%" style="text-align: center;">自查数</th>
						</tr>
						
					</thead>
					<tbody>
						<!-- 查询结果 -->
						<%
						Map map = new HashMap();
						Map map1 = new HashMap();
						Map map2 = new HashMap();
							String dept ="";
							int count=0;
							int a =1;
								if(!deptName.equals("区（局）")){
									if(clist.size()!=0){
										for(int h=0;h<clist.size();h++){
											map2 = clist.get(h);
											if(deptName.equals(map2.get("NAME"))){
												if(a==1){
						%>
						<tr>
						<td style="text-align: center;"><%=deptName %></td>
						<%
													for(int k=0;k<list.size();k++){
														String name1 = (String)list.get(k);
														int nums=0;		
														for(int j=0;j<clist.size();j++){
															map1 = clist.get(j);
															if(deptName.equals(map1.get("NAME"))&&name1.equals(map1.get("SECONDTYPE"))){
																try{nums=Integer.parseInt(map1.get("NUMS")+"");}catch(Exception e){}
															}	
														}
													count+=nums;
						%>
						<td style="text-align: center;"><%=nums %></td>
						<%
													}
						%>
						<td style="text-align: center;"><%=count %></td>
						</tr>
						<%
												}
												a++;
										}
									}
								}else{
						%>
						<td style="text-align: center;"><%=deptName %></td>
						<%
									for(int g=0;g<list.size()+1;g++){
						%>
						<td style="text-align: center;">0</td>
						<%
									}
								}
							}else if(deptName.equals("区（局）")){
								for(int i=0;deptList!=null&&i<deptList.size();i++){
									map = deptList.get(i);
									String dept1=(String)map.get("DNAME");
									int count1=0;
								%>
								<tr>
								<td style="text-align: center;"><%=dept1 %></td>
								<%
								for(int k=0;k<list.size();k++){
									String name1 = (String)list.get(k);
									int nums1=0;		
									for(int j=0;j<clist.size();j++){
										map1 = clist.get(j);
										if(dept1.equals(map1.get("NAME"))&&name1.equals(map1.get("SECONDTYPE"))){
											try{nums1=Integer.parseInt(map1.get("NUMS")+"");}catch(Exception e){}
										}	
									}
									count1+=nums1;
								%>
								<td style="text-align: center;"><%=nums1 %></td>
								<%
								}
								%>
								<td style="text-align: center;"><%=count1 %></td>
								</tr>
								<%
								}
								%>						
								<tr>
								<td style="text-align: center;font-weight: bolder;">自查总数</td>
								<%
									int count2 = 0;
								for(int i=0;i<list.size();i++){
									int num2 = 0;
									String name = (String)list.get(i);
									for(int j=0;j<clist.size();j++){
										map = clist.get(j);
										if(name.equals(map.get("SECONDTYPE"))){
											try{num2+=Integer.parseInt(map.get("NUMS")+"");}catch(Exception e){}
										}
									}
									count2+=num2;
								%>
									<td style="text-align: center;font-weight: bolder;"><%=num2 %></td>
								<%	
								}
								%>
								<td style="text-align: center;font-weight: bolder;"><%=count2 %></td>
								</tr>
								<%
								
							}
						%>
						
						<%
						//}
						%>						
						
					</tbody>
				</table>
			</div>
		</form>
	</body>
	
		<script language="JAVASCRIPT" src="js/framework/module.js" ></script>
		<script src="js/jquery/jquery.datepicker.js"></script>
</html>
