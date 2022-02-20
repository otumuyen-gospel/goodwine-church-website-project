<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
        String message = request.getParameter("message");
        String email = request.getParameter("email");
        String subject = request.getParameter("subject");
        String name = request.getParameter("username");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        if(!name.isEmpty()){
            if(email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")){
                if(!subject.isEmpty()){
                    if(!message.isEmpty()){
                        String sql = "insert into contact values(0,'"+email+"','"+subject+"','"+name+"','"+message+"')";
                        if(jdbc.update(sql)){
                            new InstantMail().sendContact(email,subject,message);
                            jdbc.close();
                            out.println("done");
                        }else{
                             out.println("error");
                        }
                    }else{
                        out.println("please enter your message");
                    }
                }else{
                        out.println("please enter the subject of your message");
                }

            }else{
                out.println("please enter a valid email address");
            }
        }else{
            out.println("please enter your name");
        }
    
   
%>