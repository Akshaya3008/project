package org.VCERP.Education.VC.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Util {
	private static final Logger logger = LogManager.getLogger(Util.class.getName());
	
	/*private static PropertiesCache sCache;
	PropertiesCache cache = new PropertiesCache();*/
	
	/*@PostConstruct
	public void init() {
		Util.sCache = cache;
	}*/
	
	public static Connection getDBConnection() {
		 Connection conn = null;
		 try { 
			 Class.forName("com.mysql.jdbc.Driver").newInstance();
			// conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/vc_db?autoReconnect=true&useSSL=false","root","");
			 String ConnectionUrl = "jdbc:mysql://localhost:4519/"+PropertiesCache.parentDBName+"?autoReconnect=true&useSSL=false";
			 conn = DriverManager.getConnection(ConnectionUrl,PropertiesCache.userName,PropertiesCache.password);
			 
		 } catch (Exception ex) {
			 ex.printStackTrace();
			 logger.error(ex);
		 }
		 return conn;
		 }
	
	public static void closeConnection(ResultSet rs,PreparedStatement st,Connection con)
	{
		try{
		if(rs!=null)
			rs.close();
		if(st!=null)
			st.close();
		if(con!=null)
			con.close();
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
	}
	
	public static ResponseBuilder generateErrorResponse(Status status,String message)
	{
		ErrorMessage error=new ErrorMessage(status.getStatusCode(),message);
		return Response.status(status).entity(error).type(MediaType.APPLICATION_JSON);
	}
	public static ResponseBuilder generateResponse(Status status,String message)
	{
		ErrorMessage success=new ErrorMessage(status.getStatusCode(),message);
		return Response.status(status).entity(success).type(MediaType.APPLICATION_JSON);
	}
	
	public static String randomStringGenerator(int length)
	{
		String Char="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder sb=new StringBuilder();
		Random random=new Random();
		for(int i=0;i<length;i++)
		{
			sb.append(Char.charAt(random.nextInt(Char.length())));
		}
		return sb.toString();
		
	}
	
	public static String currentDate()
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		return dateFormat.format(date);
	}
	public static String currentTime()
	{
		DateFormat time = new SimpleDateFormat("HH:mm:ss");
		Date date = new Date();
		return time.format(date);
	}
	public static String DateTime(){
		Date dt = new Date();
		DateFormat sdt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String datetime = sdt.format(dt);
		return datetime;
	}
	public static String[] symbolSeperatedString(String str)
	{
		String seperated[] = str.split("[|]");//.replaceAll("\\s+", "")
		return seperated;
	}
	public static String[] commaSeperatedString(String str)
	{
		String seperated[] = str.split("[,]");//.replaceAll("\\s+", "")
		return seperated;
	}
	public static String[] colanSeperatedString(String str)
	{
		String seperated[] = str.split("[:]");//.replaceAll("\\s+", "")
		return seperated;
	}
	public static String[] hyphenSeperatedString(String str)
	{
		String seperated[] = str.split("[-]");//.replaceAll("\\s+", "")
		return seperated;
	}
	public static String[] dollarSeperatedString(String str)
	{
		String seperated[] = str.replaceAll("\\s+", "").split("[$]");//.replaceAll("\\s+", "")
		return seperated;
	}

}
