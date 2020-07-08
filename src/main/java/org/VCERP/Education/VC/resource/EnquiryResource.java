package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;

@Path("Enquiry")
public class EnquiryResource {
	
	@Path("/EnquiryData")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_ENQUIRY")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EnquiryData(@Valid @BeanParam Enquiry enquiry){
		EnquiryController controller=new EnquiryController();
		try {
			controller.EnquiryData(enquiry);
			return Util.generateResponse(Status.ACCEPTED,"Student Enquiry Data Successfully Submited.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_ACCEPTABLE,"Data not submited.please try again or contact with administrator.").build();
	}

	@Path("/editEnquiryData")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("EDIT_ENQUIRY")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditEnquiryData(@Valid @BeanParam Enquiry enquiry){
		EnquiryController controller=new EnquiryController();
		int count=0;
		String adm_status="Admitted";
		String enq_status;
		try {
			count=controller.EditEnquiryData(enquiry);
			if(count!=0){
				enq_status=enquiry.getStatus().trim();
				if(adm_status.matches(enq_status))
				{
					controller.EditAdmissionPersonalDetails(enquiry);
				}
			return Util.generateResponse(Status.ACCEPTED,"Student Enquiry Data Successfully Updated.").build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_ACCEPTABLE,"Unable to update data.please try again or contact with administrator.").build();
	}
	
	@GET
	@JWTTokenNeeded
	@Path("/FetchAllEnquiryData")
	@RolesAllowed("VIEW_ENQUIRY")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllEnquiryData(@QueryParam("branch") String branch){
		try {
			ArrayList<Enquiry> enq=new ArrayList<>();
			EnquiryController controller=new EnquiryController();
			enq=controller.FetchAllEnquiryData(branch);
			return Response.status(Status.OK).entity(enq).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@DELETE
	@JWTTokenNeeded
	@Path("/DeleteMultipleEnquiryData")
	@RolesAllowed("DELETE_ENQUIRY")
	@Produces(MediaType.APPLICATION_JSON)
	public Response DeleteMultipleEnquiryData(@QueryParam("delete") String ids,@QueryParam("branch") String branch){
		EnquiryController controller=new EnquiryController();
		try {
			String[] commaSeperatedId=Util.commaSeperatedString(ids);
			for(int i=0;i<commaSeperatedId.length;i++){
			controller.DeleteMultipleEnquiryData(Long.parseLong(commaSeperatedId[i]),branch);
			}
			return Util.generateResponse(Status.ACCEPTED,"Data Successfully Deleted. ").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Unable to delete data.please try again or contact with administrator.").build();
	}
	
/*	@PUT
	@PermitAll
	@JWTTokenNeeded
	@Path("/Admission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response Admission(@FormParam("id") long id){
		try {
			EnquiryController controller=new EnquiryController();
			controller.Admission(id);
			return Util.generateResponse(Status.OK,"Admission done.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST,"Admission not done.").build();
	}*/
	@POST
	@JWTTokenNeeded
	@Path("/EnquiryReport")
	@RolesAllowed("VIEW_STUDENT_INFO_REPORT")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response EnquiryReport(@FormParam("enq_taken_by") String enq_taken,@FormParam("from_date") String from_date,
			@FormParam("to_date") String to_date,@FormParam("enq_status") String enq_status,@FormParam("course_package") String course,
			@FormParam("branch") String branch){
		String[] commaSeperated_Enq_taken=Util.commaSeperatedString(enq_taken);
		String[] commaSeperated_Enq_status=Util.commaSeperatedString(enq_status);
		String[] commaSeperated_package=Util.commaSeperatedString(course);
		Enquiry enquiry=null;
		//Enquiry enqData=new Enquiry();
		EnquiryController controller=new EnquiryController();
		ArrayList<Enquiry> enq=new ArrayList<>();
		try {
			for(int i=0;i<commaSeperated_Enq_taken.length;i++){
				for(int j=0;j<commaSeperated_Enq_status.length;j++){
					for(int k=0;k<commaSeperated_package.length;k++){
					enquiry=new Enquiry();
					enquiry.setEnq_taken_by(commaSeperated_Enq_taken[i]);
					enquiry.setFrom_date(from_date);
					enquiry.setTo_date(to_date);
					enquiry.setStatus(commaSeperated_Enq_status[j]);
					enquiry.setFees_pack(commaSeperated_package[k]);
					enquiry.setBranch(branch);
					enq=controller.EnquiryReport(enquiry,enq);
					/*if(enqData!=null){
						enq.add(enqData);	
					}*/
					}
				}
			}
			if(enq!=null){
				return Response.status(Status.ACCEPTED).entity(enq).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST,"Admission not done.").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/IncrementedEnqNo")
	@Produces(MediaType.APPLICATION_JSON)
	public Response IncrementedEnqNo(@QueryParam("branch") String branch){
		int enq_no;
		EnquiryController controller=new EnquiryController();
		try {
			enq_no=controller.IncrementedEnqNo(branch);
			if(enq_no==0){
				enq_no=1;
			}
			else{
				enq_no=enq_no+1;
			}
			return Response.status(Status.ACCEPTED).entity(enq_no).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST,"Unable to get Auto Incremented Enquiry Number.").build();
	}

}
