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
	Object listObject1 = request.getAttribute("data1");
	List<Map> clist1 = (List<Map>)listObject1;
	Object deptObject = request.getAttribute("dept");
	List<Map> deptList = (List<Map>)deptObject;
	Object quarterObject = request.getAttribute("quarter");
	String quarter = (String)quarterObject;
	Object yearObject = request.getAttribute("year");
	String year = (String)yearObject;
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
		
	</head>

	<body>
		<form action="<%=basePath%>patrol/patrolEvent_listQCCount.action">
		<input type="hidden" id="searchType" name="patrolEventBean.searchType"  />
			<table class="detailTable" border="1">
				<tbody>
					<tr>
					<th width="5.3%">季度月份查询</th>
					<td width="30%">
							<select id="startYear" name="patrolEventBean.startYear" style="width:20%;min-width:50px;" title="年份">
							<%for(int i = 2011;i < 2027;i++) {%>
								<option value="<%=i %>" 
								<%if(i== Integer.parseInt(year)) {%>
									selected="selected"
								<%} %>
								><%=i %>年</option>
							<%} %>
							</select>
							<select id="quarter" name="patrolEventBean.quarter" style="width:20%;min-width:50px;" title="季度">
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
							<th width="10%" style="text-align: center;">第一季度区查数</th>
							<th width="10%" style="text-align: center;">对应3倍数</th>
							<th width="10%" style="text-align: center;">第一季度自查数</th>
						</tr>
						
					</thead>
					<tbody>
						<!-- 查询结果 -->
						<%
						Map map = new HashMap();
						Map map1 = new HashMap();
						Map map2 = new HashMap();
						for(int i=0;deptList!=null&&i<deptList.size();i++){
							map = deptList.get(i);
							String dept=(String)map.get("DNAME");
							int count=0;
							int count1=0;
						%>
						<tr>
						<td style="text-align: center;"><%=dept %></td>
						<%
						for(int k=0;k<list.size();k++){
							String name1 = (String)list.get(k);
							int nums=0;	
							int nums1=0;
							for(int j=0;j<clist.size();j++){
								map1 = clist.get(j);
								if(dept.equals(map1.get("NAME"))&&name1.equals(map1.get("SECONDTYPE"))){
									try{nums=Integer.parseInt(map1.get("NUMS")+"");}catch(Exception e){}
								}	
							}
							for(int j=0;j<clist1.size();j++){
								map2 = clist1.get(j);
								if(dept.equals(map2.get("NAME"))&&name1.equals(map2.get("SECONDTYPE"))){
									try{nums1=Integer.parseInt(map2.get("NUMS")+"");}catch(Exception e){}
								}	
							}
							
							count+=nums;
							count1+=nums1;
						%>
						<td style="text-align: center;"><%=nums %></td>
						<%
						}
						%>
						<td style="text-align: center;"><%=count %></td>
						<td style="text-align: center;"><%=count*3 %></td>
						<td style="text-align: center;"><%=count1 %></td>
						</tr>
						<%
						}
						%>						
						<tr>
						<td style="text-align: center;font-weight: bolder;">区查总数</td>
						<%
						int count = 0;
						int count1 = 0;
						for(int i=0;i<list.size();i++){
							int num = 0;
							int num1 = 0;
							String name = (String)list.get(i);
							for(int j=0;j<clist.size();j++){
								map = clist.get(j);
								if(name.equals(map.get("SECONDTYPE"))){
									try{num+=Integer.parseInt(map.get("NUMS")+"");}catch(Exception e){}
								}
							}
							for(int j=0;j<clist1.size();j++){
								map1 = clist1.get(j);
								if(name.equals(map1.get("SECONDTYPE"))){
									try{num1+=Integer.parseInt(map1.get("NUMS")+"");}catch(Exception e){}
								}
							}
							count+=num;
							count1+=num1;
						%>
							<td style="text-align: center;font-weight: bolder;"><%=num %></td>
						<%	
						}
						%>
						<td style="text-align: center;font-weight: bolder;"><%=count %></td>
						<td style="text-align: center;font-weight: bolder;"><%=count*3 %></td>
						<td style="text-align: center;font-weight: bolder;"><%=count1 %></td>
						</tr>
						
					</tbody>
				</table>
			</div>
		</form>
	</body>
	<script language="JAVASCRIPT" src="js/framework/module.js" ></script>
	<script src="js/jquery/jquery.datepicker.js"></script>
	<script type="text/javascript" >
		window.onload = function(){
			var season = $("#quarter option:selected").text();
			$("table:eq(1) tr:eq(0) th:eq(10)").text(season+"区查数");
			$("table:eq(1) tr:eq(0) th:eq(12)").text(season+"自查数");

			var month = $("#searchMouth option:selected").text();
			if(month!="全季度"){
				$("table:eq(1) tr:eq(0) th:eq(10)").text(month+"区查数");
				$("table:eq(1) tr:eq(0) th:eq(12)").text(month+"自查数");
			}
			else{
				$("table:eq(1) tr:eq(0) th:eq(10)").text(season+"区查数");
				$("table:eq(1) tr:eq(0) th:eq(12)").text(season+"自查数");
			}
			var searchType = $("#searchType").attr("value");
			if(searchType!="custom"){
				$("table:eq(1) tr:eq(0) th:eq(10)").text("区查数");
				$("table:eq(1) tr:eq(0) th:eq(12)").text("自查数");
			}
		}
	</script>
</html>
