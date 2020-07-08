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
import org.VCERP.Education.VC.controller.SubjectController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.utility.Util;

@Path("Subject")
public class SubjectResource {
	@POST
	@RolesAllowed("ADD_NEW_SUBJECT")
	@JWTTokenNeeded
	@Path("/NewSubject")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addSubject(@FormParam("subjectname") String subjectname,@FormParam("timeline") String timeline,
			@FormParam("branch") String branch)
	{
	Subject sub = null;
	SubjectController controller = null;
	try{
		sub = new Subject();
		controller = new SubjectController();
		sub.setSubject(subjectname);
		sub.setTimeline(timeline);
		sub.setBranch(branch);
		controller.addSubject(sub);
		return Util.generateResponse(Status.ACCEPTED, "New Subject Successfully Created.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new subject.Please try again or contact with administrator.").build();
	}
	
	@GET
	@PermitAll
	//@RolesAllowed("VIEW_SUBJECT")
	@JWTTokenNeeded
	@Path("/FetchAllSubject")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllSubject(@QueryParam("branch") String branch){
		try {
			ArrayList<Subject> sub=new ArrayList<>();
			SubjectController controller=new SubjectController();
			sub=controller.FetchAllSubject(branch);
			return Response.status(Status.OK).entity(sub).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@POST
	@RolesAllowed("EDIT_SUBJECT")
	@JWTTokenNeeded
	@Path("/EditSubject")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditSubject(@FormParam("subjectname") String subjectname,@FormParam("timeline") String timeline,
			@FormParam("id") long id,@FormParam("branch") String branch)
	{
	Subject sub = null;
	SubjectController controller = null;
	try{
		sub = new Subject();
		controller = new SubjectController();
		sub.setId(id);
		sub.setSubject(subjectname);
		sub.setTimeline(timeline);
		sub.setBranch(branch);
		controller.EditSubject(sub);
		return Util.generateResponse(Status.ACCEPTED, "Data Successfully Updated").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unabled to complete this task.").build();
	}
	@DELETE
	@Path("/deleteSubject")
	@RolesAllowed("DELETE_SUBJECT")
	@JWTTokenNeeded
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteSubject(@QueryParam("id") String id)
	{
		try{
		SubjectController controller=new SubjectController();
		controller.deleteSubject(id);
		return Util.generateResponse(Status.ACCEPTED, "Data Successfully Updated").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unabled to complete this task.").build();
	}
	
}