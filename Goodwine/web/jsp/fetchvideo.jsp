<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") !=null){
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        ResultSet rs = jdbc.query("select video_of_the_day from about");
        if(rs.next()){
            //actual server path where file is located
            String filePath = request.getContextPath()+"/resource/"+rs.getString(1);
            out.println(filePath);
        }else{
            out.println("error");
        }
        
        jdbc.close();
        rs.close();
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>