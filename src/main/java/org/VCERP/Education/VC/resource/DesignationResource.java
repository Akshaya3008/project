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

import org.VCERP.Education.VC.controller.CasteController;
import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.FeesTypeController;
import org.VCERP.Education.VC.controller.SubjectController;
import org.VCERP.Education.VC.controller.DesignationController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.model.Designation;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("Designation")
public class DesignationResource {
	private static final Logger logger = LogManager.getLogger(Util.class.getName());
	@POST
	@RolesAllowed("ADD_NEW_DESIGNATION")
	@JWTTokenNeeded
	@Path("/NewDesignation")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addDesignation(@FormParam("designation_name") String designation_name,@FormParam("branch") String branch)
	{
	Designation des = null;
	DesignationController controller = null;
	try{
		des = new Designation();
		controller = new DesignationController();
		des.setDesg(designation_name);
		des.setBranch(branch);
		
	
		controller.addDesignation(des);
		return Util.generateResponse(Status.ACCEPTED, "New Designation Successfully Created.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		logger.error(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new Designation.Please try again or contact with administrator.").build();
	}
	
	@GET
	@JWTTokenNeeded
	@Path("/FetchAllDesignation")
	@PermitAll
	/*@RolesAllowed("VIEW_DESIGNATION")*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllDesignation(@QueryParam("branch") String branch){
		try {
			ArrayList<Designation> des_list=new ArrayList<>();
			DesignationController controller=new DesignationController();
			des_list=controller.FetchAllDesignation(branch);
			return Response.status(Status.OK).entity(des_list).build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	@POST
	@RolesAllowed("EDIT_DESIGNATION")
	@JWTTokenNeeded
	@Path("/EditDesignation")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditDesignation(@FormParam("designation_name") String designation_name,
			@FormParam("id") long id,@FormParam("branch") String branch)
	{
		Designation des=new Designation();
		des.setDesg(designation_name);
		des.setId(id);
		des.setBranch(branch);
		DesignationController controller=new DesignationController();
		try{
		controller.EditDesignation(des);
		return Util.generateResponse(Status.ACCEPTED, "Designation Successfully Updated.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@Path("/deleteDesignation")
	@RolesAllowed("DELETE_DESIGNATION")
	@JWTTokenNeeded
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteDesignation(@QueryParam("id") String id)
	{
		DesignationController controller=new DesignationController();
		try{
		controller.deleteDesignation(id);
		return Util.generateResponse(Status.ACCEPTED, "Designation Successfully Deleted.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	
}


