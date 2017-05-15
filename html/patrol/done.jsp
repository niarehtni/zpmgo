<%@ page language="java" import="java.util.*,com.sucsoft.zsxh.core.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//Dtd XHTML 1.0 Transitional//EN" "http://www.w3.org/tr/xhtml1/Dtd/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<base href="<%=basePath%>">
		<title></title>

		<link href="css/jquery/jquery.alerts.css" type="text/css" rel="stylesheet" />
		<link href="css/jquery/jquery.flexigrid.css" type="text/css" rel="stylesheet" />
		<link href="css/jquery/jquery.datepicker.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<form action="<%=basePath%>patrol/patrolEvent_listDone.action">
			<input type="hidden" name="pageBean.listUser" value="<%=session.getAttribute("username") %>" />
			<input type="hidden" name="patrolEventBean.list" value="true" />
			<table class="searchTable">
				<tbody>
					<tr>
						<td>
							事件编号<input type="text" name="patrolEventBean.peid"/>
							二级事件类型
							<select type="text" name="patrolEventBean.secondType">
									<option value=""></option>
									<%
		  							if(SysInfo.PATROL_SECOND_TYPE_LIST!=null){
		  								for(String type:SysInfo.PATROL_SECOND_TYPE_LIST){
		  							%>
		  							<option value="<%=type %>"><%=type %></option>
		  							<%
		  								}
		  							}
		  							%>
							</select>
							上报管理处<input type="text" name="patrolEventBean.deptName"/>
							<%-- 上报人姓名<input type="text" name="patrolEventBean.name"/>--%>
							上报时间<input type="text" name="patrolEventBean.timeMin" class="date"/>-<input type="text" name="patrolEventBean.timeMax" class="date"/>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
		<table class="listTable">
		</table>
		
		
		<script src="js/jquery/jquery-1.7.2.min.js"></script>
		<script src="js/framework/css.js" type="text/javascript" language="javascript"></script>
		<script language=javascript src="js/jquery/jquery.alerts.js"></script>
		<script language=javascript src="js/jquery/jquery.datepicker.js"></script>
		<script src="js/jquery/jquery.flexigrid.js"></script><script>
		$(document).ready(function() {
			var p={
				form:$("form"),
	            sortname: 'createTime',
	            sortorder: 'desc',
	            colModel: [
   					{display: '详情', name: 'TYPE', width: 20, sortable: true,
						dataFormat:function(value,td,row){
							var href="<%=basePath%>patrol/patrolEvent_get.action?pageBean.listUser=<%=session.getAttribute("username")%>&type=detail";
							href+="&patrolEventBean.peid="+row.PRIMARYKEY;
							return "<img title='详情' onclick='top.addTab({href:\""+href+"\",name:\"详情\"});' src='<%=basePath%>/images/jquery/flexgrid/detail.png' style='cursor:pointer' />";
						}
					},
	            	{display: '事件编号', name: 'PEID', width: 80, sortable: true},
	            	{display: '事件类型', name: 'TYPE', width: 50, sortable: true},  
	            	{display: '二级事件类型', name: 'SECONDTYPE', width: 90, sortable: true},	  	    		             
	            	{display: '上报管理处', name: 'DEPTNAME', width: 55, sortable: true},      	    		             
	            	//{display: '上报人', name: 'AUID', width: 50, sortable: true},         	    		             
	            	//{display: '上报人姓名', name: 'UPLOADERNAME', width: 55, sortable: true},       	    		             
	            	{display: '上报时间', name: 'TIME', width: 110, sortable: true}, 	            	
	            	{display: '下发单位', name: 'HANDLEDEPTNAME', width: 55, sortable: true},
	            	{display: '截止完成时间', name: 'REMAINREQUIREDATE', width: 110, sortable: true},
	            	{display: '完成时限(工作日)', name: 'REQUIREDAY', width: 90, sortable: true},
	            	{display: '剩余时限(天)', name: 'REMAINREQUIREDAY', width: 65, sortable: true},
	            	//{display: '事件标题', name: 'TITLE', width: 100, sortable: true},         	    		             
	            	{display: '事件内容', name: 'CONTENT', width: 200, sortable: true},         	    		             
	            	/**
	            	{display: '当前节点', name: 'NODE', width: 60, sortable: true},           	    		             
	            	{display: '当前责任人', name: 'USERLIST.NAME', width: 60, sortable: true, 
		            	dataFormat:function(value,td,row){
		            		var str="";
							for(var i=0;i<row.USERLIST.length;i++){
								if(str.length>0){
									str+=",";
								}
								str+=row.USERLIST[i].NAME;
							}
							return str;
		            	}
	            	},
	            	**/      	    		             
	            	{display: '备注', name: 'REMARK', width: 200, sortable: true}        	    		             
	            ],
	            detail:{
					url:"<%=basePath%>patrol/patrolEvent_get.action?pageBean.listUser=<%=session.getAttribute("username")%>&type=detail",
					width:1000,
					height:600,
					primaryKey:"patrolEventBean.peid"
             	}
				,exportExcel:{
		        	url:"<%=basePath%>patrol/patrolEventExport_exportDoneExcel.action",
		        	title:"事件跟踪"
			    }
			};
			$("table.listTable").flexigrid(p);	
				
		});		
	</script>
	</body>
</html>
