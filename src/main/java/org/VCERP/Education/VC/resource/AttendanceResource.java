package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.AttendanceController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@Path("Attendance")
public class AttendanceResource {
	private static final Logger logger = LogManager.getLogger(AttendanceResource.class.getName());
	@Path("/getAttendaceList")
	@POST
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendaceList(@FormParam("standard") String standard,@FormParam("acad_year") String acad_year
			,@FormParam("division") String division,@FormParam("branch") String branch){
		Attendance at=new Attendance();
		at.setStandard(standard);
		at.setAcad_year(acad_year);
		at.setDivision(division);
		at.setBranch(branch);
		ArrayList<Attendance> attendance=new ArrayList<>();
		AttendanceController controller=new AttendanceController();
		attendance=controller.getAttendanceList(at);
		if(attendance!=null)
		{
			return Response.status(Status.ACCEPTED).entity(attendance).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
	}
	
	
	@Path("/studentAttendance")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_STUDENT_ATTENDANCE")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response studentAttendance(@FormParam("standard") String standard,@FormParam("division") String division
			,@FormParam("acad_year") String acad_year
			,@FormParam("Attendance") String attendance,@FormParam("branch") String branch){
		
		String[] commaSeperatedAttendance=Util.commaSeperatedString(attendance);
		ArrayList<String> rollno=new ArrayList<>();
		ArrayList<String> attend=new ArrayList<>();
		for(int i=1;i<commaSeperatedAttendance.length;i++){
		String[] symbolSeperatedAttendance=Util.symbolSeperatedString(commaSeperatedAttendance[i]);
		String[] hyphenSeperatedAttendance=Util.hyphenSeperatedString(symbolSeperatedAttendance[0]);
		rollno.add(hyphenSeperatedAttendance[1]);
		attend.add(symbolSeperatedAttendance[1]);
		}
		try {
			AttendanceController controller=new AttendanceController();
			controller.studentAttendance(standard,division,acad_year,branch,rollno,attend);
			return Util.generateErrorResponse(Status.ACCEPTED, "Student Attendance Successfully Save.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to save attendance.").build();
	}
	
	@Path("/getAttendaceStat")
	@POST
	@PermitAll
	//@RolesAllowed("VIEW_STUDENT_ATTENDANCE")
	@JWTTokenNeeded
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendaceStat(@FormParam("standard") String standard,@FormParam("acad_year") String acad_year
			,@FormParam("division") String division,@FormParam("from_date") String from_date,@FormParam("to_date") String to_date,
			@FormParam("branch") String branch){
		Attendance at=new Attendance();
		at.setStandard(standard);
		at.setAcad_year(acad_year);
		at.setDivision(division);
		at.setBranch(branch);
		ArrayList<Attendance> attendancelist=new ArrayList<>();
		AttendanceController controller=new AttendanceController();
		attendancelist=controller.getAttendanceList(at);
		Attendance attendance=null;
		ArrayList<Attendance>attendancelistnew=new ArrayList<>();
		try {
			for(int i=0;i<attendancelist.size();i++)
			{	
				at=attendancelist.get(i);
				String id=at.getRollNo();
				String name=at.getName();
				String[] hyphenSeperated=Util.hyphenSeperatedString(id);
				String rollno=hyphenSeperated[1];
				attendance=new Attendance();
				attendance.setRollNo(rollno);
				attendance.setName(name);
				attendance.setFrom_date(from_date);
				attendance.setTo_date(to_date);
				attendance.setStandard(standard);
				attendance.setDivision(division);
				attendance.setAcad_year(acad_year);
				attendance.setBranch(branch);
				attendance=controller.getAttendanceStat(attendance);
				
				int totalDays=attendance.getTotalDays();
				int presentCount=attendance.getTotalPresent();
				String percentageCount= (int) Math.round(presentCount* 100.0/totalDays) + "%";
				
				attendance.setPercentageCount(percentageCount);
				attendance.setRollNo(id);
				attendancelistnew.add(attendance);
			}
				if(attendancelistnew!=null)
				{
				return Response.status(Status.ACCEPTED).entity(attendancelistnew).build();
				}
			} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
	}
	
	@Path("/studentAttendanceReport")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("VIEW_STUDENT_ATTENDANCE_REPORT")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response studentAttendanceReport(@FormParam("rollno") String rollno,
			@FormParam("standard") String standard,@FormParam("division") String division
			,@FormParam("acad_year") String acad_year,@FormParam("from_date") String from_date
		,@FormParam("to_date") String to_date,@FormParam("branch") String branch){
		String[] hyphenSeperated=Util.hyphenSeperatedString(rollno);
		String rno=hyphenSeperated[1];
		Attendance attend=new Attendance();
		ArrayList<Attendance> attendance=new ArrayList<>();
		attend.setRollNo(rno);
		attend.setAcad_year(acad_year);
		attend.setStandard(standard);
		attend.setDivision(division);
		attend.setFrom_date(from_date);
		attend.setTo_date(to_date);
		attend.setBranch(branch);
		AttendanceController controller=new AttendanceController();
		try{
			attendance=controller.studentAttendanceReport(attend);
			if(attendance!=null){
				return Response.status(Status.ACCEPTED).entity(attendance).build();	
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
	}
}
