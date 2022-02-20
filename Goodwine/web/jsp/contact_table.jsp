<%@page import="goodwine.com.api.*,java.sql.*,java.util.*" %>
<%
    if(session.getAttribute("login") == null){
        out.println("error");
    }else{
        JDBC jdbc = new JDBC();
        jdbc.connect();
        SimpleJSON json = new SimpleJSON();
        jdbc.createStatement();
        int rows = jdbc.getRowSize("contact");
        int upper = 4;
        int lower = 0;

        if(session.getAttribute("lower_contact") != null){
            lower = Integer.parseInt(String.valueOf(session.getAttribute("lower_contact")));
            if((lower + upper) >= rows){
                session.setAttribute("lower_contact","0");
                lower = 0;
            }else{
                lower += upper; 
                session.setAttribute("lower_contact",String.valueOf(lower));
            }

        }else{
            session.setAttribute("lower_contact","0");
        }

        Map <String, Object>map = new HashMap();
        ResultSet rs = jdbc.query("select * from contact limit "+lower+","+upper);
        int count = 0;
        while(rs.next()){
            int id = rs.getInt(1);
            String email = rs.getString(2);
            String subject = rs.getString(3);
            String name = rs.getString(4);
            String message = rs.getString(5);
            Contact contact = new Contact(String.valueOf(id),email,subject,name,message);
            map.put("contact"+String.valueOf(count),contact);
            count++;
        }

        jdbc.close();
        rs.close();
        out.println(json.converToJson(map));
    }
   
%>