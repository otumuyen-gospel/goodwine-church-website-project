<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.net.URLDecoder" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    Map <String, Object>map = new HashMap();
    
    ResultSet rs = jdbc.query("select video_of_the_day, welcome_message, welcome_author,facebook,twitter"
            + ",instagram,youtube from about");
    if(rs.next()){
        HomeData2 data = new HomeData2();
        data.setVideo(request.getContextPath()+"/resource/"+rs.getString("video_of_the_day"));
        data.setMessage(URLDecoder.decode(rs.getString("welcome_message"),"UTF-8"));
        data.setAuthor(rs.getString("welcome_author"));
        data.setFacebook(rs.getString("facebook"));
        data.setTwitter(rs.getString("twitter"));
        data.setYoutube(rs.getString("youtube"));
        data.setInstagram(rs.getString("instagram"));
        map.put("media",data);
    }
    rs = jdbc.query("select * from post where type='sermon' order by id desc limit 0,3");
    int key = 0;
    while(rs.next()){
        HomeData data = new HomeData(String.valueOf(rs.getInt("id")),rs.getString("title"),
        request.getContextPath()+"/resource/"+rs.getString("photo"),URLDecoder.decode(rs.getString("texts"),
                "UTF-8"),250);
        map.put(rs.getString("type")+String.valueOf(key),data);
        key++;
    }
    rs = jdbc.query("select * from post where type='event' order by id desc limit 0,3");
    key = 0;
    while(rs.next()){
        HomeData data = new HomeData(String.valueOf(rs.getInt("id")),rs.getString("title"),
        request.getContextPath()+"/resource/"+rs.getString("photo"),URLDecoder.decode(rs.getString("texts"),
                "UTF-8"),150);
        map.put(rs.getString("type")+String.valueOf(key),data);
        key++;
    }
    rs = jdbc.query("select * from post where type='testimonial' order by id desc limit 0,4");
    key = 0;
    while(rs.next()){
        HomeData data = new HomeData(String.valueOf(rs.getInt("id")),rs.getString("title"),
        request.getContextPath()+"/resource/"+rs.getString("photo"),URLDecoder.decode(rs.getString("texts"),
                "UTF-8"),100);
        map.put(rs.getString("type")+String.valueOf(key),data);
        key++;
    }
    out.println(json.converToJson(map));
    jdbc.close();
    rs.close();
    
   
%>