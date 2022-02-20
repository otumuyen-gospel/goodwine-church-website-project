/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Contact {
    String id,email,subject,name,message;
    public Contact(String id,String email,String subject,String name,String message){
        this.setId(id);
        this.setEmail(email);
        this.setName(name);
        this.setSubject(subject);
        this.setMessage(message);
    }
    public void setId(String value){
        this.id = value;
    }
    public String getId(){
        return this.id;
    }
    public void setEmail(String value){
        this.email = value;
    }
    public String getEmail(){
        return this.email;
    }
    public void setName(String value){
        this.name = value;
    }
    public String getName(){
        return this.name;
    }
    public void setMessage(String value){
        this.message = value;
    }
    public String getMessage(){
        return this.message;
    }
    public void setSubject(String value){
        this.subject = value;
    }
    public String getSubject(){
        return this.subject;
    }
}
