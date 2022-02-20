<%@page import="goodwine.com.api.*,java.sql.*" %>
<%
    if(session.getAttribute("login") == null){
        out.println("error");
    }else{
        JDBC jdbc = new JDBC();
        jdbc.connect();
        SimpleJSON json = new SimpleJSON();
        jdbc.createStatement();
        String contact = String.valueOf(jdbc.getRowSize("contact"));
        String post = String.valueOf(jdbc.getRowSize("post"));
        String subscriber = String.valueOf(jdbc.getRowSize("subscriber"));
        String testimonial = String.valueOf(jdbc.getRowSizeByQuery("select count(*) as total from post where type='testimonial'","total"));
        jdbc.close();
        out.println(json.converToJson(new String[]{contact,subscriber,post,testimonial}));
        
    }
%>