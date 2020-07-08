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

import org.VCERP.Education.VC.controller.FeesTypeController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("feesType")
public class FeesTypeResource {

	//private static final Logger LOGGER = LogManager.getLogger(FeesTypeResource.class);
	
	@POST
	@Path("/addNewFeesType")
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_FEES_TYPE")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewFeesType(@FormParam("feesType") String feesType,@FormParam("branch") String branch)
	{
		FeesType type=new FeesType();
		type.setCreatedDate(Util.currentDate());
		type.setFeesType(feesType);
		type.setBranch(branch);
		FeesTypeController controller=new FeesTypeController();
		try{
		controller.addNewFeesType(type);
		return Util.generateResponse(Status.ACCEPTED, "New FeesType Successfully Created.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new FeesType.please try again or contact with administrator.").build();
	}
	@GET
	@Path("/getFeesType")
	@JWTTokenNeeded
	@PermitAll
	//@RolesAllowed("VIEW_FEES_TYPE")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFeesType(@QueryParam("branch") String branch)
	{
		ArrayList<FeesType> type=new ArrayList<>();
		FeesTypeController controller=new FeesTypeController();
		try{
		type=controller.getFeesType(branch);
		if(type!=null)
		{
			return Response.status(Status.ACCEPTED).entity(type).build();
		}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not found").build();
	}
	
	@POST
	@Path("/EditFeesType")
	@JWTTokenNeeded
	@RolesAllowed("EDIT_FEES_TYPE")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditFeesType(@FormParam("feesType") String feesType,@FormParam("id") Long id,@FormParam("branch") String branch)
	{
		FeesType type=new FeesType();
		type.setFeesType(feesType);
		type.setId(id);
		type.setBranch(branch);
		FeesTypeController controller=new FeesTypeController();
		try{
		controller.EditFeesType(type);
		return Util.generateResponse(Status.ACCEPTED, "FeesType Successfully Updated.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@Path("/deleteFeesType")
	@JWTTokenNeeded
	@RolesAllowed("DELETE_FEES_TYPE")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteFeesType(@QueryParam("id") String id)
	{
		FeesTypeController controller=new FeesTypeController();
		try{
		controller.deleteFeesType(id);
		return Util.generateResponse(Status.ACCEPTED, "FeesType Successfully Deleted.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
}
