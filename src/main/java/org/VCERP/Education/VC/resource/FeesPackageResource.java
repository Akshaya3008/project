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

import org.VCERP.Education.VC.controller.FeesPackageController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.utility.Util;

@Path("FeesPackage")
public class FeesPackageResource {
	
	@POST
	@RolesAllowed("ADD_NEW_FEES_PACKAGE")
	@JWTTokenNeeded
	@Path("/addNewFeesPackage")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewFeesPackage(@FormParam("fees_pack") String fees_pack,
	@FormParam("finalamt") String finalamt,@FormParam("standardData") String standardData,
	@FormParam("branchData") String branchData,@FormParam("fees_details") String fees_details
	,@FormParam("createdby") String createdby)
	{
		String standard=standardData.replace(",", "-");
		FeesPackage pack=new FeesPackage();
		pack.setFeesPackage(fees_pack);
		pack.setStandard(standard);
		pack.setBranch(branchData);
		pack.setTotal_amt(finalamt);
		pack.setFees_details(fees_details);
		pack.setCreated_by(createdby);
		FeesPackageController controller=new FeesPackageController();
		try{
		controller.addNewFeesPackage(pack);
		return Util.generateResponse(Status.ACCEPTED, "New Course Package Successfully Cretaed.").build();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new course package.Please try again or contact with administrator.").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/getBranchSpecificStandard")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBranchSpecificStandard(@QueryParam("branch") String branch)
	{
		ArrayList<String> std=new ArrayList<>();
		FeesPackageController controller=new FeesPackageController();
		try{
		std=controller.getBranchSpecificStandard(branch);
		if(std!=null){
		return Response.status(Status.ACCEPTED).entity(std).build();
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to get standard data").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/loadBranch")
	@Produces(MediaType.APPLICATION_JSON)
	public Response loadBranch(@QueryParam("std") String std)
	{
		ArrayList<String> branch=new ArrayList<>();
		FeesPackageController controller=new FeesPackageController();
		try{
		branch=controller.loadBranch(std);
		if(branch!=null){
		return Response.status(Status.ACCEPTED).entity(branch).build();
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to load branch.").build();
	}
	
	@GET
	@RolesAllowed("VIEW_FEES_PACKAGE")
	@JWTTokenNeeded
	@Path("/getFeesPackage")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFeesPackage(@QueryParam("branch") String branch)
	{
		ArrayList<FeesPackage> pack=new ArrayList<>();
		FeesPackageController controller=new FeesPackageController();
		try{
		pack=controller.getFeesPackage(branch);
		if(pack!=null){
		return Response.status(Status.ACCEPTED).entity(pack).build();
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found.").build();
	}
	
	
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/getFeesPackageData")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getSpecificFeesPackageData(@FormParam("pack") String pack,@FormParam("branch") String branch)
	{
		FeesPackage fees=new FeesPackage();
		FeesPackageController controller=new FeesPackageController();
		try{
		fees=controller.getFeesPackage(pack,branch);
		if(fees!=null){
		return Response.status(Status.ACCEPTED).entity(fees).build();
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to get Fees Package Data").build();
	}
	
	
	@POST
	@RolesAllowed("EDIT_FEES_PACKAGE")
	@JWTTokenNeeded
	@Path("/EditFeesPackage")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditFeesPackage(@FormParam("fees_pack") String fees_pack,
	@FormParam("finalamt") String finalamt,@FormParam("standardData") String standardData,
	@FormParam("branchData") String branchData,@FormParam("fees_details") String fees_details
	,@FormParam("createdby") String createdby,@FormParam("id") Long id)
	{
		String standard=standardData.replace(",", "-");
		FeesPackage pack=new FeesPackage();
		pack.setId(id);
		pack.setFeesPackage(fees_pack);
		pack.setStandard(standard);
		pack.setBranch(branchData);
		pack.setTotal_amt(finalamt);
		pack.setFees_details(fees_details);
		pack.setCreated_by(createdby);
		FeesPackageController controller=new FeesPackageController();
		try{
		controller.EditFeesPackage(pack);
		return Util.generateResponse(Status.ACCEPTED, "Course Package Successfully Updated.").build();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
	@DELETE
	@RolesAllowed("DELETE_FEES_PACKAGE")
	@JWTTokenNeeded
	@Path("/deleteFeesPackage")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteFeesPackage(@QueryParam("id") String id)
	{
		FeesPackageController controller=new FeesPackageController();
		try{
		controller.deleteFeesPackage(id);
		return Util.generateResponse(Status.ACCEPTED, "Course Package Successfully Deleted.").build();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete task.").build();
	}
}
