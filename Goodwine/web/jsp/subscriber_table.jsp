<%@page import="goodwine.com.api.*,java.sql.*,java.util.*" %>
<%
    if(session.getAttribute("login") == null){
        out.println("error");
    }else{
        JDBC jdbc = new JDBC();
        jdbc.connect();
        SimpleJSON json = new SimpleJSON();
        jdbc.createStatement();
        int rows = jdbc.getRowSize("subscriber");
        int upper = 4;
        int lower = 0;

        if(session.getAttribute("lower_sub") != null){
            lower = Integer.parseInt(String.valueOf(session.getAttribute("lower_sub")));
            if((lower + upper) >= rows){
                session.setAttribute("lower_sub","0");
                lower = 0;
            }else{
                lower += upper; 
                session.setAttribute("lower_sub",String.valueOf(lower));
            }

        }else{
            session.setAttribute("lower_sub","0");
        }

        Map <String, Object>map = new HashMap();
        ResultSet rs = jdbc.query("select * from subscriber limit "+lower+","+upper);
        int count = 0;
        while(rs.next()){
            int id = rs.getInt(1);
            String email = rs.getString(2);
            Subscriber sub = new Subscriber(String.valueOf(id),email);
            map.put("sub"+String.valueOf(count),sub);
            count++;
        }

        jdbc.close();
        rs.close();
        out.println(json.converToJson(map));
   }
   
%>