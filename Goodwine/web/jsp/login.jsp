<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    String email = request.getParameter("email"); 
    String password = request.getParameter("password");
    if(email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")){
        if(!password.isEmpty()){
            JDBC jdbc = new JDBC();
            jdbc.connect();
            jdbc.createStatement();
            if(jdbc.getRowSize("account") > 0){ //there is an admin already
                String sql = "select * from account where email='"+email+"' and password='"+password+"'";
                ResultSet rs = jdbc.query(sql);
                if(rs.next()){
                     //create a login session
                     session.setAttribute("login",email);
                     out.print("success");
                }else{
                    out.println("ensure you have entered your credentials correctly");
                }
                rs.close();
            }else{ // no admin create admin
                String sql = "insert into account values(0,'"+email+"','"+password+"')";
                if(jdbc.update(sql)){
                    session.setAttribute("login",email);
                    out.print("success");
                }
           }
           jdbc.close();
           
        }else{
            out.println("please enter your password");
        }
    }else{
        out.println("please enter a valid email");
    }
%>