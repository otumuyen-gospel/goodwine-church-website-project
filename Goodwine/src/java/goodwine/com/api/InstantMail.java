/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

import java.io.File;
import java.net.URLDecoder;
import java.sql.ResultSet;

public class InstantMail {
    
    public String sendMessage(String recipient, String subject, String html) {
        String status = "";
        try{
            //fetch email server details
            JDBC jdbc = new JDBC();
            jdbc.connect();
            jdbc.createStatement();
            String sql = "select facebook,instagram,twitter,youtube,email from about";
            ResultSet rs = jdbc.query(sql);
            String host = "mail.goodwineinternationalchurch.org";
            String from = "";
            String password = "1;54zB%QSbTb";
            String port = "8025";
            String user ="goodwine@goodwineinternationalchurch.org";
            String facebook = "";
            String instagram = "";
            String twitter = "";
            String youtube = "";
            
            if(rs.next()){
                facebook = rs.getString("facebook");
                instagram = rs.getString("instagram");
                twitter = rs.getString("twitter");
                youtube = rs.getString("youtube");
                from = rs.getString("email");
            }
            
            jdbc.close();
            rs.close();
           Email mail = new Email();
           mail.doSend(host, password, user, port, from, recipient, subject, html,
                   facebook,instagram, twitter,youtube);
          status = Email.status;
            
        }catch(Exception e){
              e.printStackTrace();
             status = Email.status;
        }
        return status;
        
    }
    
    
    public String sendBulkMessage(File post,String []recipients, String subject, String html) {
        String status = "";
        try{
            //fetch email server details
            JDBC jdbc = new JDBC();
            jdbc.connect();
            jdbc.createStatement();
            String sql = "select facebook,instagram,twitter,youtube,email from about";
            ResultSet rs = jdbc.query(sql);
            String host = "mail.goodwineinternationalchurch.org";
            String from = "";
            String password = "1;54zB%QSbTb";
            String port = "8025";
            String user ="goodwine@goodwineinternationalchurch.org";
            String facebook = "";
            String instagram = "";
            String twitter = "";
            String youtube = "";
            
            if(rs.next()){
                facebook = rs.getString("facebook");
                instagram = rs.getString("instagram");
                twitter = rs.getString("twitter");
                youtube = rs.getString("youtube");
                from = rs.getString("email");
            }
            
            jdbc.close();
            rs.close();
           Email mail = new Email();
           mail.doSendBulk(post,host, password, user, port, from, recipients, subject, html,
                   facebook,instagram, twitter,youtube);
          status = Email.status;
            
        }catch(Exception e){
              e.printStackTrace();
             status = Email.status;
        }
        return status;
        
    }
    
    public String sendContact(String from, String subject,String text) {
        String status = "";
        try{
            //fetch email server details
            JDBC jdbc = new JDBC();
            jdbc.connect();
            jdbc.createStatement();
            String sql = "select email from about";
            ResultSet rs = jdbc.query(sql);
            String host = "mail.goodwineinternationalchurch.org";
            String to = "";
            String password = "1;54zB%QSbTb";
            String port = "8025";
            String user ="goodwine@goodwineinternationalchurch.org";
            
            if(rs.next()){
                to = rs.getString("email");
            }
            
            jdbc.close();
            rs.close();
           Email mail = new Email();
           mail.Contact(host, password, user, port, from, to, subject, text);
          status = Email.status;
            
        }catch(Exception e){
              e.printStackTrace();
             status = Email.status;
        }
        return status;
        
    }
    
}

