<%@ page language="java" import="com.sucsoft.zsxh.core.util.SysInfo,com.sucsoft.zsxh.core.entity.patrol.*,java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>"/>
    
    <title>巡查事件管理</title>
    
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	
	<link rel="stylesheet" href="plugins/jQuery.jPlayer.2.6.0/circle.player.css">
  	
  	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!--[if IE 6]>
	<link href="/css/ie6.css" rel="stylesheet" type="text/css" />
	<![endif]-->
	
  </head>
  
  <body>	
  		<div sound="<%=basePath %>plugins/jQuery.jPlayer.2.6.0/a.mp3"></div>
  <%--
			<div id="jquery_jplayer_1" class="cp-jplayer"></div>
			
			<div id="cp_container_1" class="cp-container">
				<div class="cp-buffer-holder">
					<div class="cp-buffer-1"></div>
					<div class="cp-buffer-2"></div>
				</div>
				<div class="cp-progress-holder">
					<div class="cp-progress-1"></div>
					<div class="cp-progress-2"></div>
				</div>
				<div class="cp-circle-control"></div>
				<ul class="cp-controls">
					<li><a class="cp-play" tabindex="1">play</a></li>
					<li><a class="cp-pause" style="display:none;" tabindex="1">pause</a></li> 
				</ul>
			</div>
 --%>
	  	
  	
	<script type="text/javascript" src="js/jquery/jquery.js"></script>
	
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.jplayer.min.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.transform2d.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/jquery.grab.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/mod.csstransforms.min.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/circle.player.js"></script>
	<script type="text/javascript" src="plugins/jQuery.jPlayer.2.6.0/main.js"></script>
	
	
	
  </body>
</html>
