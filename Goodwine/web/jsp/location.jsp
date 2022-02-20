<%@page import="goodwine.com.api.*,java.sql.*"%>
<%
    if(session.getAttribute("login") !=null){
        String center = request.getParameter("center");
        String address = request.getParameter("address");
        String day1 = request.getParameter("day1");
        String time1 = request.getParameter("time1");
        String services1 = request.getParameter("services1");
        String day2 = request.getParameter("day2");
        String time2 = request.getParameter("time2");
        String services2 = request.getParameter("services2");
        String day3 = request.getParameter("day3");
        String time3 = request.getParameter("time3");
        String services3 = request.getParameter("services3");
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
            if(!center.isEmpty()){
                if(!address.isEmpty()){
                    if(!day1.isEmpty() && !day1.equalsIgnoreCase("Select Worship Day")){
                        if(!time1.isEmpty()){
                            if(!services1.isEmpty()){
                                if(!day2.isEmpty()&& !day2.equalsIgnoreCase("Select Worship Day")){
                                    if(!time2.isEmpty()){
                                         if(!services2.isEmpty()){
                                              if(!day3.isEmpty() && !day3.equalsIgnoreCase("Select Worship Day")){
                                                   if(!time3.isEmpty()){
                                                        if(!services3.isEmpty()){
                                                             String sql = "insert into location values(0,'"+center+"','"+address+"','"+day1+"','"+time1+"','"+services1+"','"
                                                                     +day2+"','"+time2+"','"+services2+"','"+day3+"','"+time3+"','"+services3+"')";
                                                            
                                                            if(jdbc.update(sql)){
                                                                jdbc.close();
                                                                out.println("done");
                                                            }else{
                                                                 out.println("an error occured while processing this update");
                                                            }
                                                        }else{
                                                             out.println("please enter day 3 worship service name ");
                                                        }
                                                   }else{
                                                        out.println("please enter day 3 worship service time ");
                                                   }
                                              }else{
                                                   out.println("please enter day 3 worship service day");
                                              }
                                         }else{
                                             out.println("please enter day 2 worship service name ");
                                         }
                                    }else{
                                        out.println("please enter day 2 worship service time ");
                                    }
                                }else{
                                    out.println("please enter day 2 worship service day ");
                                }
                                
                            }else{
                                out.println("please enter day 1 worship service name ");
                            }
                        }else{
                            out.println("please enter day 1 worship service time ");
                        }
                    }else{
                        out.println("please enter day 1 worship day");
                    }
                }else{
                    out.println("please enter worship center address");
                }
                
            }else{
                out.println("please enter a worship center name");
            }
        
    }else{
         session.removeAttribute("login");
         out.println("error"); 
    }
   
%>