<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html;charset=utf-8" %>
<%@ page language="java"  pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.cgrj.webform.func.varmanager.*"%>
<%@ page import="com.cgrj.webform.func.varmanager.complexelement.*"%>
<%@ page import="com.cgrj.webform.dataset.*"%>

<html>
<head>

<% 
	String pageName = "simpfileupload";
	String actionNamespace = "/fileupload";
   
	Map<String,Boolean> permissMap=(Map<String,Boolean>)session.getAttribute("map");
   
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";
		//try{
	String action = request.getParameter("action");
	String queryStr = request.getQueryString();
	action = queryStr.substring(queryStr.indexOf("action=")+7);
	String fileid = request.getParameter("fileid");
	//}
	//catch(Exception e )
	//{}
%>
<base href="<%=basePath%>">
<link href="css/sys.css" type="text/css" rel="stylesheet" />
<link href="css/jquery/jquery.flexigrid.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/jslibrary/wf.submit.js"></script>


<style type="text/css">
.upload {
	width: 100%;
	height: auto;
	/*margin-top:3px;*/
}
.upload .files {
	width: 100%;
}
.uploadimg {
	height: 20px;
	width: 20px;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
	text-align: center;
	line-height: 30px;
}
.clicktext{
	text-decoration:none;
	font-family: Verdana, Geneva, sans-serif;
	font-size: 16px;
	line-height:30px;
	color:#1E5494;
	cursor:pointer;
}	
.clicktext:hover{
	font-family: Verdana, Geneva, sans-serif;
	font-size: 16px;
}	
.files{
	 }
 
 
.files p {
	height: 20px;
	margin: 0px;
	background-color: #CBEDED;
	padding-top: 3px;
	padding-right: 2px;
	padding-bottom: 2px;
	padding-left: 2px;
	text-align: left;
	line-height:20px;
}
.upload .files p span {
	font-family: "宋体";
	font-size: 14px;
	text-decoration: none;
	color:#1E5494;
}
.upload .files p span:hover {
	text-decoration: underline;
}
.list {
	margin: 0px;
	padding: 0px;
	height: 30px;
}
.deletebtn
{
	cursor:pointer;
}
</style>
<style>
a{
display:inline-block; 
width:100px; 
height:40px; 
background:url(<%=basePath%>images/button/add.gif) no-repeat 35% -3%;
/*background:red;*/
position:relative; 
overflow:hidden;
}
span.addBtn1{
	padding-left:50px;
	/*padding-top:3px;*/
	padding-bottom:3px;
	padding-right:3px;
	cursor:pointer;
	font-size:12px;
}
input{
position:absolute; 
right:0; 
top:0; 
font-size:100px; 
opacity:0; 
filter:alpha(opacity=0);
}
</style>
 <script type="text/javascript">
$(document).ready(function(){
	$("#clicktext").click(function(){
		$("#upload .uploadfile").click();
     });
});

	$(document).ready(function() {
		resetHeight();
		
		//$('.uploadfile').bind('onpropertychange',function(){alert(1)});
	});

function submitFile()
{
var name = document.getElementById('<%=fileid%>').value;
//alert(name);
if( name == "")
{
return;
}else{
		var index = name.lastIndexOf(".");
		var type= name.substring(index+1);
		//alert(type);
		//if(type != 'jpg' && type != 'JPG'){
			//alert("请上传格式为jpg的图片！");	
			//return;
		//}

		if(type != 'jpg' && type != 'JPG' && type!='doc' && type!='docx' && type!='xls' && type!='xlsx' && type!='ppt' && type!='pptx' && type!='wps' && type!='et' && type!='txt' && type!='rar' && type!='zip'){
			alert("请上传doc、docx、xls、xlsx、ppt、pptx、wps、et、dps、txt、rar、zip格式的文档！");	
			return;
		}
}
wfSubmit.doSubmit({actionName:'<%=action%>',submitType:'post',isAjax:false});
		document.getElementById('<%=fileid%>').value ="";
}	

  function addfile(){
	 $(".uploadfile").click(); 
	  }
function resetHeight(){
   	parent.document.all('<%=fileid%>').style.height=document.body.scrollHeight+30; 
 //  parent.document.all("iframe1").style.width=document.body.scrollWidth; // 宽度视乎不太好使 如果宽度要在iframe里设置 注释掉这行 在iframe里设置宽即可
  }
     var fileNum=1;
    //mouseover时，把input file移到按扭上，保证点击的是file，
    function floatFile()
    {   

    
        document.getElementById('<%=fileid%>').style.posTop=event.srcElement.offsetTop;
   

        document.getElementById('<%=fileid%>').style.posLeft=event.x-document.getElementById('<%=fileid%>').offsetWidth/2;
    }
    
    function getMessage(message)
    {
 
    	if(message!=null&&message.isSuccess == true)
    	{
    		window.parent.uploadSuccess();
    	}
    	resetHeight();
    }
  
  
  
 </script>
<title>
	
</title>



</head>

<body>

<form id="mainform" name="mainform" method="post" enctype="multipart/form-data" action="" target="iframe">	
<div id="upload" class="upload" style="position:relative">
<a><span class="addBtn1">新增</span>
<input type="file" id="<%=fileid%>" name="<%=fileid%>"  onchange="submitFile()" style="width:70px;margin-left:5px;"/>
</a>
</div>
</form>
<iframe id="iframe" name="iframe" style="display:none" src="fileupload/blank.jsp"></iframe>
</body>

</html>