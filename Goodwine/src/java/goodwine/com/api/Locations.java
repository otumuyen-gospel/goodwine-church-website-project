/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Locations {
    String center,address,type; int id;
    public Locations(String type,String center, String address, int id){
        this.setType(type);
        this.setCenter(center);
        this.setAddress(address);
        this.setId(id);
        
    }
    public void setType(String val){
        this.type = val;
    }
    public String getType(){
        return this.type;
    }
    public void setCenter(String val){
        this.center = val;
    }
    public String getCenter(){
        return this.center;
    }
    public void setAddress(String val){
        this.address = val;
    }
    public String getAddress(){
        return this.address;
    }
    
    public void setId(int val){
        this.id = val;
    }
    public int getId(){
        return this.id;
    }
}
