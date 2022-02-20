<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("verifier") != null && session.getAttribute("code") != null){
        String password = request.getParameter("password");
        String confirm = request.getParameter("confirm");
        if(!password.isEmpty()){
            if(confirm.equals(password)){
                JDBC jdbc = new JDBC();
                jdbc.connect();
                jdbc.createStatement();
                if(jdbc.update("update account set password='"+password+"'")){
                    String url = request.getRequestURL().toString();
                    url =url.replace(url.substring(url.lastIndexOf('/')+1,url.length()),"recover.jsp");
                    url+="?email=";
                    url+=session.getAttribute("verifier").toString();
                    jdbc.close();
                    String html = "<h3>Hello "+session.getAttribute("verifier").toString();
                    html+="</h3><br/>";
                    html+="<p>We have noticed something <span class='color:red;'>Phishing</span> on"
                            + " your Goodwine admin web account. someone just made changes to your password:</p><br/>";
                    html+="<p>if this changes was done by you disregard this message. otherwise click the link below to"
                            + " recover from this attack</p><br/><br/>";
                    html+="<a href=\""+url;
                    html+="\" ";
                    html+="style=\"display:inline-block;text-decoration:none;padding:20px;background-color:rgba(255,0,0,0.5);color:white;\">";
                    html+="Recover Account</a><br/>";
                    new InstantMail().sendMessage(session.getAttribute("verifier").toString(),
                            "Secure Your Account", html);
                    out.println("update Effected successfully");
                }else{
                     out.println("an error occured while processing this update");
                }
                
            }else{
                out.println("please confirm new password");
            }
        }else{
            out.println("please enter a new password");
        }
        
    }else{
         out.println("error"); 
    }
   
%>