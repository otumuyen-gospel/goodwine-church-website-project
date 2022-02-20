<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") == null){
        out.println("error");
    }else{
        String message = request.getParameter("message");
        String email = request.getParameter("recipient");
        String subject = request.getParameter("subject");
        if(email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")){
            if(!subject.isEmpty()){
                if(!message.isEmpty()){
                    new InstantMail().sendMessage(email, subject, message);
                    out.println("done");

                }else{
                    out.println("please enter your message");
                }
            }else{
                    out.println("please enter the subject of your message");
            }

        }else{
            out.println("please enter a valid email address");
        }
    }
    
   
%>