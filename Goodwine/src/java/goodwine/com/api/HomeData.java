/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class HomeData {
    String id,title,image,text;
    public HomeData(String id,String title,String image,String text,int textLimit){
        this.setId(id);
        this.setTitle(title);
        this.setImage(image);
        this.setText(text,textLimit);
    }
    public void setId(String val){
        this.id = val;
    }
    public String getId(){
        return id;
    }
     public void setTitle(String val){
        this.title = val.length() > 30 ? val.substring(0, 27)+"..." : val;
    }
    public String getTitle(){
        return title;
    }
     public void setImage(String val){
        this.image = val;
    }
    public String getImage(){
        return image;
    }
     public void setText(String val,int textLimit){
         //text character limit
        this.text = val.length() > textLimit ? val.substring(0, textLimit)+"..." : val;
    }
    public String getText(){
        return text;
    }
}
