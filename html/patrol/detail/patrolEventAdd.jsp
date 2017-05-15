<%@ page language="java" import="com.sucsoft.zsxh.core.util.SysInfo,com.sucsoft.zsxh.core.entity.patrol.*,java.util.*,com.sucsoft.authox.service.AuthoxService" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	AuthoxService authoxService = (AuthoxService)session.getAttribute("authoxService");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>" target="_self"/>
    
    <title>巡查事件管理</title>
    
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	
	<link href="css/jquery/jquery.datepicker.css" type="text/css" rel="stylesheet" />
	<link href="js/iviewer-0.7.7/test/lightbox/style.css" type="text/css" rel="stylesheet" />
	<link href="css/framework/framework.css" rel="styleSheet" class="css" title="normal" />
	<link href="css/framework/dialog.css" rel="styleSheet" />
	<link href="css/framework/module.css" rel="styleSheet" />
	<link href="css/framework/table.css" rel="styleSheet" />
	<link href="css/framework/form.ui.css" rel="styleSheet" />
	<link href="css/patrol/detail/patrolEventManager.css" rel="styleSheet" />
	<link href="css/framework/checkWordsNum.css" type="text/css" rel="stylesheet" />
	
  </head>
  
  <body>
  	<form action="patrol/patrolEvent_add.action" enctype="multipart/form-data" method="post" class="notAjax">
  		<input type="hidden" name="patrolEventBean.auid" value="<%=session.getAttribute("username") %>" />
  		<input type="hidden" id="requireDay" title="完成时限" class="null"  />
  		<input type="hidden" id="copyType" title="抄告类型" class="null"  />
  		<input type="hidden" id="secondType" title="二级事件类型" class="null"  />
  		<input type="hidden" id="type" title="事件类型" class="null"  />
  		
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">巡查事件详情</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<table class="detailTable" border="1">
		  			<tbody>
		  				<%--
		  				<tr>
		  					<th width="20%">事件标题</th>
		  					<td>
		  						<input type="text" name="patrolEventBean.title" />
		  					</td>
		  				</tr>
		  				 --%>
		  				<tr>
		  					<th width="20%" height="150">事件内容</th>
		  					<td>
		  						<textarea name="patrolEventBean.content" title="事件内容" class="null" rows="" cols="" style="height:150px;"></textarea>
		  					</td>
		  				</tr>
		  				<%--
		  				<tr>
		  					<th>事件地点</th>
		  					<td>
		  						<input type="hidden" name="patrolEventBean.longitude" />
		  						<input type="hidden" name="patrolEventBean.latitude" />
								<div id="map" class="map" ></div>
							</td>
		  				</tr>
		  				<tr>
		  					<th height>语音</th>
		  					<td>
								<div class="form-ui-file">
									<div class="form-ui-file-add">
										<label>添加附件</label>
										<input type="file" name="music" title="语音" />
									</div>
								</div>
							</td>
		  				</tr>
		  				 --%>
		  				<tr>
		  					<th height="50">图片</th>
		  					<td>
								<div class="form-ui-file">
									<div class="form-ui-file-add">
										<label>添加附件</label>
										<input type="file" multi="true" name="file" accept="image/*" title="图片" />
									</div>
								</div>
		  					</td>
		  				</tr>
		  				<tr>
		  					<th>事件类型</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.type" cascade="patrolEventBean.auids" key="type">
		  							<%
		  							//if(SysInfo.PATROL_TYPE_LIST!=null){
		  							//	for(String type:SysInfo.PATROL_TYPE_LIST){
		  							%>
		  							<%if(authoxService.check("waitting","SELF")){ %>
		  							<div class="form-ui-option" value="<%=SysInfo.PATROL_TYPE_SELF %>"><%=SysInfo.PATROL_TYPE_SELF %></div>
		  							<%} %>
		  							<%if(authoxService.check ("waitting","GROUP")){ %>
		  							<div class="form-ui-option" value="<%=SysInfo.PATROL_TYPE_AREA %>"><%=SysInfo.PATROL_TYPE_AREA %></div>
		  							<%} %>
		  							<%if(authoxService.check("waitting","AREADY")){ %>
		  							<%-- 
		  							<div class="form-ui-option" value="<%=SysInfo.PATROL_TYPE_AREADY %>"><%=SysInfo.PATROL_TYPE_AREADY %></div>
		  							--%><%} %>
		  							<%if(authoxService.check("waitting","URGENT")){ %>
		  							<div class="form-ui-option" value="<%=SysInfo.PATROL_TYPE_URGENT %>"><%=SysInfo.PATROL_TYPE_URGENT %></div>
		  							<%} %>
		  							<%
		  								//}
		  							//}
		  							%>
		  						</div>
		  					</td>
		  				</tr>
		  				<tr>
		  					<th>事件二级类型</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.secondType">
		  							<%
		  							if(SysInfo.PATROL_SECOND_TYPE_LIST!=null){
		  								for(String type:SysInfo.PATROL_SECOND_TYPE_LIST){
		  							%>
		  							<div class="form-ui-option" value="<%=type %>"><%=type %></div>
		  							<%
		  								}
		  							}
		  							%>
		  						</div>
		  					</td>
		  				</tr>
		  				<tr>
		  					<th>抄告类型</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.copyType">
		  							<%
		  							if(SysInfo.PATROL_COPY_TYPE_LIST!=null){
		  								for(String type:SysInfo.PATROL_COPY_TYPE_LIST){
		  							%>
		  							<div class="form-ui-option" value="<%=type %>"><%=type %></div>
		  							<%
		  								}
		  							}
		  							%>
		  						</div>
		  					</td>
		  				</tr>
		  				<tr>
		  					<th>完成时限</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.requireDay">
		  							<%
		  								for(int type=1;type<=15;type++){
		  							%>
		  							<div class="form-ui-option" value="<%=type %>"><%=type %>天</div>
		  							<%
		  								}
		  							%>
		  						</div>
		  					</td>
		  				</tr>
		  				<tr>
		  					<th height="50">上报给</th>
		  					<td>
		  						<input type="hidden" id="auids" title="上报人员" check="null" class="null" />
		  						<div name="patrolEventBean.auids" loadUrl="">
		  							<%
		  							Object username=session.getAttribute("username");
		  							Object deptId=session.getAttribute("dept");
		  							List<Map> userList=(List<Map>)request.getAttribute("USERLIST");
		  							if(userList!=null&&userList.size()>0){
		  								Map<Object,List<Map>> deptMap=new HashMap<Object,List<Map>>();
		  								for(Map userMap:userList){
		  									//管理处用户只能上报给自己所属管理处
		  									/**
		  									if(!username.equals(SysInfo.AREA_AUID)&&!deptId.equals(userMap.get("DEPTID"))){
		  										continue;
		  									}
		  									**/
		  									
		  									List<Map> userListChild=deptMap.get(userMap.get("DEPT"));
		  									if(userListChild==null){
		  										userListChild=new ArrayList<Map>();
			  									deptMap.put(userMap.get("DEPT"),userListChild);
		  									}
		  									userListChild.add(userMap);
		  								}
		  								Iterator it=deptMap.keySet().iterator();
		  								while(it.hasNext()){
		  									String dept=(String)it.next();
		  									List<Map> userListChild=deptMap.get(dept);
		  									%>
		  									<div style="width:99%;float:left;padding-left:1%;">
		  									<label class="all" style="display:none"><input type="checkbox"><%=dept %></label>
		  									<div style="width:98%;float:left;padding-left:2%;">
		  									<%
		  									for(Map userMap:userListChild){
		  							 %>
		  							 	<label style="display:none" type="<%=userMap.get("TYPE") %>"><input type="checkbox" name="patrolEventBean.auids" value="<%=userMap.get("AUID") %>" <%=userMap.get("TYPE")!=null&&userMap.get("TYPE").equals(SysInfo.PATROL_TYPE_SELF)?"checked='checked'":"" %> /><%=userMap.get("NAME") %></label>
		  							<%
		  									}
			  								 %>
			  								 	</div>
			  								 </div>
			  								 <%
		  								}
		  							}
		  							%>
		  						</div>
		  					</td>
		  				</tr>
		  			</tbody>
  				</table>
  			</div>
  		</div>
  		<div style="float:left;height:30px;">&nbsp;</div>
  		<div class="submit">
  			<center>
  			<input class="saveBtn" type="button" value="提交" />
  			</center>
  		</div>
  	</form>
  	
  	
	<script src="js/jquery/jquery.js"></script>
	<script type="text/javascript" src="js/jquery/jquery.datepicker.js"></script>
	<script src="js/framework/css.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/table.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/form.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/module.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/form.ui.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/jquery.framework.js"></script>
	
	<script type="text/javascript" language="javascript">
		$(function(){
			$("#map").click(function(){
				var longitude=$("input[name='patrolEventBean.longitude']").val();
				var latitude=$("input[name='patrolEventBean.latitude']").val();
				top.addTab({name:'地图定位',closeCallBack:function(result){
					if(result&&result.length>0){
						var location=result.split("|");
						$("input[name='patrolEventBean.longitude']").val(location[0]);
						$("input[name='patrolEventBean.latitude']").val(location[1]);
					}
				},href:'<%=basePath %>plugins/gis/patrolMap.jsp?type=edit&longitude='+longitude+'&latitude='+latitude});
				/**
				var result=window.showModalDialog('<%=basePath %>plugins/gis/map.jsp?type=edit&longitude='+longitude+'&latitude='+latitude,window,'dialogWidth:800px;dialogHeight:500px')
				if(result&&result.length>0){
					var location=result.split("|");
					$("input[name='patrolEventBean.longitude']").val(location[0]);
					$("input[name='patrolEventBean.latitude']").val(location[1]);
				}
				**/
			});

			$("div[name='patrolEventBean.type'] div.form-ui-option").click(function(){
				var type=$(this).attr("value");
				var label=$("div[name='patrolEventBean.auids'] label");
				label.hide();
				label.each(function(){
					if($(this).attr("type")==type){
						$(this).find("input").removeAttr("disabled");
						$(this).show();
						$(this).parent().parent().find("label.all").show();
					}else{
						if($(this).is("[type]")){
							$(this).find("input").attr("disabled","disabled");
						}
					}
				});
			});
			
			$("div[name='patrolEventBean.auids'] label.all :checkbox").click(function(){
				if($(this).attr("checked")){
					$(this).parent().next().find(":checkbox").attr("checked","checked");
				}else{
					$(this).parent().next().find(":checkbox").removeAttr("checked");
				}
			});

			//备注
	        $("textarea[name='patrolEventBean.content']").attr("wordlen","1200").removeClass("length").addClass("checkWordsNum length");
			var wordlen=$(".checkWordsNum").attr("wordlen");
			var parent=$(".checkWordsNum").parent();
			var div=$("<div class='checkNumDiv'><span>0</span>/"+wordlen+"</div>");
			parent.addClass("checkNumParent");
			parent.append(div);
			$("textarea[name='patrolEventBean.content']").keyup(function(){
				value=$(this).val().length;
				$(this).parent().find(".checkNumDiv span").text(value);			
				if($("textarea[name='patrolEventBean.content']").val().length>wordlen){
					alert("您已经输入超过"+wordlen+"个字了！");
					return false;
				}
			}).keyup();


			var auidsContainer=$("[name='patrolEventBean.auids']");
			$("[name='patrolEventBean.type'] div,[name='patrolEventBean.auids'] :checkbox").click(function(){
				var length=auidsContainer.find("[name='patrolEventBean.auids']:checked").length;
				if(length>0){
					$("#auids").val(length);
				}else{
					$("#auids").val("");
				}
			});

			$("[name='patrolEventBean.requireDay'] div").click(function(){
				$("#requireDay").val($(this).attr("value"));
			});
			$("[name='patrolEventBean.copyType'] div").click(function(){
				$("#copyType").val($(this).attr("value"));
			});
			$("[name='patrolEventBean.secondType'] div").click(function(){
				$("#secondType").val($(this).attr("value"));
			});
			$("[name='patrolEventBean.type'] div").click(function(){
				$("#type").val($(this).attr("value"));
			});
			
		});
	</script>
  </body>
</html>
