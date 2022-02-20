/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Phone {
  String phone;
  public Phone(String phone){
      this.setPhone(phone);
  }
  public void setPhone(String value){
        this.phone = value;
    }
    public String getPhone(){
        return this.phone;
    }
    
}
