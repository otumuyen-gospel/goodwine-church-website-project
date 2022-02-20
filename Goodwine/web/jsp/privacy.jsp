<%@page import="goodwine.com.api.*,java.sql.*"%>
<%
    if(session.getAttribute("login") !=null){
        String privacy = request.getParameter("editor1");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(!privacy.isEmpty()){
                String sql;
                if(jdbc.getRowSize("about") > 0){
                    sql = "update about set privacy='"+privacy+"'";
                }else{
                    sql = "insert into about values(0,'','','','','','','','','','"+privacy+"','','',''"
                            + ",'','','','','','','','','')";
                }
                if(jdbc.update(sql)){
                    jdbc.close();
                    out.println("done");
                }else{
                     out.println("an error occured while processing this update");
                }

            }else{
                out.println("please enter website privacy policies");
            }
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>