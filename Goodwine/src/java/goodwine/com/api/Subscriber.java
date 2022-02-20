/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Subscriber {
  String email,id;
  public Subscriber(String id, String email){
      this.setId(id);
      this.setEmail(email);
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
    
}
