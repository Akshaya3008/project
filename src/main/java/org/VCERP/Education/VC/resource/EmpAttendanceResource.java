package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
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
//import org.VCERP.Education.VC.controller.EmployeeController;
//import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;


@Path("Attendance")
public class EmpAttendanceResource {
	
	@Path("/getEmpAttendaceList")
	@GET
	@PermitAll
	//@JWTTokenNeeded
	
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getEmpAttendanceList(@QueryParam("branch") String branch){
		try {
			ArrayList<Employee> em=new ArrayList<>();
			EmployeeAttendanceController controller=new EmployeeAttendanceController();
			em=controller.getEmpAttendanceList(branch);
			return Response.status(Status.OK).entity(em).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
	@Path("/employeeAttendance")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response employeeAttendance(@FormParam("Attendance") String attendance,@FormParam("branch") String branch )
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
			controller.employeeAttendance(empcode,intime,outtime,attend,branch);
			return Response.status(Status.ACCEPTED).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not save.").build();
	}
	@Path("/getEmpAttendaceStat")
	@POST
	@PermitAll
	//@JWTTokenNeeded
	
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getEmpAttendanceStat(@FormParam("from_date") String from_date,@FormParam("to_date") String to_date,
			@FormParam("branch") String branch){
		try {
			Employee employee=new Employee();
			ArrayList<Employee> em=new ArrayList<>();
			EmployeeAttendanceController controller=new EmployeeAttendanceController();
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
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
@Path("/getEmpAttendaceReport")
@POST
@PermitAll
//@JWTTokenNeeded

//@PreAuthorize("hasRole('desk')")
@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
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
	}
	return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
}
}
