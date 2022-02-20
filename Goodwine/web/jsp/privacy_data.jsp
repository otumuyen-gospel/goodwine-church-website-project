<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    JDBC jdbc = new JDBC();
    jdbc.connect();
    SimpleJSON json = new SimpleJSON();
    jdbc.createStatement();
    String privacy = "";
    String youtube = "";
    String facebook = "";
    String instagram = "";
    String twitter = "";
    ResultSet rs = jdbc.query("select privacy,youtube,facebook,instagram,twitter from about");
    if(rs.next()){
        privacy = rs.getString(1);
        youtube = rs.getString(2);
        facebook = rs.getString(3);
        instagram = rs.getString(4);
        twitter = rs.getString(5);
    }
    jdbc.close();
    rs.close();
    out.println(json.converToJson(new String[]{privacy,youtube,facebook,instagram,twitter}));
%>