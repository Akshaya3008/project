package org.VCERP.Education.VC.resource;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;
import org.VCERP.Education.VC.configuration.SigningKeyGenerator;
import org.VCERP.Education.VC.controller.UserController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.model.LoginHistory;
import org.VCERP.Education.VC.utility.PropertiesCache;
import org.VCERP.Education.VC.utility.SecureUtil;
import org.VCERP.Education.VC.utility.Util;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.stereotype.Controller;

@Controller
@Path("user")
public class UserResource {
	
	private static final Logger logger = LogManager.getLogger(UserResource.class.getName());
	
	public static ArrayList<String> permission;
	@Context 
	HttpServletRequest request;
	
	@POST
	@PermitAll
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(@FormParam("userid") String userid, @FormParam("password") String password)
			throws NoSuchAlgorithmException, UnknownHostException {
		ThreadContext.put("tag", "LOGIN");
		User user = new User();
		UserController controller = new UserController();
		user = controller.authenticateUser(userid, password);
		if (user == null) {
			
			return Util.generateErrorResponse(Status.NOT_FOUND, "invalid username or password").build();
		} else {
			permission=user.getPermission();
			LoginHistory history=new LoginHistory();
			
			history.setBranch(user.getBranch());
			history.setEmployee(user.getName());
			history.setIp(request.getRemoteAddr());
			controller.createLoginHistory(history);
			
			delete();
			
			PrivateKey key = SigningKeyGenerator.signKey();
			String session = Util.randomStringGenerator(8);
			SecureUtil secure = new SecureUtil();
			String token = secure.issueToken(user, key, session);
			return Response.status(Status.ACCEPTED).header("X-Authorization", "Bearer " + token).entity(user).build();
		}
	}

	@POST
	@RolesAllowed("CREATE_NEW_USER_ACCOUNT")
	@JWTTokenNeeded
	@Path("/createEmployeeAccount")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response createEmployeeAccount(@FormParam("emp_type") String emp_type, @FormParam("branch") String branch,
			@FormParam("role") String role, @FormParam("emp_name") String emp_name, @FormParam("userid") String userid,
			@FormParam("password") String password) {
		User user = null;
		UserController controller = null;
		try {
			user = new User();
			controller = new UserController();
			user.setEmp_type(emp_type);
			user.setBranch(branch);
			user.setRole(role);
			user.setName(emp_name);
			user.setUserid(userid);
			user.setPassword(password);
			controller.createEmployeeAccount(user);
			return Util.generateResponse(Status.ACCEPTED, "User Account Successfully Created.").build();
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create user account.Please try again or contact with Administrator").build();
	}

	@GET
	@PermitAll
	//@RolesAllowed("VIEW_USER_ACCOUNT")
	@JWTTokenNeeded
	@Path("/getAllAccount")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAccount(@QueryParam("branch") String branch) {
		ArrayList<User> user = new ArrayList<>();
		UserController controller = new UserController();
		user = controller.getAllAccount(branch);
		if (user == null) {
			return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
		} else {
			return Response.status(Status.ACCEPTED).entity(user).build();
		}
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/LoginHistoryList")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getLoginHistoryList(){
		ArrayList<LoginHistory> logg = new ArrayList<>();
		UserController controller = new UserController();
		logg = controller.getLoginHistoryList();
	
		if (logg == null) {
			return Util.generateErrorResponse(Status.NOT_FOUND, "Not Found").build();
		} else {
			return Response.status(Status.ACCEPTED).entity(logg).build();
		}
	}
	
	@POST
	@RolesAllowed("EDIT_USER_ACCOUNT")
	@JWTTokenNeeded
	@Path("/EditEmployeeAccount")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditEmployeeAccount(@FormParam("role") String role, @FormParam("emp_name") String emp_name,
			@FormParam("userid") String userid,@FormParam("password") String password,@FormParam("id") Long id){
		User user=new User();
		UserController controller=new UserController();
		user.setId(id);
		user.setRole(role);
		user.setName(emp_name);
		user.setUserid(userid);
		user.setPassword(password);
		try {
			controller.EditEmployeeAccount(user);
			return Util.generateResponse(Status.ACCEPTED, "User Account Successfully Updated.").build();
		} 
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Failed to complete updation task.Please try again or contact with administrator.").build();
		}
	
	@DELETE
	@RolesAllowed("DELETE_USER_ACCOUNT")
	@JWTTokenNeeded
	@Path("/DeactivateAccount")
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response DeactivateEmployeeAccount(@QueryParam("id") Long id){
		UserController controller=new UserController();
		try {
			controller.DeactivateEmployeeAccount(id);
			return Util.generateResponse(Status.ACCEPTED, "User Account Deactivated.").build();
		} 
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Failed to complete task.").build();
		}
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/checkAccountExist")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response checkAccountExist(@FormParam("emp_name") String emp_name,@FormParam("branch") String branch){
		User user=new User();
		UserController controller=new UserController();
		user.setName(emp_name);
		user.setBranch(branch);
		boolean status;
		status=controller.checkAccountExist(user);
		if(status==false){
		return Response.status(Status.ACCEPTED).build();
		}else{
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Account already existed for selected Employee.").build();
		}
		
	}
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/checkUsernameExist")
	@Produces(MediaType.APPLICATION_JSON)
	public Response checkUsernameExist(@QueryParam("userid") String userid,@QueryParam("branch") String branch){
		User user=new User();
		UserController controller=new UserController();
		user.setUserid(userid);
		user.setBranch(branch);
		boolean status;
		status=controller.checkUsernameExist(user);
		if(status==false){
		return Util.generateResponse(Status.ACCEPTED, "Username is available.").build();
		}else{
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Username already Existed.").build();
		}
		
	}
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/getAllRole")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllRole(@QueryParam("branch") String branch){
		ArrayList<User> roles=new ArrayList<>();
		UserController controller=new UserController();
		roles=controller.getAllRole(branch);
		if(roles!=null){
		return Response.status(Status.ACCEPTED).entity(roles).build();
		}else{
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Roles not Found").build();
		}		
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/getUserStat")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEmployeeStat(@QueryParam("username") String username,@QueryParam("branch") String branch){
		ArrayList<Integer> stat=new ArrayList<>();
		UserController controller=new UserController();
		stat=controller.getEmployeeStat(username,branch);
		if(stat!=null){
		return Response.status(Status.ACCEPTED).entity(stat).build();
		}else{
			return Util.generateErrorResponse(Status.BAD_REQUEST, "Roles not Found").build();
		}
		
	}
	
	private void delete() {
        File folder = new File(PropertiesCache.DirectoryPath);
        long days=PropertiesCache.olderThanDays;
        if (folder.exists()) {
 
            File[] listFiles = folder.listFiles();
 
            long eligibleForDeletion = System.currentTimeMillis() -(days * 24 * 60 * 60 * 1000 );
 
            for (File listFile: listFiles) {
 
                if (listFile.getName().endsWith(".log") &&
                    listFile.lastModified() < eligibleForDeletion) {
 
                    if (!listFile.delete()) {
 
                        logger.error("Sorry Unable to Delete Files..");
 
                    }
                }
            }
        }
    }
}
