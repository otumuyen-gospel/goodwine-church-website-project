package goodwine.com.api;


import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author user1
 */
public class JDBC {
    private final String user = "goodwine_goodwine";
    private final String password="]H=m#g7Kz2O0";
    private final String url = "jdbc:mysql://localhost:3306/goodwine_goodwine";
    private static Connection connect;
    private static Statement stmt;
    private ResultSet rs;
    public static String status;
    Driver driver ;
    public void connect(){
        try {
            driver = new com.mysql.jdbc.Driver();
            DriverManager.registerDriver(driver);
            connect = DriverManager.getConnection(url, user, password);
            status = "database connection successful";
        } catch (Exception ex) {
            status = "Unable to connect to database";
        }
        
    }
   
    public void createStatement(){
        try{
            stmt = connect.createStatement();
            status = "database connection successful";
        }catch(Exception e){
            status = "Unable to connect to database";
        }
        
    }
    
    public boolean update(String sql){
        try{
            if(stmt.executeUpdate(sql) == 1){
                return true;
            }
            
        }catch(Exception e){
            status = e.getMessage();
        }
        return false;
        
    }
    
    public ResultSet query(String sql){
        try {
            rs = stmt.executeQuery(sql);
            status = "database query excuted successfully";
        }catch(Exception ex) {
           status = "Unable to execute database query";
        }
        return rs;
    }
    public void close(){
        try{
            if(connect == null){
                connect.close();
            }
            if(stmt == null){
                stmt.close();
            }
            if(rs == null){
                rs.close();
            }
            
        }catch(Exception e){
        }
        
    }
    
    public int getRowSize(String tableName){
        int count = 0;
        try {
            rs = stmt.executeQuery("SELECT COUNT(*) FROM "+tableName);
            if(rs.next()){
                count = rs.getInt("COUNT(*)");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return count;
    }
    
    public int getRowSizeByQuery(String sql,String sum){
        int count = 0;
        try {
            rs = stmt.executeQuery(sql);
            if(rs.next()){
                count = rs.getInt(sum);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return count;
    }
    
    
}
