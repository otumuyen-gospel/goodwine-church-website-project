<%@page import="goodwine.com.api.*,java.sql.*,java.util.*" %>
<%
    JDBC jdbc = new JDBC();
    jdbc.connect();
    jdbc.createStatement();
    String email = request.getParameter("email");
    if(!email.isEmpty()){
        if(jdbc.update("delete from subscriber where email='"+email+"'")){
            out.println("<center>");
            out.println("<h3 class=\"color:red;\">");
            out.println("You Have Successfully Unsubscribe. You're no longer eligible to receive newsletter from us.");
            out.println("</h3>");
            out.println("to resubscribe please <a href=\"../#subscribe \">click here</a>");
        }else{
            out.println("<center>");
            out.println("<h3 class=\"color:red;\">");
            out.println("unable to initiate task. please try again later.");
            out.println("</h3>");
            out.println("visit our page <a href=\"../ \">here</a>");
        }
    }else{
        out.println("<center>");
        out.println("<h3 class=\"color:red;\">");
        out.println("unable to initiate task. please try again later.");
        out.println("</h3>");
        out.println("visit our page <a href=\"../ \">here</a>");
    }
    
    jdbc.close();
    
   
%>