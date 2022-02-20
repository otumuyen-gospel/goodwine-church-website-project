<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("verifier") != null && session.getAttribute("code") != null){
        String code = request.getParameter("code");
        if(!code.trim().isEmpty()){
            if(code.trim().equals(session.getAttribute("code").toString().trim())){
                out.println("verified");
            }else{
                out.println("wrong code");
            }
        }else{
             out.println("enter the code sent to you"); 
        }
    }else{
        out.println("error");
    }
    
   
%>