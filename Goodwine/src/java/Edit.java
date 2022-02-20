

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

import goodwine.com.api.GenerateCode;
import goodwine.com.api.InstantMail;
import goodwine.com.api.JDBC;
import goodwine.com.api.ResourcePath;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(urlPatterns = {"/Edit"})
@MultipartConfig(location="/home/goodwine/tomcat/webapps/goodwineinternationalchurch.org/ROOT/resource/")
public class Edit extends HttpServlet {
 @Override
 protected void doPost(HttpServletRequest request,
 HttpServletResponse response)
 throws ServletException, IOException { 
     String topic = request.getParameter("topic");
     String id = request.getParameter("id");
     String author = request.getParameter("author");
     String sermon = request.getParameter("sermon");
     String newsletter = request.getParameter("newsletter");
     Part parts = request.getPart("image");
     String format = parts.getSubmittedFileName();
     ResourcePath resource = new ResourcePath();
     if(!topic.isEmpty()){
         if(!author.isEmpty()){
             if(!sermon.isEmpty()){
                 if(format != null){//update database and image
                     InputStream str = parts.getInputStream();
                     //upload to the actual real system path folder you created to hold uploads
                     String path =resource.webUploadPath()+parts.getSubmittedFileName();
                     FileOutputStream in  = new FileOutputStream(path);
                     byte[]b = str.readAllBytes();
                     in.write(b);
                     in.close();
                     str.close();
                     //after uploading copy rename file after which fetch your file by getting the web server path 
                     File source = new File(path);
                     File target = new File(resource.webUploadPath()+
                             new GenerateCode().refactorName(parts.getSubmittedFileName()));
                     if(source.exists()){
                         source.renameTo(target);
                         if(updateDatabase(id,target,target.getName(),sermon,author,topic,newsletter)){
                              response.getWriter().write("post updated successfully");

                         }else{
                             //if unable to update database accordingly delete upload
                             Files.deleteIfExists(target.toPath());
                             response.getWriter().write("upload-error");
                         }

                     }else{
                         response.getWriter().write("upload-error");
                     }
                             

                 }else{//update database only
                     //update database alone;
                     if(this.updateDatabaseOnly(resource.webUploadPath()
                             , id,sermon, author, topic, newsletter)){
                         response.getWriter().write("post updated successfully");
                     }else{
                         response.getWriter().write("upload-error");
                     }
                 }
             }else{
                 response.getWriter().println("please enter the full story of this post");
             }
         }else{
             response.getWriter().println("please enter the author for this post");
         }
     }else{
         response.getWriter().println("please enter the topic for this post");
     }
     
  }
 public boolean updateDatabaseOnly(String path,String id,String sermon,String author,String topic,
          String newsletter) throws UnsupportedEncodingException{
     
     boolean done = false;
    JDBC jdbc = new JDBC();
    jdbc.connect();
    jdbc.createStatement();
    String sql ="update post set texts='"+sermon+"',author='"+author+"',title='"+topic+"' where id="+
            Integer.parseInt(id);
    if(jdbc.update(sql)){
         try {
             done = true;
             // send newsletter
             if(newsletter.equals("yes")){
                 String html = "<center>";
                 html+= "<h1>";
                 html+=topic;
                 html+="</h1><br/>";
                 html+="<img src=\"cid:post\" style=\"width:100%;height=auto;\"><br/><br/>";
                 html+="<div>";
                 html+=URLDecoder.decode(sermon,"UTF-8");
                 html+="</div><br/>";
                 html+="</center>";

                 ResultSet rs = jdbc.query("select photo from post where id="+id);
                 if(rs.next()){
                     path+=rs.getString(1);
                 }
                 rs.close();
                 File post = new File(path);
                 Object[]obj = this.subscriber(jdbc).toArray();
                 new InstantMail().sendBulkMessage(post,
                         Arrays.copyOf(obj,obj.length,String[].class), topic, html);
             }
        }catch(Exception e){
                     
        }
             
         
    }
    jdbc.close();
    return done;
 }
  public boolean updateDatabase(String id,File post,String fileName,String sermon,String author,String topic,
          String newsletter) throws UnsupportedEncodingException{
        boolean done = false;
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        String sql ="update post set texts='"+sermon+"',author='"+author+"',title='"+topic+"',"
                + " photo='"+fileName+"' where id="+Integer.parseInt(id);
        if(jdbc.update(sql)){
            done = true;
            if(newsletter.equals("yes")){
                // send newsletter
                String html = "<center>";
                html+= "<h1>";
                html+=topic;
                html+="</h1><br/>";
                html+="<img src=\"cid:post\" style=\"width:100%;height=auto;\"><br/><br/>";
                html+="<div>";
                html+=URLDecoder.decode(sermon,"UTF-8");
                html+="</div><br/>";
                html+="</center>";
                Object[]obj = this.subscriber(jdbc).toArray();
                new InstantMail().sendBulkMessage(post,
                        Arrays.copyOf(obj,obj.length,String[].class), topic, html);
            }
        }
        jdbc.close();
        return done;
  }
  
  public ArrayList<String> subscriber(JDBC jdbc){
      ArrayList<String> list = new ArrayList();
      try{
          ResultSet rs = jdbc.query("select * from subscriber");
          while(rs.next()){
                list.add(rs.getString("email"));
           }
          rs.close();
      }catch(Exception e){
          
      }
      return list;
  }
 
 
}