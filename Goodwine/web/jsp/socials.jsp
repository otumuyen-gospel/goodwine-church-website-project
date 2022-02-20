<%@page import="goodwine.com.api.*,java.sql.*"%>
<%
    if(session.getAttribute("login") !=null){
        String facebook = request.getParameter("facebook");
        String email = request.getParameter("email");
        String twitter = request.getParameter("twitter");
        String youtube = request.getParameter("youtube");
        String instagram = request.getParameter("instagram");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(!facebook.isEmpty()){
                if(email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")){
                    if(!twitter.isEmpty()){
                        if(!youtube.isEmpty()){
                            if(!instagram.isEmpty()){
                                String sql;
                                if(jdbc.getRowSize("about") > 0){
                                    sql = "update about set facebook='"+facebook+"',email='"+email
                                            +"',instagram='"+instagram+"', youtube='"+youtube+"',twitter='"+
                                            twitter+"'";
                                }else{
                                    sql = "insert into about values(0,'','','','','','','','','','','','',''"
                                            + ",'','','','','"+facebook+"','"+instagram+"','"+youtube+"','"+twitter+"','"+email+"')";
                                }
                                if(jdbc.update(sql)){
                                    jdbc.close();
                                    out.println("done");
                                }else{
                                     out.println("an error occured while processing this update");
                                }
                            }else{
                                out.println("please enter instagram url");
                            }
                        }else{
                            out.println("please enter youtube url");
                        }
                    }else{
                        out.println("please enter twitter url");
                    }
                }else{
                    out.println("please enter a valid email address");
                }
                
            }else{
                out.println("please enter facebook url");
            }
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>