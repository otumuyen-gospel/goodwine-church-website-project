<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.io.*" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    jdbc.createStatement();
    String table = request.getParameter("table");
    String id = request.getParameter("id");
    String path = "";
    if(table.equals("post")){
        ResultSet rs = jdbc.query("select photo from post where id="+id);
        if(rs.next()){
            path = request.getServletContext().getRealPath("/resource/")+rs.getString("photo");
        }
        rs.close();
        if(new File(path).delete()){
             if(jdbc.update("delete from "+table+" where id="+id)){
                 out.println("operation successful");
             }else{
                 out.println("operation unsuccessful");
             } 
        }else{
            out.println("operation unsuccessful");
        }
        
    }else{
         if(jdbc.update("delete from "+table+" where id="+id)){
             out.println("operation successful");
         }else{
             out.println("operation unsuccessful");
         } 
    
    }
    
   jdbc.close();
    
    
   
%>