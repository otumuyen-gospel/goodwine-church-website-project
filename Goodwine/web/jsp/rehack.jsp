<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
        String password = request.getParameter("password");
        String confirm = request.getParameter("confirm");
        String email= request.getParameter("email");
        if(!password.isEmpty()){
            if(confirm.equals(password)){
                if(!email.isEmpty()){
                    JDBC jdbc = new JDBC();
                    jdbc.connect();
                    jdbc.createStatement();
                    if(jdbc.update("update account set password='"+password+"', email='"+email+"'")){
                        out.println("account recovered successfully");
                        session.removeAttribute("login");
                    }else{
                         out.println("an error occured while processing this update");
                    }
                    jdbc.close();
                }else{
                    out.println("please retry the link that brought you here again to get your email");
                    
                }
                
            }else{
                out.println("please confirm new password");
            }
        }else{
            out.println("please enter a new password");
        }
        
    
   
%>