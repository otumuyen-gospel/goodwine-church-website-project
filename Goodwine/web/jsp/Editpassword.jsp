<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") !=null){
        String old = request.getParameter("old");
        String password = request.getParameter("new");
        String confirm = request.getParameter("confirm");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        if(jdbc.getRowSizeByQuery("select count(*) as total from account where password='"+old+"'",
           "total") > 0){
            if(!password.isEmpty()){
                if(confirm.equals(password)){
                    if(jdbc.update("update account set password='"+password+"'")){
                        String url = request.getRequestURL().toString();
                        url =url.replace(url.substring(url.lastIndexOf('/')+1,url.length()),"recover.jsp");
                        url+="?email=";
                        url+=session.getAttribute("login").toString();
                        jdbc.close();
                        String html = "<h3>Hello "+session.getAttribute("login").toString();
                        html+="</h3><br/>";
                        html+="<p>We have noticed something <span class='color:red;'>Phishing</span> on"
                                + " your Goodwine admin web account. someone just made changes to your password:</p><br/>";
                        html+="<p>if this changes was done by you disregard this message. otherwise click the link below to"
                                + " recover from this attack</p><br/><br/>";
                        html+="<a href=\""+url;
                        html+="\" ";
                        html+="style=\"display:inline-block;text-decoration:none;padding:20px;background-color:rgba(255,0,0,0.5);color:white;\">";
                        html+="Recover Account</a><br/>";
                        new InstantMail().sendMessage(session.getAttribute("login").toString(),
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
             session.removeAttribute("login");
             out.println("error2"); 
        }
    }else{
         session.removeAttribute("login");
         out.println("error1"); 
    }
   
%>