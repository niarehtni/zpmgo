<%@ page language="java" import="cq.base.entity.PageBean,com.sucsoft.zsxh.core.entity.patrol.*,java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String type=(String)request.getAttribute("type");
	PageBean pageBean=(PageBean)request.getAttribute("data");
	Map dataMap=(Map)pageBean.getDataList().get(0);
	Iterator it=dataMap.keySet().iterator();
	while(it.hasNext()){
		String key=(String)it.next();
		if(dataMap.get(key)==null){
			dataMap.put(key,"");
		}
	}
%>
<!DOCTYPE html>
<html>
  <head><meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <base href="<%=basePath%>" target="_self"/>
    
    <title>巡查事件管理</title>
    
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	
	<link href="css/jquery/jquery.datepicker.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" href="js/iviewer-0.7.7/test/lightbox/style.css" />
	
	<link href="css/framework/framework.css" rel="styleSheet" class="css" title="normal" />
	<link href="css/framework/dialog.css" rel="styleSheet" />
	<link href="css/framework/module.css" rel="styleSheet" />
	<link href="css/framework/table.css" rel="styleSheet" />
	<link href="css/framework/form.ui.css" rel="styleSheet" />
	<link href="css/patrol/detail/patrolEventManager.css" rel="styleSheet" />
	
	<link rel="stylesheet" href="plugins/jQuery.jPlayer.2.6.0/circle.player.css" />
	
  	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!--[if IE 6]>
	<link href="/css/ie6.css" rel="stylesheet" type="text/css" />
	<![endif]-->
  </head>
  
  <body>
  	<form action="patrol/patrolEvent_handle.action" enctype="multipart/form-data" method="post" class="notAjax">
  		<input type="hidden" name="patrolEventBean.peid" value="<%=dataMap.get("PEID") %>" />
  		<input type="hidden" name="patrolEventBean.auid" value="<%=session.getAttribute("username") %>" />
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">事件上报信息</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<table class="detailTable" border="1">
		  			<tbody>
		  				<%-- 
		  				<tr>
		  					<th>事件地点</th>
		  					<td>
								<div title="定位到地图" class="map" id="map">&nbsp;</div>
							</td>
		  					<th>事件标题</th>
		  					<td colspan="3"><%=dataMap.get("TITLE") %></td>
		  				</tr>
		  				--%>
		  				<tr>
		  					<th width="20%">事件类型</th>
		  					<td width="30%"><%=dataMap.get("TYPE") %></td>
		  					<th width="20%">二级事件类型</th>
		  					<td width="30%"><%=dataMap.get("SECONDTYPE") %></td>
		  				</tr>
		  				<tr><th width="20%">抄告类型</th>
		  					<td width="30%"><%=dataMap.get("COPYTYPE") %></td>
		  					<th width="20%">上报人</th>
		  					<td width="30%"><%=dataMap.get("UPLOADERNAME") %></td>
		  				
		  				</tr>
		  				<tr>
		  					<th>上报时间</th>
		  					<td><%=dataMap.get("TIME") %></td>
		  					<th>完成时限</th>
		  					<td><%=dataMap.get("REQUIREDAY") %>天</td>
		  				</tr>
		  				<tr>
		  					<th height="100">事件内容</th>
		  					<td height="100" colspan="3"><%=dataMap.get("CONTENT") %></td>
		  				</tr>
		  				<tr>
		  					<th height>上报语音</th>
		  					<td colspan="3" style="background-color:rgb(241,241,241)">
								<%
								String musicPath=(String)dataMap.get("MUSICPATH");
								if(musicPath!=null&&musicPath.length()>0){
								%>
								<%--<input type="button" value="播放语音" />
								<div sound="<%=basePath %>view/downLoad_download.action?filePath=<%=musicPath %>"></div>
								 --%>
								<audio src="<%=basePath %>view/downLoad_download.action?filePath=<%=musicPath %>" controls="controls">
								你的浏览器不支持播放此类型的声音
								</audio>
								<a href="<%=basePath %>view/downLoad_download.action?filePath=<%=musicPath %>" target="_black">点击下载</a>
								<%} %>
							</td>
		  				</tr>
		  				<tr>
		  					<th height="50">上报图片</th>
		  					<td colspan="3">
		  						<%
								List<Map> imageList=(List<Map>)dataMap.get("PATROLEVNETFILELIST");
								if(imageList!=null&&imageList.size()>0){
									for(Map imageMap:imageList){
								%>
								<input type="hidden"  lazySrc="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>"  value="view/downLoad_download.action?filePath=<%=imageMap.get("MINPATH") %>"/>
								<%--<input type="button" value="播放语音" />
								<a href="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>" target="_blank">
								<img class="go" href="view/downLoad_download.action?filePath=<%=imageMap.get("MINPATH") %>" src="view/downLoad_download.action?filePath=<%=imageMap.get("MINPATH") %>" height="50" />
								</a>
								 --%>
								<%
									}
								}
								%>
		  					</td>
		  				</tr>
		  			</tbody>
  				</table>
  			</div>
  		</div>
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">事件办理信息</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<table class="detailTable" border="1">
		  			<tbody>
		  				
		  				<tr>
		  					<th width="20%">当前节点</th>
		  					<td width="30%"><%=dataMap.get("NODE")!=null?dataMap.get("NODE"):"已完结" %></td>
		  					<th width="20%">当前责任人</th>
		  					<td width="30%">
		  					<%
		  					List<Map> currentUserList=(List<Map>)dataMap.get("USERLIST");
		  					if(currentUserList!=null){
		  						for(Map userMap:currentUserList){
		  							%>
		  							<span title="<%=userMap.get("AUID") %>"><%=userMap.get("NAME") %>;</span>
		  							<%
		  						}
		  					}
		  					%>
		  					
		  					</td>
		  				</tr>
		  				<tr>
		  					<th>办理人</th>
		  					<td><%=dataMap.get("HANDLENAME") %></td>
		  					<th>办理时间</th>
		  					<td><%=dataMap.get("HANDLETIME") %></td>
		  				</tr>
		  				<tr>
		  					<th height="100">办理结果</th>
		  					<td colspan="3"><%=dataMap.get("RESULT") %></td>
		  				</tr>
		  				<tr>
		  					<th height>办理语音</th>
		  					<td colspan="3" style="background-color:rgb(241,241,241)">
								<%
								String resultMusicPath=(String)dataMap.get("RESULTMUSICPATH");
								if(resultMusicPath!=null&&resultMusicPath.length()>0){
								%>
								<%--<input type="button" value="播放语音" />
								<div sound="<%=basePath %>view/downLoad_download.action?filePath=<%=resultMusicPath %>"></div>
								 --%><audio src="<%=basePath %>view/downLoad_download.action?filePath=<%=resultMusicPath %>" controls="controls">
								你的浏览器不支持播放此类型的声音
								</audio>
								<a href="<%=basePath %>view/downLoad_download.action?filePath=<%=resultMusicPath %>" target="_black">点击下载</a>
								<%} %>
							</td>
		  				</tr>
		  				<tr>
		  					<th height="50">办理图片</th>
		  					<td colspan="3">
		  						<%
								List<Map> resulktImageList=(List<Map>)dataMap.get("PATROLEVNETRESULTFILELIST");
								if(resulktImageList!=null&&resulktImageList.size()>0){
									for(Map imageMap:resulktImageList){
								%>
								<%--<input type="button" value="播放语音" /> --%>
								<input type="hidden"  lazySrc="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>"   value="view/downLoad_download.action?filePath=<%=imageMap.get("MINPATH") %>"/>
								<%--<a href="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>" target="_blank"><img class="go" href="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>" src="view/downLoad_download.action?filePath=<%=imageMap.get("PATH") %>" height="50" /></a>--%>
									
								<%
									}
								}
								%>
		  					</td>
		  				</tr>
		  			</tbody>
  				</table>
  			</div>
  		</div>
  		<%
  		List<Map> recordList=(List<Map>)dataMap.get("RECORDLIST");
  		if(recordList!=null&&recordList.size()>0){
  		%>
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">巡查事件流转记录</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<%
  				for(Map recordMap:recordList){
  					String route=(String)recordMap.get("ROUTE");
  					String recordType=(String)recordMap.get("TYPE");
  					if((recordType!=null&&recordType.equals("INSTRUCTION"))||(route!=null&&route.length()>0)){
  				%>
  				<%--
  				<table class="detailTable" border="1" style="margin-bottom:5px;">
		  			<tbody>
		  				<tr>
		  					<th width="20%">人员</th>
		  					<td width="30%"><%=recordMap.get("NAME") %></td>
		  					<th width="20%">时间</th>
		  					<td width="30%"><%=recordMap.get("TIME") %></td>
		  				</tr>
		  				<tr>
		  					<th>意见</th>
		  					<td colspan="3"><%=recordMap.get("CONTENT") %></td>
		  				</tr>
		  			</tbody>
  				</table>
  				 --%>
  				<div class="record <%=recordType.equals("INSTRUCTION")?"instruction":"" %>">
  					<div class="record-title"><%=recordMap.get("TIME") %>，<<%=recordMap.get("NAME") %>>&nbsp;<%=!recordType.equals("INSTRUCTION")?recordMap.get("ROUTE"):"批示" %>：</div>
  					<%=recordMap.get("CONTENT") %>
  				</div>
  				<%	
  					}
  				} 
  				%>
  			</div>
  		</div>
  		<%} %>
  		<%
  		if(type!=null&&type.equals("edit")){
  		%>
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">办理</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<table class="detailTable" border="1">
		  			<tbody>
		  				<tr>
		  					<th width="20%">下一步</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.rid" cascade="patrolEventBean.auids" key="rid">
		  							<%
		  							List<Map> nextRouteList=(List<Map>)dataMap.get("NEXTROUTELIST");
		  							List<Map> userRouteList=new ArrayList<Map>();
		  							boolean f = false;
		  							if(nextRouteList!=null&&nextRouteList.size()>0){
		  								for(Map routeMap:nextRouteList){
		  									List<Map> userRouteLists=(List<Map>)routeMap.get("USERLIST");
		  									String name = (String)routeMap.get("NAME");
	  										if("完结".equals(name)){
	  											f = true;
	  										}
		  									if(userRouteLists!=null){
			  									for(Map userRouteMap:userRouteLists){
			  										userRouteMap.put("RID",routeMap.get("RID"));
			  										userRouteList.add(userRouteMap);
			  									}
		  									}
		  							 %>
		  							<div class="form-ui-option" value="<%=routeMap.get("RID") %>"><%=name %></div>
		  							<%
		  								}
		  							}else{
		  								f = true;
		  							%>
		  							<div class="form-ui-option" value="END">完结</div>
		  							<%} %>
		  						</div>
		  					</td>
		  				</tr>
		  				<%if(f){ %>
		  				<tr>
		  					<th>案卷延期</th>
		  					<td>
		  						<div class="form-ui-select" name="patrolEventBean.delayDay">
		  							<div class="form-ui-option" value="0">不延期</div>
		  							<div class="form-ui-option" value="7">7天</div>
		  							<div class="form-ui-option" value="15">15天</div>
		  							<div class="form-ui-option" value="30">30天</div>
		  							
		  						</div>
		  					</td>
		  				</tr>
		  				<%} %>
		  				<tr>
		  					<th>人员</th>
		  					<td>	
		  						<input type="hidden" id="auids" title="上报人员" check="null" class="null" />	  						
		  						<div name="patrolEventBean.auids" loadUrl="">
		  							<%
		  							List<Map> userList=userRouteList;
		  							if(userList!=null&&userList.size()>0){
		  								Map<Object,List<Map>> deptMap=new HashMap<Object,List<Map>>();
		  								for(Map userMap:userList){
		  									List<Map> userListChild=deptMap.get(userMap.get("DEPT"));
		  									if(userListChild==null){
		  										userListChild=new ArrayList<Map>();
			  									deptMap.put(userMap.get("DEPT"),userListChild);
		  									}
		  									userListChild.add(userMap);
		  								}
		  								Iterator itss=deptMap.keySet().iterator();
		  								while(itss.hasNext()){
		  									String dept=(String)itss.next();
		  									List<Map> userListChild=deptMap.get(dept);
		  									%>
		  									<div style="width:99%;float:left;padding-left:1%;">
		  									<label class="all" style="display:none"><input type="checkbox"><%=dept %></label>
		  									<div style="width:98%;float:left;padding-left:2%;">
		  									<%
		  									for(Map userMap:userListChild){
		  							 %>
		  							 	<label style="display:none" type="<%=userMap.get("RID") %>"><input type="checkbox" name="patrolEventBean.auids" value="<%=userMap.get("AUID") %>" <%=userMap.get("SELECTED")!=null&&userMap.get("SELECTED").equals(true)?"checked='checked'":"" %> /><%=userMap.get("NAME") %></label>
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
		  				<tr>
		  					<th height>意见</th>
		  					<td colspan="3">
		  						<textArea name="patrolEventBean.content" id="output" check="null" class="null" title="意见"></textArea>
		  						<select id="selcontent" onchange="setVar();">
		  							<option>请选择快捷输入语句</option>
								    <option>同意</option>
								    <option>请加快处理</option>
								    <option>请立即处理</option>
								    <option>请引起重视</option>
								    <option>请通报到相关业务科室</option>
								    <option>结束</option>
							    </select>
		  					</td>
		  				</tr>
		  				<%
		  				if(dataMap.get("NODE")!=null&&dataMap.get("NODE").equals("事件办理")){
		  				%>
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
		  				<%} %>
		  			</tbody>
  				</table>
  			</div>
  		</div>
  		<%
  		}
  		%>
  			
  		<%
  		if(type!=null&&type.equals("supervise")){
  		%>
  		<div class="module default">
  			<div class="title">
  				<div class="info selected">批示</div>
  			</div>
  			<div class="content" style="padding:10px;">
  				<table class="detailTable" border="1">
		  			<tbody>
		  				<tr>
		  					<th height>意见</th>
		  					<td colspan="3">
		  					<input type="hidden" name="patrolEventBean.supervise" value="true" />
	  						<textArea name="patrolEventBean.content" id="output" style="height:100px;"></textArea>
	  						<select id="selcontent" onchange="setVar();">
							    <option>同意</option>
							    <option>请加快处理</option>
							    <option>请立即处理</option>
							    <option>请引起重视</option>
							    <option>请通报到相关业务科室</option>
							    <option>结束</option>
						    </select>
		  					</td>
		  				</tr>
		  			</tbody>
  				</table>
  			</div>
  		</div>
  		<%
  		}
  		%>
  		<%
  		if(type!=null){
  		%>
  		<div style="float:left;height:30px;">&nbsp;</div>
  		<div class="submit">
  			<center>
  			<%if(!type.equals("detail")){%>
  			<input class="saveBtn" type="button" value="提交">
  			<%} %>
  			</center>
  		</div>
  		<%
  		}
  		%>
  	</form>
  	
  	
  	<div id="iviewer">
        <div class="loader"></div>

        <div class="viewer"></div>

        <ul class="controls">
            <li class="close"></li>
            <li class="zoomin"></li>
            <li class="zoomout"></li>
            <li class="prev"></li>
            <li class="next"></li>
        </ul>

        <p class="info">
        </p>
    </div>
  	
  	
	<script src="js/jquery/jquery.js"></script>
	<script type="text/javascript" src="js/jquery/jquery.datepicker.js"></script>
	
    <script type="text/javascript" src="js/iviewer-0.7.7/test/jqueryui.js" ></script>
    <script type="text/javascript" src="js/iviewer-0.7.7/test/jquery.mousewheel.min.js" ></script>
    <script type="text/javascript" src="js/iviewer-0.7.7/jquery.iviewer.js" ></script>
    <script src="js/iviewer-0.7.7/test/lightbox/main.js"></script>
	
	<script src="js/framework/css.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/table.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/form.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/module.js" type="text/javascript" language="javascript"></script>
	<script src="js/framework/form.ui.js" type="text/javascript" language="javascript"></script>
	
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.jplayer.min.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.transform2d.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.grab.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/mod.csstransforms.min.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/circle.player.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/main.js"></script>
	<script type="text/javascript">
		window.onload = function() {
			var input = $(".detailTable:eq(0) tr:eq(5)").find("td:eq(0)").find("input");
			var length = input.length;
			for(var i=0;i<length;i++){
				var path1 = input.eq(i).val();
				var path=input.eq(i).attr("lazySrc");
				$("<a href='"+path+"' target='_blank'> <img class='go' href='"+path+"' src='"+path1+"' height='50' /></a>").appendTo(".detailTable:eq(0) tr:eq(5) td:eq(0)");
			}
			var input2 = $(".detailTable:eq(1)").find("td").find("input");
			var length2 = input2.length;
			for(var i=0;i<length2;i++){
				var path1 = input2.eq(i).val();
				var path=input2.eq(i).attr("lazySrc");
				$("<a href='"+path+"' target='_blank'> <img class='go' href='"+path+"' src='"+path1+"' height='50' /></a>").appendTo(".detailTable:eq(1) tr:eq(4) td:eq(0)");
			}
		}
	</script>
	<script type="text/javascript" language="javascript">
		$(function(){
			<%-- 	$("#map").click(function(){
				var longitude=$("input[name='patrolEventBean.longitude']").val();
				var latitude=$("input[name='patrolEventBean.latitude']").val();
				top.addTab({name:'地图定位',closeCallBack:function(result){
					if(result&&result.length>0){
						var location=result.split("|");
						$("input[name='patrolEventBean.longitude']").val(location[0]);
						$("input[name='patrolEventBean.latitude']").val(location[1]);
					}
				},href:'<%=basePath %>plugins/gis/patrolMap.jsp?type=edit&longitude=<%=dataMap.get("LONGITUDE") %>&latitude=<%=dataMap.get("LATITUDE") %>'});
				/**
				var result=window.showModalDialog('<%=basePath %>plugins/gis/map.jsp?type=edit&longitude='+longitude+'&latitude='+latitude,window,'dialogWidth:800px;dialogHeight:500px')
				if(result&&result.length>0){
					var location=result.split("|");
					$("input[name='patrolEventBean.longitude']").val(location[0]);
					$("input[name='patrolEventBean.latitude']").val(location[1]);
				}
				**/
			});--%>

			$("div[name='patrolEventBean.rid'] div.form-ui-option").click(function(){
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
			
			$("[name='patrolEventBean.auids'] :checkbox").click(function(){
				var auidsContainer=$("div[name='patrolEventBean.auids']");
				var selectedRid = $("div[name='patrolEventBean.rid'] div.form-ui-option[selected='selected']").attr("value");
				
				var length=auidsContainer.find("label[type='"+ selectedRid +"'] input[name='patrolEventBean.auids']:checked").length;
				var value=$(this).attr("value");
				if(length>0||value=="END"){
					$("#auids").val(length?length:value);
				}else{
					$("#auids").val("");
				}
			});
			$("[name='patrolEventBean.rid'] div").click(function(){
				var auidsContainer=$("div[name='patrolEventBean.auids']");
				var selectedRid = $(this).attr("value");
				
				var length=auidsContainer.find("label[type='"+ selectedRid +"'] input[name='patrolEventBean.auids']:checked").length;
				var value=$(this).attr("value");
				if(length>0||value=="END"){
					$("#auids").val(length?length:value);
				}else{
					$("#auids").val("");
				}
			});
		});

		function setVar(){
			$('#output').val($('#selcontent option:selected').text());
		} 
	</script>
  </body>
</html>