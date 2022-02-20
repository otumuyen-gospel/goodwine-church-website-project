<%@page import="goodwine.com.api.*,java.sql.*,java.util.*,java.net.URLDecoder" %>
<%
   
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    Map<String,String> map = new HashMap();
    
    ResultSet rs = jdbc.query("select mission_message, mission_image,vision_message,vision_image,value,"
            + "values_image,overseer_name,overseer_image,overseer_text,deputy_name,deputy_image,deputy_text"
            + ",facebook,instagram,youtube,twitter from about");
    while(rs.next()){
        String s = URLDecoder.decode(rs.getString("vision_message"),"UTF-8");
        s = s.length() > 1200 ? s.substring(0,1200):s;
        map.put("vision_message",s);
        map.put("vision_image",request.getContextPath()+"/resource/"+rs.getString("vision_image"));
        s = URLDecoder.decode(rs.getString("mission_message"),"UTF-8");
        s = s.length() > 1200 ? s.substring(0,1200):s;
        map.put("mission_message",s);
        map.put("mission_image",request.getContextPath()+"/resource/"+rs.getString("mission_image"));
        s = URLDecoder.decode(rs.getString("value"),"UTF-8");
        s = s.length() > 1200 ? s.substring(0,1200):s;
        map.put("value",s);
        map.put("values_image",request.getContextPath()+"/resource/"+rs.getString("values_image"));
        map.put("overseer_name",rs.getString("overseer_name"));
        map.put("overseer_image",request.getContextPath()+"/resource/"+rs.getString("overseer_image"));
        s = URLDecoder.decode(rs.getString("overseer_text"),"UTF-8");
        s = s.length() > 1200 ? s.substring(0,1200):s;
        map.put("overseer_text",s);
        map.put("deputy_name",rs.getString("deputy_name"));
        map.put("deputy_image",request.getContextPath()+"/resource/"+rs.getString("deputy_image"));
        s = URLDecoder.decode(rs.getString("deputy_text"),"UTF-8");
        s = s.length() > 1200 ? s.substring(0,1200):s;
        map.put("deputy_text",s);
        map.put("facebook",rs.getString("facebook"));
        map.put("instagram",rs.getString("instagram"));
        map.put("youtube",rs.getString("youtube"));
        map.put("twitter",rs.getString("twitter"));
        
        
    }
    
    
    jdbc.close();
    rs.close();
    out.println(json.converToJson(map));
  
   
%>