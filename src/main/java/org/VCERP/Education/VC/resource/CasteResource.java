package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
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
import org.VCERP.Education.VC.controller.DivisionController;
import org.VCERP.Education.VC.controller.FeesTypeController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Caste;
import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;

@Path("caste")
public class CasteResource {

	@POST
	@Path("/addNewCaste")
	@JWTTokenNeeded
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewCaste(@FormParam("caste") String stud_caste,@FormParam("branch") String branch)
	{
		try{
		Caste caste=new Caste();
		caste.setCreated_Date(Util.currentDate());
		caste.setCaste(stud_caste);
		caste.setBranch(branch);
		CasteController controller=new CasteController();
		controller.addNewCaste(caste);
		return Util.generateResponse(Status.ACCEPTED, "Caste Successfully Added.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to add casste.please try again or contact with administrator.").build();
	}
	@GET
	@Path("/getCaste")
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCaste(@QueryParam("branch") String branch)
	{
		try{
		ArrayList<Caste> caste=new ArrayList<>();
		CasteController controller=new CasteController();
		caste=controller.getCaste(branch);
		if(caste!=null)
		{
			return Response.status(Status.ACCEPTED).entity(caste).build();
		}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "data not found").build();
	}
	
	@POST
	@Path("/EditCaste")
	@JWTTokenNeeded
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditCaste(@FormParam("caste") String stud_caste,@FormParam("id") Long id)
	{
		try{
			Caste caste=new Caste();
		caste.setCaste(stud_caste);
		caste.setId(id);
		CasteController controller=new CasteController();
		controller.EditCaste(caste);
		return Util.generateResponse(Status.ACCEPTED, "Caste Data Successfully Updated.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}
	@DELETE
	@Path("/deleteCaste")
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteCaste(@QueryParam("id") String id)
	{
		try{
		CasteController controller=new CasteController();
		controller.deleteCaste(id);
		return Util.generateErrorResponse(Status.ACCEPTED,"Caste Successfully Deleted.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}

}
