<%@page import="goodwine.com.api.*,java.sql.*"%>
<%
    if(session.getAttribute("login") !=null){
        String phone = request.getParameter("phone");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(!phone.isEmpty()){
                String sql = "insert into phone values(0,'"+phone+"')";
                if(jdbc.getRowSize("phone") > 0){
                    sql ="update phone set phone='"+phone+"'";
                }
                if(jdbc.update(sql)){
                    jdbc.close();
                    out.println("done");
                }else{
                     out.println("an error occured while processing this update");
                }
                                                        
            }else{
                out.println("please enter a working contact number");
            }
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>