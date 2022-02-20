/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Visitors {
    String name,type,subject,email; int id;
    public Visitors(String type,String name, String subject, String email, int id){
        this.setType(type);
        this.setName(name);
        this.setSubject(subject);
        this.setEmail(email);
        this.setId(id);
    }
    public void setName(String val){
        this.name = val;
    }
    public String getName(){
        return this.name;
    }
    public void setType(String val){
        this.type = val;
    }
    public String getType(){
        return this.type;
    }
    public void setEmail(String val){
        this.email = val;
    }
    public String getEmail(){
        return this.email;
    }
    public void setSubject(String val){
        this.subject = val;
    }
    public String getSubject(){
        return this.subject;
    }
    public void setId(int val){
        this.id = val;
    }
    public int getId(){
        return this.id;
    }
}
