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


import org.VCERP.Education.VC.controller.TimeTableController;
import org.VCERP.Education.VC.controller.EmployeeController;

import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;

import org.VCERP.Education.VC.model.TimeTable;

import org.VCERP.Education.VC.model.Employee;

import org.VCERP.Education.VC.utility.Util;

@Path("TimeTable")
public class TimeTableResource {
	
	@POST
	@RolesAllowed("ADD_NEW_TIMETABLE")
	@JWTTokenNeeded
	@Path("/NewTimeTable")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	
	public Response addTimeTable(@FormParam("aca_year") String aca_year,@FormParam("standard") String std,
			@FormParam("division") String division,@FormParam("subject") String subject,@FormParam("title") String title,
			@FormParam("tt_details") String tt_details,@FormParam("branch") String branch)
	{
		TimeTable tt = null;
		TimeTableController controller = null;
		String[] dollarSeperatedTT=Util.dollarSeperatedString(tt_details);
	try{
		tt = new TimeTable();
		controller = new TimeTableController();
		for(int i=1;i<dollarSeperatedTT.length;i++){
		String[] pipeSeperatedTT=Util.symbolSeperatedString(dollarSeperatedTT[i]);
		tt.setAca_year(aca_year);
		tt.setDivision(division);
		tt.setStd(std);
		tt.setSubject(subject);
		tt.setTitle(title);
		tt.setDay(pipeSeperatedTT[0]);
		tt.setTime_slot(pipeSeperatedTT[1]);
		tt.setLecturer(pipeSeperatedTT[2]);
		tt.setStatus(pipeSeperatedTT[3]);
		tt.setBranch(branch);
		controller.addTimeTable(tt);
		}
		return Util.generateResponse(Status.ACCEPTED, "New TimeTable Successfully Inserted").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new time table.Please try agin or contact with administrator").build();
	}
	
	@GET
	@PermitAll
	//@RolesAllowed("VIEW_TIMETABLE")
	@JWTTokenNeeded
	@Path("/FetchTimeTable")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchTimeTable(@QueryParam("branch") String branch){
		ArrayList<TimeTable> ttable=new ArrayList<>();
		TimeTableController controller=new TimeTableController();
		try {
			ttable=controller.FetchTimeTable(branch);
			if(ttable!=null){
			return Response.status(Status.OK).entity(ttable).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/FetchLecturer")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchLecturer(@QueryParam("branch") String branch){
		ArrayList<String> emp_desg=new ArrayList<>();
		TimeTableController controller=new TimeTableController();
		try {
			emp_desg=controller.FetchLecturer(branch);
			if(emp_desg!=null){
				return Response.status(Status.OK).entity(emp_desg).build();	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Lecturer Data Not Found.").build();
	}

	@POST
	@RolesAllowed("ADD_NEW_TIMETABLE")
	@JWTTokenNeeded
	@Path("/InsertTimeSlot")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response InsertTimeSlot(@FormParam("time_slot") String slot,@FormParam("branch") String Branch)
	{
		TimeTable timetable=null;
		TimeTableController controller = null;
		try{
		timetable = new TimeTable();
		controller = new TimeTableController();
		timetable.setTime_slot(slot);
		timetable.setBranch(Branch);
		controller.InsertTimeSlot(timetable);
		return Util.generateResponse(Status.ACCEPTED, "Time Slot Successfully Inserted.").build();
		}
		catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to insert new time slot").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/FetchTime")
	@Produces(MediaType.APPLICATION_JSON)
	public Response loadTime(@QueryParam("branch") String branch){
		ArrayList<String> tslot=new ArrayList<>();
		TimeTableController controller=new TimeTableController();
		try {
			tslot=controller.loadTime(branch);
			if(tslot!=null){
				return Response.status(Status.OK).entity(tslot).build();	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Time Slot Not Found.").build();
	}
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/getSpecificTimeTable")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getSpecificTimeTable(@FormParam("created_date") String created_date,
			@FormParam("title") String title,@FormParam("branch") String branch){
		ArrayList<TimeTable> tslot=new ArrayList<>();
		TimeTableController controller=new TimeTableController();
		try {
			tslot=controller.getSpecificTimeTable(created_date,title,branch);
			if(tslot!=null){
				return Response.status(Status.OK).entity(tslot).build();	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	@POST
	@RolesAllowed("EDIT_TIMETABLE")
	@JWTTokenNeeded
	@Path("/EditTimeTable")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	
	public Response EditTimeTable(@FormParam("aca_year") String aca_year,@FormParam("standard") String std,
			@FormParam("division") String division,@FormParam("subject") String subject,@FormParam("title") String title,
			@FormParam("tt_details") String tt_details,@FormParam("created_date") String created_date,
			@FormParam("branch") String branch)
	{
		TimeTable tt = null;
		TimeTableController controller = null;
		String[] dollarSeperatedTT=Util.dollarSeperatedString(tt_details);
		int j=0;
	try{
		tt = new TimeTable();
		controller = new TimeTableController();
		for(int i=1;i<dollarSeperatedTT.length;i++){
		String[] pipeSeperatedTT=Util.symbolSeperatedString(dollarSeperatedTT[i]);
		tt.setAca_year(aca_year);
		tt.setDivision(division);
		tt.setStd(std);
		tt.setSubject(subject);
		tt.setTitle(title);
		tt.setDay(pipeSeperatedTT[0]);
		tt.setTime_slot(pipeSeperatedTT[1]);
		tt.setLecturer(pipeSeperatedTT[2]);
		tt.setStatus(pipeSeperatedTT[3]);
		tt.setCreated_date(created_date);
		tt.setBranch(branch);
		while(j<1)
		{
			controller.EditTimeTable(tt);
			j++;
		}
		controller.addTimeTable(tt);
		}
		return Util.generateResponse(Status.ACCEPTED, "Data Successfully Updated.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable ot complete the task.").build();
	}
	@POST
	@RolesAllowed("DELETE_TIMETABLE")
	@JWTTokenNeeded
	@Path("/deleteTimeTable")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response deleteTimeTable(@FormParam("created_date") String created_date,
			@FormParam("title") String title,@FormParam("branch") String branch){
		TimeTable tt=new TimeTable();
		TimeTableController controller=new TimeTableController();
		try {
			tt.setCreated_date(created_date);
			tt.setTitle(title);
			tt.setBranch(branch);
			controller.deleteTimeTable(tt);
			return Util.generateResponse(Status.ACCEPTED,"Data Successfully Deleted.").build();	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Unable to complete the task.").build();
	}
	@POST
	@RolesAllowed("VIEW_TIME_TABLE_REPORT")
	@JWTTokenNeeded
	@Path("/TimeTableReport")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response TimeTableReport(@FormParam("branch") String branch,@FormParam("lecturer") String lecturer,
			@FormParam("tt_title") String tt_title){
		String[] commaSeperatedTitle=Util.commaSeperatedString(tt_title);
		//String[] commaSeperatedLecturer=Util.commaSeperatedString(lecturer);
		TimeTable tt=new TimeTable();
		TimeTableController controller=new TimeTableController();
		ArrayList<TimeTable> time_table=new ArrayList<>();
		try {
			for(int i=0;i<commaSeperatedTitle.length;i++){
				//for(int j=0;j<commaSeperatedLecturer.length;j++){
					tt.setTitle(commaSeperatedTitle[i]);
					tt.setLecturer(lecturer);
					tt.setBranch(branch);
					time_table=controller.TimeTableReport(tt,time_table);
				//}
			}
			if(time_table!=null){
			return Response.status(Status.ACCEPTED).entity(time_table).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Unable to complete the task.").build();
	}
}
	