<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") !=null){
        String email = request.getParameter("email");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        if(!email.isEmpty()){
            if(jdbc.update("update account set email='"+email+"'")){
                String url = request.getRequestURL().toString();
                url =url.replace(url.substring(url.lastIndexOf('/')+1,url.length()),"recover.jsp");
                url+="?email=";
                url+=session.getAttribute("login").toString();
                jdbc.close();
                String html = "<h3>Hello "+session.getAttribute("login").toString();
                html+="</h3><br/>";
                html+="<p>We have noticed something <span class='color:red;'>Phishing</span> on"
                        + " your Goodwine admin web account. someone just made changes to your username:</p><br/>";
                html+="<p>if this changes was done by you disregard this message. otherwise click the link below to"
                        + " recover from this attack</p><br/><br/>";
                html+="<a href=\""+url;
                html+="\" ";
                html+="style=\"display:inline-block;text-decoration:none;padding:20px;background-color:rgba(255,0,0,0.5);color:white;\">";
                html+="Recover Account</a><br/>";
                new InstantMail().sendMessage(session.getAttribute("login").toString(),
                        "Secure Your Account", html);
                session.setAttribute("login",email);
                out.println("done");
            }else{
                 out.println("an error occured while processing this update");
            }

        }else{
            out.println("please enter a valid email address");
        }
            
    }else{
         out.println("error1"); 
    }
   
%>