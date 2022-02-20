<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.net.URLDecoder" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    String keyword = request.getParameter("id");
    session.setAttribute("id",keyword);
    Map <String, Object>map = new HashMap();
    int fetchSize = 4;
    session.setAttribute("position",fetchSize);
    String title = "";
    ResultSet rs = jdbc.query("select * from post where id="+keyword);
    int key = 0;
    if(rs.next()){
        Story p = new Story();
        p.setId(rs.getInt("id"));
        p.setAuthor(rs.getString("author"));
        p.setPhoto(request.getContextPath()+"/resource/"+rs.getString("photo"));
        p.setTitle(rs.getString("title"));
        title = rs.getString("title");
        session.setAttribute("title",title);
        p.setText(URLDecoder.decode(rs.getString("texts"),"UTF-8"));
        map.put("post"+key,p);
        key++;
    }
    
    
    rs = jdbc.query("select * from post where title like'%"+title+"%'  limit 0,"+fetchSize);
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
    rs = jdbc.query("select video_of_the_day, welcome_message, welcome_author,facebook,twitter"
            + ",instagram,youtube from about");
    if(rs.next()){
        HomeData2 data = new HomeData2();
        data.setVideo(request.getContextPath()+"/resource/"+rs.getString("video_of_the_day"));
        data.setMessage(rs.getString("welcome_message"));
        data.setAuthor(rs.getString("welcome_author"));
        data.setFacebook(rs.getString("facebook"));
        data.setTwitter(rs.getString("twitter"));
        data.setYoutube(rs.getString("youtube"));
        data.setInstagram(rs.getString("instagram"));
        map.put("media",data);
    }
    jdbc.close();
    rs.close();
    out.println(json.converToJson(map));
  
   
%>