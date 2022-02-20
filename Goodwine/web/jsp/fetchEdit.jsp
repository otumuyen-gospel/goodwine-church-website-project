<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.net.URLDecoder" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    String keyword = request.getParameter("id");
    Map <String, Object>map = new HashMap();
    ResultSet rs = jdbc.query("select * from post where id="+keyword);
    if(rs.next()){
        Story p = new Story();
        p.setId(rs.getInt("id"));
        p.setAuthor(rs.getString("author"));
        p.setPhoto(request.getContextPath()+"/resource/"+rs.getString("photo"));
        p.setTitle(rs.getString("title"));
        p.setText(URLDecoder.decode(rs.getString("texts")));
        map.put("post",p);
    }
    
    jdbc.close();
    rs.close();
    out.println(json.converToJson(map));
  
   
%>