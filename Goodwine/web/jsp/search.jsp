<%@page import="goodwine.com.api.*,java.sql.*,java.util.*" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    String keyword = request.getParameter("search");
    Map <String, Object>map = new HashMap();
    ResultSet rs = jdbc.query("select * from post where title like'%"+keyword+"' or author like'%"+keyword+"'");
    int key = 0;
    while(rs.next()){
        Post p = new Post(rs.getString("type")+"s",request.getContextPath()+"/resource/"+rs.getString("photo"),
        rs.getString("title"),rs.getInt("id"));
        map.put(rs.getString("type")+key,p);
        key++;
    }
    
    
    rs = jdbc.query("select * from contact where subject like'%"+keyword+"' or name like'%"+keyword+"'");
    key = 0;
    while(rs.next()){
        Visitors v = new Visitors("contacts",rs.getString("name"),rs.getString("subject"),rs.getString("email"),rs.getInt("id"));
        map.put("contact"+key,v);
        key++;
    }
    
    rs = jdbc.query("select * from subscriber where email like'%"+keyword+"'");
    key = 0;
    while(rs.next()){
        Subscribers v = new Subscribers("subscribers",rs.getString("email"),rs.getInt("id"));
        map.put("subscriber"+key,v);
        key++;
    }
   
    rs = jdbc.query("select * from location where center like'%"+keyword+"'");
    key = 0;
    while(rs.next()){
        Locations L = new Locations("locations",rs.getString("center"),rs.getString("address"),rs.getInt("id"));
        map.put("location"+key,L);
        key++;
    }
    
    jdbc.close();
    rs.close();
    out.println(json.converToJson(map));
  
   
%>