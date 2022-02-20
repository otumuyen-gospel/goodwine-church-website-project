/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class HomeData2 {
    String video,message,author,facebook,instagram,youtube,twitter;
    public HomeData2(String video,String message,String author,String facebook,String instagram,String youtube,
            String twitter){
       this.setVideo(video);
       this.setYoutube(youtube);
       this.setTwitter(twitter);
       this.setMessage(message);
       this.setInstagram(instagram);
       this.setFacebook(facebook);
       this.setAuthor(author);
    }
    public HomeData2(){
        
    }
    public void setVideo(String val){
        this.video = val;
    }
    public String getVideo(){
        return video;
    }
     public void setMessage(String val){
        this.message = val;
    }
    public String getMessage(){
        return message;
    }
     public void setAuthor(String val){
        this.author = val;
    }
    public String getAuthor(){
        return author;
    }
    public void setFacebook(String val){
         this.facebook = val;
    }
    public String getFacebook(){
        return facebook;
    }
    public void setInstagram(String val){
         this.instagram = val;
    }
    public String getInstagram(){
        return instagram;
    }
    public void setYoutube(String val){
         this.youtube = val;
    }
    public String getYoutube(){
        return youtube;
    }
    public void setTwitter(String val){
         this.twitter = val;
    }
    public String getTwitter(){
        return twitter;
    }
}
