<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.cgrj.webform.func.varmanager.*"%>
<%@ page import="com.cgrj.webform.func.varmanager.complexelement.*"%>
<%@ page import="com.cgrj.webform.dataset.*"%>

<html>
<head>

<% 
	//String pageName = "fileupload";
	//String actionNamespace = "/XZCF/fileupload";
   
	Map<String,Boolean> permissMap=(Map<String,Boolean>)session.getAttribute("map");
   
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";
		
	String action = request.getParameter("action");
	String fileid = request.getParameter("fileid");
%>
<base href="<%=basePath%>">
<link href="css/sys.css" type="text/css" rel="stylesheet" />
<link href="css/main.css" type="text/css" rel="stylesheet" />
<style type="text/css">

</style>
 <script type="text/javascript">

 </script>
<title>
	
</title>



</head>

<body>

</body>

</html>
