/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Post {
    String type,image,title; int id;
    public Post(String type,String image, String title, int id){
        this.setType(type);
        this.setImage(image);
        this.setTitle(title);
        this.setId(id);
    }
    public void setImage(String val){
        this.image = val;
    }
    public String getImage(){
        return this.image;
    }
    public void setType(String val){
        this.type = val;
    }
    public String getType(){
        return this.type;
    }
    public void setTitle(String val){
        this.title = val;
    }
    public String getTitle(){
        return this.title;
    }
    public void setId(int val){
        this.id = val;
    }
    public int getId(){
        return this.id;
    }
}
