/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

/**
 *
 * @author user1
 */
public class Location {
    String center,address,day1,time1,services1,day2,time2,services2,day3,time3,services3;
    public Location(String center,String address,String day1,String time1,String services1,String day2,
            String time2,String services2,String day3,String time3,String services3){
        this.setCenter(center);
        this.setAddress(address);
        this.setDay1(day1);
        this.setDay2(day2);
        this.setDay3(day3);
        this.setServices1(services1);
        this.setServices2(services2);
        this.setServices3(services3);
        this.setTime1(time1);
        this.setTime2(time2);
        this.setTime3(time3);
    }
    public void setCenter(String value){
        this.center = value;
    }
    public String getCenter(){
        return this.center;
    }
    public void setAddress(String value){
        this.address = value;
    }
    public String getAddress(){
        return this.address;
    }
    public void setDay1(String value){
        this.day1 = value;
    }
    public String getDay1(){
        return this.day1;
    }
    public void setTime1(String value){
        this.time1 = value;
    }
    public String getTime1(){
        return this.time1;
    }
    public void setServices1(String value){
        this.services1 = value;
    }
    public String getServices1(){
        return this.services1;
    }
    
    public void setDay2(String value){
        this.day2 = value;
    }
    public String getDay2(){
        return this.day2;
    }
    public void setTime2(String value){
        this.time2 = value;
    }
    public String getTime2(){
        return this.time2;
    }
    public void setServices2(String value){
        this.services2 = value;
    }
    public String getServices2(){
        return this.services2;
    }
    
    public void setDay3(String value){
        this.day3 = value;
    }
    public String getDay3(){
        return this.day3;
    }
    public void setTime3(String value){
        this.time3 = value;
    }
    public String getTime3(){
        return this.time3;
    }
    public void setServices3(String value){
        this.services3 = value;
    }
    public String getServices3(){
        return this.services3;
    }
    
}
