package org.VCERP.Education.VC.utility;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.VCERP.Education.VC.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class SecureUtil {
	private static final Logger logger = LogManager.getLogger(SecureUtil.class.getName());
	
	public static String signingKey="";
	private static SecretKeySpec newSecretKey;
    private static byte[] key;
	
	public String issueToken(User user, PrivateKey key, String session) {
		signingKey=Base64.getEncoder().encodeToString(key.getEncoded());
		Calendar tommorow=Calendar.getInstance();
		tommorow.add(Calendar.DATE, 1);
        String jwtToken = Jwts.builder()
                .setSubject(user.getBranch()).claim("Employee Id", user.getId())
                .claim("Employee Type", user.getEmp_type())
                .claim("Employee Name", user.getName())
                .claim("Employee Role", user.getRole())
                .claim("Emaployee Username", user.getUserid())
                .claim("Emaployee Created Date", user.getCreated_date())
                .claim("session", session)
                //.setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(tommorow.getTime())
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
        return jwtToken;
    }
 
    public static void setKey(String myKey) 
    {
        MessageDigest sha = null;
        try {
            key = myKey.getBytes("UTF-8");
            sha = MessageDigest.getInstance("SHA-1");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16); 
            newSecretKey = new SecretKeySpec(key, "AES");
        } 
        catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } 
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
 
    public static String encryptPassword(String password) 
    {
        try
        {
            setKey(PropertiesCache.secreteKey);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, newSecretKey);
            return Base64.getEncoder().encodeToString(cipher.doFinal(password.getBytes("UTF-8")));
        } 
        catch (Exception e) 
        {
        	logger.error("Error while encrypting: " + e.toString());
            System.out.println("Error while encrypting: " + e.toString());
        }
        return null;
    }
 
    public static String decryptPassword(String password) 
    {
        try
        {
            setKey(PropertiesCache.secreteKey);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, newSecretKey);
            return new String(cipher.doFinal(Base64.getDecoder().decode(password)));
        } 
        catch (Exception e) 
        {
        	logger.error("Error while decrypting: " + e.toString());
            System.out.println("Error while decrypting: " + e.toString());
        }
        return null;
    }


}
