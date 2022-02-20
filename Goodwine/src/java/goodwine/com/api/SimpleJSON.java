/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 *
 * @author user1
 */
public class SimpleJSON {
    GsonBuilder builder = new GsonBuilder(); 
     Gson gson;
    public SimpleJSON(){
        builder.setPrettyPrinting(); 
        gson = builder.create(); 
    }
    
    public String converToJson(Object obj){
        return gson.toJson(obj);
    }
    public Object converToObject(String json, Class c){
        return gson.fromJson(json, c);
    }
    
    
}
