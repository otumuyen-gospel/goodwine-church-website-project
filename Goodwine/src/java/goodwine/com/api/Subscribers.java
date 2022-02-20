/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Subscribers {
    String email,type; int id;
    public Subscribers(String type,String email, int id){
        this.setType(type);
        this.setEmail(email);
        this.setId(id);
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
    public void setId(int val){
        this.id = val;
    }
    public int getId(){
        return this.id;
    }
}
