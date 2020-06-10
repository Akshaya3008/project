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


import org.VCERP.Education.VC.controller.TimeTableController;


import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;

import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.utility.Util;

@Path("TimeTable")
public class TimeTableResource {
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/NewTimeTable")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	
	public Response addTimeTable(@FormParam("year") String aca_year,@FormParam("standard") String std,
			@FormParam("division") String division,@FormParam("subject") String subject,@FormParam("tt_title") String title)
	{
		TimeTable tt = null;
		TimeTableController controller = null;
	try{
		tt = new TimeTable();
		controller = new TimeTableController();
		tt.setAca_year(aca_year);
		tt.setDivision(division);
		tt.setStd(std);
		tt.setSubject(subject);
		tt.setTitle(title);
		
		controller.addSubject(tt);
		return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}
	@GET
	@PermitAll
	//@JWTTokenNeeded
	@Path("/FetchTimeTable")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response FetchTimeTable(){
		try {
			ArrayList<TimeTable> ttable=new ArrayList<>();
			TimeTableController controller=new TimeTableController();
			ttable=controller.FetchTimeTable();
			return Response.status(Status.OK).entity(ttable).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
	}
	