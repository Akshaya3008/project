package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.RolesPermissionController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.RolesPermission;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("RolePermisison")
public class RolesPermissionResource {
	private static final Logger logger = LogManager.getLogger(Util.class.getName());
	@POST
	@JWTTokenNeeded
//	@PermitAll
	@RolesAllowed("ADD_NEW_ROLES_AND_PERMISSION")
	@Path("saveRolesPermission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response saveRolesPermission(@FormParam("rolename") String role,@FormParam("permission") String permission,
			@FormParam("branch") String branch){
		String[] commaSeperatedPermission=Util.commaSeperatedString(permission);
		RolesPermission rolepermission=new RolesPermission();
		RolesPermissionController controller=new RolesPermissionController();
		try{
			for(int i=0;i<commaSeperatedPermission.length;i++){
				rolepermission.setRole(role);
				rolepermission.setPermission(commaSeperatedPermission[i]);
				rolepermission.setBranch(branch);
				controller.saveRolesPermission(rolepermission);
			}	
			return Util.generateResponse(Status.ACCEPTED, "New Roles And Permission Successfully Created").build();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new role and permission.Please try again or contact with administrator.").build();
	}
	@GET
	@JWTTokenNeeded
	@PermitAll
//	@RolesAllowed("ADD_NEW_ROLES_AND_PERMISSION")
	@Path("loadRolesPermission")
	@Produces(MediaType.APPLICATION_JSON)
	public Response loadRolesPermission(@QueryParam("role") String role,
			@QueryParam("branch") String branch){
		ArrayList<String> permission=new ArrayList<>();
		RolesPermissionController controller=new RolesPermissionController();
		try{
				permission=controller.loadRolesPermission(role,branch);
				if(permission!=null){
					return Response.status(Status.ACCEPTED).entity(permission).build();
				}else{
					return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found.").build();
				}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to get role and permission.Please try again or contact with administrator.").build();
	}
	
	@POST
	@JWTTokenNeeded
//	@PermitAll
	@RolesAllowed("EDIT_ROLES_AND_PERMISSION")
	@Path("editRolesPermission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response editRolesPermission(@FormParam("rolename") String role,@FormParam("permission") String permission,
			@FormParam("oldRole") String oldRoleName,@FormParam("branch") String branch){
		String[] commaSeperatedPermission=Util.commaSeperatedString(permission);
		RolesPermission rolepermission=new RolesPermission();
		RolesPermissionController controller=new RolesPermissionController();
		try{
			controller.deleteRolesPermission(oldRoleName, branch);
			for(int i=0;i<commaSeperatedPermission.length;i++){
				rolepermission.setRole(role);
				rolepermission.setPermission(commaSeperatedPermission[i]);
				rolepermission.setBranch(branch);
				controller.saveRolesPermission(rolepermission);
			}	
			return Util.generateResponse(Status.ACCEPTED, "Roles And Permission Successfully Updated.Please login again "
					+ "to reflect the changes.").build();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.Please try again or contact with administrator.").build();
	}
	
	@DELETE
	@JWTTokenNeeded
//	@PermitAll
	@RolesAllowed("DELETE_ROLES_AND_PERMISSION")
	@Path("deleteRolesPermission")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteRolesPermission(@QueryParam("roles") String roles,
			@QueryParam("branch") String branch){
		RolesPermissionController controller=new RolesPermissionController();
		try{
				controller.deleteRolesPermission(roles,branch);
				return Util.generateResponse(Status.ACCEPTED, "Role Successfully Deleted.").build();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}
}
