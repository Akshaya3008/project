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

import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("Employee")
public class EmployeeResource {
	private static final Logger logger = LogManager.getLogger(EmployeeResource.class.getName());
	@POST
	@RolesAllowed("ADD_NEW_EMPLOYEE")
	@JWTTokenNeeded
	@Path("/NewEmployee")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addEmployee(@FormParam("emp_type") String emp_type,@FormParam("branch") String branch
			,@FormParam("emp_name") String emp_name,@FormParam("emp_unq_code") String emp_unq_code
			,@FormParam("address") String address,@FormParam("contact") String contact,
			@FormParam("dob") String dob,@FormParam("join_date") String join_date,
			@FormParam("design") String design,@FormParam("email") String email){
		Employee emp=null;
		EmployeeController controller=null;
		try {
			emp=new Employee();
			controller=new EmployeeController();
			emp.setEmp_type(emp_type);
			emp.setBranch(branch);
			emp.setEmp_name(emp_name);
			emp.setEmp_unq_code(emp_unq_code);
			emp.setEmail(email);
			emp.setAddress(address);
			emp.setContact(contact);
			emp.setDob(dob);
			emp.setJoin_date(join_date);
			emp.setDesign(design);
			controller.addEmployee(emp);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to Insert Data.").build();
	}
	
	@GET
	@PermitAll
	//@RolesAllowed("VIEW_EMPLOYEE")
	@JWTTokenNeeded
	@Path("/FetchAllEmployee")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllEmployee(@QueryParam("branch") String branch){
		ArrayList<Employee> emp=new ArrayList<>();
		EmployeeController controller=new EmployeeController();
		try {
			emp=controller.FetchAllEmployee(branch);
			if(emp!=null){
				return Response.status(Status.OK).entity(emp).build();	
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/getSepecificEmployeeDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSepecificEmployeeDetails(@QueryParam("id") Long id){
		Employee emp=new Employee();
		EmployeeController controller=new EmployeeController();
		try {
			emp=controller.getSepecificEmployeeDetails(id);
			if(emp!=null){
				return Response.status(Status.OK).entity(emp).build();	
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	@POST
	@RolesAllowed("EDIT_EMPLOYEE")
	@JWTTokenNeeded
	@Path("/EditEmployee")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditEmployee(@FormParam("emp_type") String emp_type,@FormParam("branch") String branch
			,@FormParam("emp_name") String emp_name,@FormParam("emp_unq_code") String emp_unq_code
			,@FormParam("address") String address,@FormParam("contact") String contact,
			@FormParam("dob") String dob,@FormParam("join_date") String join_date,
			@FormParam("design") String design,@FormParam("email") String email,@FormParam("id") Long id){
		Employee emp=null;
		EmployeeController controller=null;
		try {
			emp=new Employee();
			controller=new EmployeeController();
			emp.setId(id);
			emp.setEmp_type(emp_type);
			emp.setBranch(branch);
			emp.setEmp_name(emp_name);
			emp.setEmp_unq_code(emp_unq_code);
			emp.setEmail(email);
			emp.setAddress(address);
			emp.setContact(contact);
			emp.setDob(dob);
			emp.setJoin_date(join_date);
			emp.setDesign(design);
			controller.EditEmployee(emp);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Updated.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@RolesAllowed("DELETE_EMPLOYEE")
	@JWTTokenNeeded
	@Path("/deleteEmployee")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteEmployee(@QueryParam("id") String id){
		EmployeeController controller=new EmployeeController();
		try {
			controller.deleteEmployee(id);
			return Util.generateErrorResponse(Status.ACCEPTED,"Data Successfully Deleted.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Unable to complete task.").build();
	}
	@POST
	@RolesAllowed("VIEW_EMPLOYEE_REPORT")
	@JWTTokenNeeded
	@Path("/FetchEmployeeReport")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response FetchEmployeeReport(@FormParam("branch") String branch,@FormParam("emp_name") String emp_name,
			@FormParam("design") String design){
		Employee employee=null;
		ArrayList<Employee> emp=new ArrayList<>();
		EmployeeController controller=new EmployeeController();
		String[] commaSeperatedDesign=Util.commaSeperatedString(design);
		try {	
			for(int i=0;i<commaSeperatedDesign.length;i++){
				employee=new Employee();
				employee.setBranch(branch);
				employee.setEmp_name(emp_name);
				employee.setDesign(commaSeperatedDesign[i]);
				emp=controller.FetchEmployeeReport(employee,emp);
			}
			if(emp!=null){
				return Response.status(Status.OK).entity(emp).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}	
	
}
