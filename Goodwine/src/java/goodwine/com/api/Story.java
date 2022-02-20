/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 *
 * @author user1
 */
public class Story {
    String id,type,title,author,photo,text;
    public void setId(int id){
        this.id = String.valueOf(id);
    }
    public String getId(){
        return id;
    }
    public void setType(String val){
        this.type = val;
    }
    public String getType(){
        return type;
    }
    public void setTitle(String val){
        this.title = val;
    }
    public void setTitle(String val, int limit) throws UnsupportedEncodingException{
        String vals = URLDecoder.decode(val,"UTF-8");
        this.title = vals.length() > limit ? vals.substring(0, limit)+"..." : vals;
    }
    public String getTitle(){
        return title;
    }
    public void setAuthor(String val){
        this.author = val;
    }
    public String getAuthor(){
        return author;
    }
    public void setPhoto(String val){
        this.photo = val;
    }
    public String getPhoto(){
        return photo;
    }
    public void setText(String val){
        this.text =  val;
    }
    public void setText(String val, int limit) throws UnsupportedEncodingException{
        String vals = URLDecoder.decode(val,"UTF-8");
        this.text = vals.length() > limit ? vals.substring(0, limit)+"..." : vals;
    }
    public String getText(){
        return text;
    }
}
