<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    String email = request.getParameter("email");
    if(!email.trim().isEmpty()){
        //generate verification code
         String code = new GenerateCode().getCode();
         
        //create sessions for user and code
        session.setAttribute("verifier",email);
        session.setAttribute("code",code);
        
        /*send user email verification code and instruct javascript to redirect user to verification page
           for verification
        */
        
        String html = "<br/><h3>please below is your verification code, copy it to the website</h3><br/>";
        html+="<p>";
        html+=code;
        html+="</p>";
        
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        if(jdbc.getRowSizeByQuery("select count(*) as total from account where email='"+email+"'","total") > 0){
            String status = new InstantMail().sendMessage(email, "Account Verification", html);
            if(status.equalsIgnoreCase("done")){
                out.println("verify");
            }else{
                out.println("having trouble sending message");
            }
        }else{
            out.println("Sorry this account does not exist");
        }
        
        jdbc.close();
        
    }else{
         out.println("enter a valid email"); 
    }
   
%>