<%@page import="goodwine.com.api.*,java.sql.*,java.util.*" %>
<%
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    Map <String, Object>map = new HashMap();
    ResultSet rs = jdbc.query("select * from location");
    int count = 0;
    while(rs.next()){
        String center = rs.getString(2);
        String address = rs.getString(3);
        String day1 = rs.getString(4);
        String time1 = rs.getString(5);
        String services1 = rs.getString(6);
        String day2 = rs.getString(7);
        String time2 = rs.getString(8);
        String services2 = rs.getString(9);
        String day3 = rs.getString(10);
        String time3 = rs.getString(11);
        String services3 = rs.getString(12);
        Location location = new Location(center,address,day1,time1,services1,
                day2,time2,services2,day3,time3,services3);
        map.put("locations"+String.valueOf(count),location);
        count++;
    }
    
    map.put("break","breakpoint"); //new object is coming
    
    rs = jdbc.query("select * from phone");
    if(rs.next()){
        String phone = rs.getString(2);
        map.put("phones",new Phone(phone));
        count++;
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