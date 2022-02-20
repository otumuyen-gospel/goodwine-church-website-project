/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

import jakarta.servlet.http.HttpServletRequest;

/**
 *
 * @author user1
 */
public class ResourcePath {
    
    public String webUploadPath(){
      /*
        @MultipartConfig(location="/home/goodwine/tomcat/webapps/goodwineinternationalchurch.org/ROOT/") - 
       for the online web hosting server and specify it in the above line in the @MultipartConfig();
      */
      return "/home/goodwine/tomcat/webapps/goodwineinternationalchurch.org/ROOT/resource/";
  }
  public String fileAccessPath(HttpServletRequest request,String uploadedfilename){
      /*
         then access the uploaded like this in your program whether on local server or web hosting server
        request.getContextPath()+"/resource/" + uploadedfilename;
      */
      return request.getContextPath()+"/resource/" + uploadedfilename;
  }
  public String LocalUploadPath(HttpServletRequest request){
      /*
        @MultipartConfig(location="/") - set multipartconfig like this for running on local server;
         
      */
      return request.getServletContext().getRealPath("/resource/");
  }
    
}
