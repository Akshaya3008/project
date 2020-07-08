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
import org.VCERP.Education.VC.controller.LeadSourceController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.LeadSource;

import org.VCERP.Education.VC.utility.Util;

@Path("LeadSource")
public class LeadSourceResource {
	
	@POST
	@RolesAllowed("ADD_NEW_LEAD_SOURCE")
	@JWTTokenNeeded
	@Path("/NewSource")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addLeadSource(@FormParam("leadsource") String source){
		LeadSource lead = null;
		LeadSourceController controller = null;
		try{
			lead = new LeadSource();
			controller = new LeadSourceController();
			lead.setSource(source);
			controller.addLeadSource(lead);
			return Util.generateResponse(Status.ACCEPTED, "Lead Source Successfully Inserted").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new lead source.please try again or contact with administrator.").build();
	}
	
	
	@GET
	@PermitAll
	//@RolesAllowed("VIEW_LEAD_SOURCE")
	@JWTTokenNeeded
	@Path("/LeadSourceList")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response FetchAllSource(){
		ArrayList<LeadSource> sourceList = new ArrayList<>();
		LeadSourceController controller = null;
		try{
			controller = new LeadSourceController();
			sourceList = controller.FetchAllSource();
			if(sourceList!=null){
			return Response.status(Status.OK).entity(sourceList).build();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	@POST
	@RolesAllowed("EDIT_LEAD_SOURCE")
	@JWTTokenNeeded
	@Path("/EditLeadSource")
	@Produces(MediaType.APPLICATION_JSON)
	public Response EditLeadSource(@FormParam("leadsource") String source,@FormParam("id") long id){
		LeadSource lead = null;
		LeadSourceController controller = null;
		try{
			lead = new LeadSource();
			controller = new LeadSourceController();
			lead.setSource(source);
			lead.setId(id);
			controller.EditLeadSource(lead);
			return Util.generateResponse(Status.ACCEPTED, "Lead Source Successfully Updated").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@Path("/deleteSource")
	@JWTTokenNeeded
	@RolesAllowed("DELETE_LEAD_SOURCE")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteSource(@QueryParam("id") String id)
	{
		try{
		LeadSourceController controller=new LeadSourceController();
		controller.deleteSource(id);
		return Util.generateErrorResponse(Status.ACCEPTED,"Source Successfully Deleted.").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this task.").build();
	}
}