package org.VCERP.Education.VC.configuration;

import java.io.IOException;
import java.security.Key;

import javax.annotation.Priority;
import javax.crypto.KeyGenerator;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.Priorities;
import javax.ws.rs.ext.Provider;

import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.utility.SecureUtil;
import org.VCERP.Education.VC.utility.Util;

import io.jsonwebtoken.Jwts;

@Provider
@JWTTokenNeeded
@Priority(Priorities.AUTHENTICATION)
public class JWTTokenNeededFilter implements ContainerRequestFilter {
	private static final String AUTHORIZATION_PROPERTY = "X-Authorization";
	    @Override
	    public void filter(ContainerRequestContext requestContext) throws IOException {
	 
	        // Get the HTTP Authorization header from the request
	        String authorizationHeader = requestContext.getHeaderString(AUTHORIZATION_PROPERTY);
	 
	        // Extract the token from the HTTP Authorization header
	        String token = authorizationHeader.substring("Bearer".length()).trim();
	        System.out.println(token);
	        if(!token.isEmpty()){
	        try {
	 
	            // Validate the token
	            SecureUtil secure=new SecureUtil();
	            String key=secure.key;
	            System.out.println(key);
	            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
	            //logger.info("#### valid token : " + token);
	 
	        } catch (Exception e) {
	        	e.printStackTrace();
	            //logger.severe("#### invalid token : " + token);
	            
	        }
	        }else
	        {
	        	requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
	        }
	        
	    }
	}
