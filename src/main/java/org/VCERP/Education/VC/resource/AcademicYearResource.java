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

import org.VCERP.Education.VC.controller.AcademicYearController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

@Path("AcademicYear")
public class AcademicYearResource{
	
	@POST
	@RolesAllowed("ADD_NEW_ACADEMIC_YEAR")
	@JWTTokenNeeded
	@Path("/NewAcademic")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addAcademic(@FormParam("aca_year") String aca_year, @FormParam("aca_start") String aca_start,
			@FormParam("aca_end") String aca_end,@FormParam("prefix_id_card") String prefix_id_card,
			@FormParam("id_card") String id_card,@FormParam("prefix_invoice") String prefix_invoice,
			@FormParam("invoice") String invoice,@FormParam("prefix_regno") String prefix_regno,
			@FormParam("regno") String regno,@FormParam("branch") String branch)
	{
		AcademicYear year = null;
		AcademicYearController controller = null;
		try {
			year = new AcademicYear();
			controller = new AcademicYearController();
			year.setAca_year(aca_year);
			year.setStart_date(aca_start);
			year.setEnd_date(aca_end);
			year.setId_prefix(prefix_id_card);
			year.setId_no(id_card);
			year.setInvoice_prefix(prefix_invoice);
			year.setInvoice(invoice);
			year.setReg_prefix(prefix_regno);
			year.setRegistration(regno);
			year.setBranch(branch);
			controller.addAcademicYear(year);
			return Util.generateResponse(Status.ACCEPTED, "New Academic Year Successfully Created.").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new academic year.please try again or contact with administrator").build();
	}
	
	@GET
	@RolesAllowed("VIEW_ACADEMIC_YEAR")
	@JWTTokenNeeded
	@Path("/AcademicList")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response FetchAllAcademic(@QueryParam("branch") String branch){
		ArrayList<AcademicYear> academiclist = new ArrayList<>();
		AcademicYearController controller = null;
		try{
			controller = new AcademicYearController();
			academiclist = controller.AcademicList(branch);
			return Response.status(Status.OK).entity(academiclist).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/SpecificAcademicData")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response SpecificAcademicData(@QueryParam("id") String id,@QueryParam("branch") String branch){
		AcademicYear academiclist = new AcademicYear();
		AcademicYearController controller = null;
		try{
			controller = new AcademicYearController();
			academiclist = controller.SpecificAcademicData(id,branch);
			return Response.status(Status.OK).entity(academiclist).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	@POST
	@RolesAllowed("EDIT_ACADEMIC_YEAR")
	@JWTTokenNeeded
	@Path("/editAcademicYear")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response editAcademicYear(@FormParam("aca_year") String aca_year, @FormParam("aca_start") String aca_start,
			@FormParam("aca_end") String aca_end,@FormParam("prefix_id_card") String prefix_id_card,
			@FormParam("id_card") String id_card,@FormParam("prefix_invoice") String prefix_invoice,
			@FormParam("invoice") String invoice,@FormParam("prefix_regno") String prefix_regno,
			@FormParam("regno") String regno,@FormParam("id") long id,@FormParam("branch") String branch)
	{
		AcademicYear year = null;
		AcademicYearController controller = null;
		try {
			year = new AcademicYear();
			controller = new AcademicYearController();
			year.setAca_year(aca_year);
			year.setStart_date(aca_start);
			year.setEnd_date(aca_end);
			year.setId_prefix(prefix_id_card);
			year.setId_no(id_card);
			year.setInvoice_prefix(prefix_invoice);
			year.setInvoice(invoice);
			year.setReg_prefix(prefix_regno);
			year.setRegistration(regno);
			year.setId(id);
			year.setBranch(branch);
			controller.editAcademicYear(year);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Updated").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@RolesAllowed("DELETE_ACADEMIC_YEAR")
	@JWTTokenNeeded
	@Path("/DeleteAcadYear")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response DeleteAcadYear(@QueryParam("id") String id,@QueryParam("branch") String branch){
		AcademicYearController controller = null;
		try{
			controller = new AcademicYearController();
			controller.DeleteAcadYear(id,branch);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Deleted").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to complete task.").build();
	}
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/CurrenetAcadYear")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response CurrenetAcadYear(@QueryParam("branch") String branch){
		AcademicYearController controller = null;
		AcademicYear acad_year=new AcademicYear();
		try{
			controller = new AcademicYearController();
			acad_year=controller.getCurrentAcademicYear(branch);
			if(acad_year!=null){
			return Response.status(Status.ACCEPTED).entity(acad_year).build();
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Academic Year Not Found.").build();
	}

}
