

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

import goodwine.com.api.GenerateCode;
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
import java.nio.file.Files;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = {"/Video"})
@MultipartConfig(location="/home/goodwine/tomcat/webapps/goodwineinternationalchurch.org/ROOT/resource/")
public class Video extends HttpServlet {
 @Override
 protected void doPost(HttpServletRequest request,
 HttpServletResponse response)
 throws ServletException, IOException { 
     Part parts = request.getPart("video");
     ResourcePath resource = new ResourcePath();
     if(parts.getSubmittedFileName().toLowerCase().endsWith(".mp4")){
         //it is video file proceed with uploading
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
             if(updateDatabase(resource.webUploadPath()
                     ,target.getName())){
                  response.getWriter().write(resource.fileAccessPath(request,target.getName()));

             }else{
                 //if unable to update database accordingly delete upload
                 Files.deleteIfExists(target.toPath());
                 response.getWriter().write("upload-error");
             }
             
         }else{
             response.getWriter().write("upload-error");
         }
         
     }else{
         response.getWriter().write("format-error");
     }
     
  }
  
  public boolean updateDatabase(String realPath,String fileName){
        boolean done = false;
        JDBC jdbc = new JDBC();
        jdbc.connect();
        jdbc.createStatement();
        String oldFile = "";
        if(jdbc.getRowSize("about") > 0){
            try{
                 ResultSet rs  = jdbc.query("select video_of_the_day from about");
                 if(rs.next()){
                    oldFile = rs.getString(1);
                 }
                 rs.close();
            }catch(SQLException e){
                done = false;
            }
            if(jdbc.update("update about set video_of_the_day='"+fileName+"'")){
                //delete old file
                new File(realPath+oldFile).delete();
                done = true;
            }
        }else{
            String sql = "insert into about values(0,'"+fileName+"','','','','','','','','','','','',''"
            + ",'','','','','','','','','')";
            if(jdbc.update(sql)){
                done = true;
            }
        }
        jdbc.close();
        return done;
  }
 
 
}