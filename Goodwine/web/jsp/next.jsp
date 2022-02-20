<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.net.URLDecoder" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    Map <String, Object>map = new HashMap();
    int fetchSize = 4;
    int rows = jdbc.getRowSize("post");
    String title = String.valueOf(session.getAttribute("title"));
    int keyword = Integer.parseInt(String.valueOf(session.getAttribute("id")));
    int position = Integer.parseInt(String.valueOf(session.getAttribute("position")));
    if((position + fetchSize) <= rows){
         session.setAttribute("position",(position+fetchSize));
    }
    ResultSet rs = jdbc.query("select * from post where title like'%"+title+"%' and id !="+ keyword +" limit "+position+","+fetchSize);
    int key = 0;
    while(rs.next()){
        Story p = new Story();
        p.setId(rs.getInt("id"));
        p.setAuthor(rs.getString("author"));
        p.setPhoto(request.getContextPath()+"/resource/"+rs.getString("photo"));
        p.setTitle(rs.getString("title"),35);
        p.setText(rs.getString("texts"),300);
        map.put("post"+key,p);
        key++;
    }
    jdbc.close();
    rs.close();
    out.println(json.converToJson(map));
  
   
%>