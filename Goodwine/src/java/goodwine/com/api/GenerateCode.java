/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package goodwine.com.api;

import java.util.Random;

/**
 *
 * @author user1
 */
public class GenerateCode {
    public String getCode(){
        String code ="G-";
        String codebase = "0123456789";
        Random rand = new Random();
        for(int i = 0; i < 5; i++){
            code+= codebase.charAt(rand.nextInt(codebase.length()));
        }
        return code;
    }
    public String refactorName(String name){
        String rename = name.substring(0, name.indexOf('.'));
        String codebase = "0123456789ABCDEFGHIJKLMNOPQRSTUVWUXYZabcdefghijklmnopqrstuvwxyz";
        Random rand = new Random();
        for(int i = 0; i < 20; i++){
            rename+= codebase.charAt(rand.nextInt(codebase.length()));
        }
        //add the extension
        rename+=name.substring(name.indexOf('.'),name.length());;
        return rename;
    }
}
