package org.VCERP.Education.VC.resource;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.RolesPermissionController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.RolesPermission;
import org.VCERP.Education.VC.utility.Util;

@Path("RolePermisison")
public class RolesPermissionResource {
	
	@POST
	@JWTTokenNeeded
	@PermitAll
	//@RolesAllowed("ADD_NEW_ROLES_AND_PERMISSION")
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
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new role and permission.Please try agin or contact with administrator.").build();
	}
}
