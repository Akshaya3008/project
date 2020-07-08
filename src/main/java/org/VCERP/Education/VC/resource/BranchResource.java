package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.BranchController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Branch;
import org.VCERP.Education.VC.utility.Util;

@Path("branch")
public class BranchResource {

	@Path("/addNewBranch")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("ADD_NEW_BRANCH")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewBranch(@BeanParam Branch branch) {
		BranchController controller = new BranchController();
		try {		
			controller.addNewBranch(branch);
			return Util.generateResponse(Status.ACCEPTED, "New Branch Successfully Created.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to save create new branch.Please try again or contact with administrator.").build();
	}

	@Path("/getBranch")
	@GET
	@JWTTokenNeeded
	@PermitAll
	//@RolesAllowed("VIEW_BRANCH")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBranchDetails(@QueryParam("branch") String branch) {
		BranchController controller = new BranchController();
		try {
			Branch b = controller.getBranchDetails(branch);
			if (b != null) {
				return Response.status(Status.ACCEPTED).entity(b).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to get branch details").build();
	}
	
	@Path("/getAllBranch")
	@GET
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllBranchDetails() {
		BranchController controller = new BranchController();
		try {
			ArrayList<Branch> branch = controller.getAllBranchDetails();
			if (branch != null) {
				return Response.status(Status.ACCEPTED).entity(branch).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to get branch details").build();
	}
	@Path("/editBranch")
	@POST
	@JWTTokenNeeded
	@RolesAllowed("EDIT_BRANCH")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response editBranch(@BeanParam Branch branch) {
		try {
			BranchController controller = new BranchController();
			controller.editBranch(branch);
			return Util.generateResponse(Status.ACCEPTED, "Branch Details Successfully Updated.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to update branch details.Please try again or contact with administrator.").build();
	}
}
