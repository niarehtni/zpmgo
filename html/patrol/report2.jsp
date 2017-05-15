<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.sucsoft.zsxh.core.util.SysInfo"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String did = (String)session.getAttribute("dept");
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd XHTML 1.0 Transitional//EN" "http://www.w3.org/tr/xhtml1/Dtd/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">

		<title>统计</title>
		<link href="css/framework/table.css" type="text/css" rel="stylesheet" />
		<script src="js/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
		<script src="js/jquery/highcharts.js" type="text/javascript"></script>
		<script src="js/framework/form.js" type="text/javascript"></script>
		<script src="js/patrol/report2.js" type="text/javascript"></script>
	</head>

	<body>
		<form action="<%=basePath%>patrol/patrolEvent_listTypeCount.action?did=<%=did %>">
			<table class="detailTable" border="1">
				<tbody>
					<tr>
						<th width="10%">年份</th>
						<td width="30%">
							<select id="startYear" name="patrolEventBean.startYear" style="width:20%;min-width:50px;" title="开始年份">
								<option value="2011">2011年</option>
								<option value="2012">2012年</option>
								<option value="2013">2013年</option>
								<option value="2014">2014年</option>
								<option value="2015" selected="selected">2015年</option>
								<option value="2016">2016年</option>
								<option value="2017">2017年</option>
								<option value="2018">2018年</option>
								<option value="2019">2019年</option>
								<option value="2020">2020年</option>
								<option value="2021">2021年</option>
								<option value="2022">2022年</option>
								<option value="2023">2023年</option>
								<option value="2024">2024年</option>
								<option value="2025">2025年</option>
								<option value="2026">2026年</option>
							</select>
							<select id="startMonth" name="patrolEventBean.startMonth" style="width:15%;min-width:50px;" title="开始月份">
								<option value="01">1月</option>
								<option value="02">2月</option>
								<option value="03">3月</option>
								<option value="04">4月</option>
								<option value="05">5月</option>
								<option value="06">6月</option>
								<option value="07">7月</option>
								<option value="08">8月</option>
								<option value="09">9月</option>
								<option value="10">10月</option>
								<option value="11">11月</option>
								<option value="12">12月</option>
							</select>——
							<select id="endYear" name="patrolEventBean.endYear" style="width:20%;min-width:50px;" title="结束年份">
								<option value="2011">2011年</option>
								<option value="2012">2012年</option>
								<option value="2013">2013年</option>
								<option value="2014">2014年</option>
								<option value="2015" selected="selected">2015年</option>
								<option value="2016">2016年</option>
								<option value="2017">2017年</option>
								<option value="2018">2018年</option>
								<option value="2019">2019年</option>
								<option value="2020">2020年</option>
								<option value="2021">2021年</option>
								<option value="2022">2022年</option>
								<option value="2023">2023年</option>
								<option value="2024">2024年</option>
								<option value="2025">2025年</option>
								<option value="2026">2026年</option>
							</select>
							<select id="endMonth" name="patrolEventBean.endMonth" style="width:15%;min-width:50px;" title="结束月份">
								<option value="01">1月</option>
								<option value="02">2月</option>
								<option value="03">3月</option>
								<option value="04">4月</option>
								<option value="05">5月</option>
								<option value="06">6月</option>
								<option value="07">7月</option>
								<option value="08">8月</option>
								<option value="09">9月</option>
								<option value="10">10月</option>
								<option value="11">11月</option>
								<option value="12" selected="selected">12月</option>
							</select>
						</td>
						<th width="10%">报表方式</th>
						<td width="30%" colspan="5">
							<label><input type="checkbox" name="pie" checked="checked" value="饼图" />饼图</label>
							<label><input type="checkbox" name="table" checked="checked" value="表格" />表格</label>
						</td>
					</tr>
				</tbody>
			</table>
			<div id="report">
				<div id="waittingReport" style="float:left;width:48%;height:300px;">
				
				</div>
				<div id="finishedReport" style="float:left;width:48%;height:300px;">
				
				</div>
			</div>
			<div id="table">
				<table class="listTable" border="1">
					<thead>
						<tr>
							<th width="25%">类型</th>
							<th width="25%">未完成</th>
							<th width="25%">已完成</th>
							<th width="25%">总计</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
		</form>
	</body>
</html>
