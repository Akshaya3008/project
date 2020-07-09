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

import org.VCERP.Education.VC.controller.StandardController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Standard;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("standard")
public class StandardResource {
	private static final Logger logger = LogManager.getLogger(StandardResource.class.getName());
	@Path("/getAllStandard")
	@GET
	@PermitAll
	//@RolesAllowed("VIEW_STANDARD")
	@JWTTokenNeeded
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllStandard(@QueryParam("branch") String branch){
		
		try{
			ArrayList<Standard> std=new ArrayList<>();
			StandardController controller=new StandardController();
			std=controller.getAllStandard(branch);
			if(std!=null){
				return Response.status(Status.ACCEPTED).entity(std).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
	}

	
	@Path("/addStandard")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_STANDARD")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addStandard(@FormParam("stdname") String stdname,@FormParam("stdamt") String stdamt,
			@FormParam("sub") String sub,@FormParam("branchData") String branchData){
		StandardController controller=new StandardController();
		int i;
		try{
			String[] commaSeperated=Util.commaSeperatedString(branchData);
			for(i=0;i<commaSeperated.length;i++)
			{
				String[] colanSeperated=Util.colanSeperatedString(commaSeperated[i]);
				Standard std=new Standard();
				std.setStandard(stdname);
				std.setStd_fees(stdamt);
				std.setSubject(sub);
				std.setBranch(colanSeperated[0]);
				controller.addStandard(std);
			}
			if(i==commaSeperated.length){
				return Util.generateResponse(Status.ACCEPTED, "New Standard Successfully Created.").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new standard.Please try again or contact with administrator").build();
	}
	@Path("/deleteStandard")
	@DELETE
	@JWTTokenNeeded
	@RolesAllowed("DELETE_STANDARD")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteStandard(@QueryParam("id") Long id,@QueryParam("branch") String branch){
		Standard standard=new Standard();
		StandardController controller=new StandardController();
		try{
			standard.setId(id);
			standard.setBranch(branch);
			controller.deleteStandard(standard);
			return Util.generateResponse(Status.ACCEPTED, "Standard Successfully Deleted.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}
	@Path("/EditStandard")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("EDIT_STANDARD")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditStandard(@FormParam("stdname") String stdname,@FormParam("stdamt") String stdamt,
			@FormParam("sub") String sub,@FormParam("branchData") String branchData,@FormParam("id") Long id){
		StandardController controller=new StandardController();
		int i;
		try{
			String[] commaSeperated=Util.commaSeperatedString(branchData);
			for(i=0;i<commaSeperated.length;i++)
			{
				String[] colanSeperated=Util.colanSeperatedString(commaSeperated[i]);
				Standard std=new Standard();
				std.setId(id);
				std.setStandard(stdname);
				std.setStd_fees(stdamt);
				std.setSubject(sub);
				std.setBranch(colanSeperated[0]);
				controller.EditStandard(std);
			}
			if(i==commaSeperated.length){
			return Util.generateResponse(Status.ACCEPTED, "Standard Successfully Updated.").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}
}
