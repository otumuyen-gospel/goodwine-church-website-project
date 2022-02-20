<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") !=null){
        String history = request.getParameter("editor1");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(!history.isEmpty()){
                String sql;
                if(jdbc.getRowSize("about") > 0){
                    sql = "update about set history='"+history+"'";
                }else{
                    sql = "insert into about values(0,'','','','','','','','','','"+history+"','','',''"
                            + ",'','','','','','','','','')";
                }
                if(jdbc.update(sql)){
                    jdbc.close();
                    out.println("done");
                }else{
                     out.println("an error occured while processing this update");
                }

            }else{
                out.println("please enter church history");
            }
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>