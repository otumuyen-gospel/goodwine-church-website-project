<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
        String email = request.getParameter("email");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")){
                String sql = "insert into subscriber values(0,'"+email+"')";
                if(jdbc.getRowSizeByQuery("select count(*) as total from subscriber where email='"+email+"'"
                        ,"total") == 0){
                    if(jdbc.update(sql)){
                        String html = "<h3>Hello "+email;
                        html+="</h3><br/>";
                        html+="<p>Thank you for subscribing to our <span class=\"color:red;\">Newsletter</span></p><br/>";
                        html+="<p>You are now eligible to receive our newsletter messages.</p><br/><br/>";
                
                        new InstantMail().sendMessage(email,"Goodwine Newsletter Subscription",html);
                        jdbc.close();
                        out.println("done");
                    }else{
                         out.println("error");
                    }   
                    
                }else{
                    out.println("done");
                }
                  

            }else{
                out.println("please enter a valid email address");
            }
        
   
%>