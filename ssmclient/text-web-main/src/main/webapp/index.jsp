<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>web2(ssm-web-main)</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="./static/js/jquery.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    <h2>welcome ssm-web-main</h2>
    <button id="logout" value="退出">退出</button>
  </body>
   <script type="text/javascript">
    $(function(){
    	$.ajax({
    		type : "POST",
    		url : "http://192.168.0.244:8080/text-web-main/login",
    		data : {
    		},
    		dataType : 'json',
    		success : function(data) {
    			alert("login sucess");
    			console.log(data);
    		},
    		error : function(error) {
    			
    		}
    	}); 
    	$("#logout").click(function(){
    		window.location.href ="http://192.168.0.244:8080/text-web-main/logOut";
    	})
    })
   </script>
</html>
