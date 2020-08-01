package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.EmployeeAttendanceController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
//import org.VCERP.Education.VC.controller.EmployeeController;
//import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@Path("Attendance")
public class EmpAttendanceResource {
	private static final Logger logger = LogManager.getLogger(EmpAttendanceResource.class.getName());
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/getEmpAttendaceList")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEmpAttendanceList(@QueryParam("date") String date,@QueryParam("branch") String branch){
		ArrayList<String> empcode=checkForAttendanceMark(date, branch);
		ArrayList<Employee> em=new ArrayList<>();
		ArrayList<Employee> finalemplist=new ArrayList<>();
		EmployeeAttendanceController controller=new EmployeeAttendanceController();
		try {			
			em=controller.getEmpAttendanceList(branch);
			if(empcode==null){
				return Response.status(Status.OK).entity(em).build();	
			}else{
				for(int i=0;i<em.size();i++){
				Employee emp=em.get(i);
				String emp_unq_code=emp.getEmp_unq_code();
				if(!empcode.contains(emp_unq_code)){
					finalemplist.add(em.get(i));
					}
				}
				if(finalemplist!=null){
				return Response.status(Status.OK).entity(finalemplist).build();
				}else{
					return Util.generateErrorResponse(Status.NOT_FOUND,"Attendance already mark for selected date.").build();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
	
	@POST
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_EMPLOYEE_ATTENDANCE")
	@Path("/employeeAttendance")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response employeeAttendance(@FormParam("Attendance") String attendance,@FormParam("attendanceDate") String attendanceDate,
			@FormParam("branch") String branch )
	{		
		String[] commaSeperatedAttendance=Util.commaSeperatedString(attendance);
		ArrayList<String> empcode=new ArrayList<>();
		ArrayList<String> intime=new ArrayList<>();
		ArrayList<String> outtime=new ArrayList<>();
		ArrayList<String> attend=new ArrayList<>();
		for(int i=1;i<commaSeperatedAttendance.length;i++){
		String a=commaSeperatedAttendance[i];
		String[] symbolSeperatedAttendance=Util.symbolSeperatedString(a);
		empcode.add(symbolSeperatedAttendance[0]);
		intime.add(symbolSeperatedAttendance[1]);
		outtime.add(symbolSeperatedAttendance[2]);
		attend.add(symbolSeperatedAttendance[3]);
		}
		try {
			EmployeeAttendanceController controller=new EmployeeAttendanceController();
			controller.employeeAttendance(empcode,intime,outtime,attend,attendanceDate,branch);
			return Util.generateResponse(Status.ACCEPTED,"Employee Attendance Successfully Submitted.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Unable to submit employee attendance.please try again or contact with administrator..").build();
	}
	
	@POST
	@PermitAll
	//@RolesAllowed("VIEW_EMPLOYEE_ATTENDANCE")
	@JWTTokenNeeded
	@Path("/getEmpAttendaceStat")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEmpAttendanceStat(@FormParam("from_date") String from_date,@FormParam("to_date") String to_date,
			@FormParam("branch") String branch){
		Employee employee=new Employee();
		ArrayList<Employee> em=new ArrayList<>();
		EmployeeAttendanceController controller=new EmployeeAttendanceController();
		try {
			em=controller.getEmpAttendanceList(branch);
			ArrayList<Employee> employeeattendancestat=new ArrayList<>();
			Employee emp=null;
			for(int i=0;i<em.size();i++){
			employee=em.get(i);
			emp=new Employee();
			emp.setEmp_unq_code(employee.getEmp_unq_code());
			emp.setEmp_name(employee.getEmp_name());
			emp.setFrom_date(from_date);
			emp.setTo_date(to_date);
			emp.setBranch(branch);
			emp=controller.getEmpAttendanceStat(emp);
			String percent=(int)Math.round(emp.getTotalPresent() * 100.0 / emp.getTotalDays()) + "%";
			emp.setPercentage(percent);
			employeeattendancestat.add(emp);
			}
			return Response.status(Status.OK).entity(employeeattendancestat).build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	

@POST
@RolesAllowed("VIEW_EMPLOYEE_ATTENDANCE_REPORT")
@JWTTokenNeeded
@Path("/getEmpAttendaceReport")
@Produces(MediaType.APPLICATION_JSON)
public Response getEmpAttendanceReport(@FormParam("id") String id,@FormParam("from_date") String from_date,
		@FormParam("to_date") String to_date,@FormParam("branch") String branch){
	Employee emp=new Employee();
	emp.setEmp_unq_code(id);
	emp.setFrom_date(from_date);
	emp.setTo_date(to_date);
	emp.setBranch(branch);
	EmployeeAttendanceController controller=new EmployeeAttendanceController();
	ArrayList<Employee> employee=new ArrayList<>();
	try {
		employee=controller.getEmpAttendanceReport(emp);		
		if(employee!=null){
		return Response.status(Status.OK).entity(employee).build();
		}
	} catch (Exception e) {
		e.printStackTrace();
		logger.error(e);
	}
	return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
}

private ArrayList<String> checkForAttendanceMark(String date,String branch){
	EmployeeAttendanceController controller=new EmployeeAttendanceController();
	ArrayList<String> empcode=new ArrayList<>();
	try {
		empcode=controller.checkForAttendanceMark(date,branch);		
	} catch (Exception e) {
		e.printStackTrace();
		logger.error(e);
	}
	return empcode;
}
}
