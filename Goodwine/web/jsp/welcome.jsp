<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") !=null){
        String message = request.getParameter("message");
        String author = request.getParameter("author");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        if(!message.isEmpty()){
            if(!author.isEmpty()){
                String sql;
                if(jdbc.getRowSize("about") > 0){
                    sql = "update about set welcome_message='"+message+"', welcome_author='"+author+"'";
                }else{
                    sql = "insert into about values(0,'','"+message+"','"+author+"','','','','','','','','','',''"
                            + ",'','','','','','','','','')";
                }
                if(jdbc.update(sql)){
                    jdbc.close();
                    out.println("done");
                }else{
                     out.println("an error occured while processing this update");
                }

            }else{
                out.println("please enter name of church Overseer");
            }
        }else{
            out.println("please enter welcome message");
        }
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>