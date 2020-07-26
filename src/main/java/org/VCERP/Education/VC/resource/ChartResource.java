
package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.ChartController;

import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Chart;

import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("chart")
public class ChartResource {
	private static final Logger logger = LogManager.getLogger(ChartResource.class.getName());
		
	@POST
	@RolesAllowed("VIEW_DASHBOARD")
	@JWTTokenNeeded
	@Path("/getExpenseChart")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getExpenseData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
	{
		Chart ch = null;
		ChartController controller = new ChartController();
		ArrayList<Chart> exp_chart = new ArrayList<>();
	try{
		ch = new Chart();
		 
		ch.setS_date(start_date.trim());
		ch.setE_date(end_date.trim());
		ch.setBranch(branch.trim());
		exp_chart = controller.getExpenseData(ch, exp_chart);
		//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();
	
		if(exp_chart!=null){
		return Response.status(Status.ACCEPTED).entity(exp_chart).build();	
	}
	}
	catch(Exception e){
		e.printStackTrace();
		logger.error(e);
	}
	return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	
	@POST
	@RolesAllowed("OVERALL_DASHBOARD")
	@JWTTokenNeeded
	@Path("/getOverallExpense")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOverallExpenseData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
	{
		Chart ch = null;
		ChartController controller = new ChartController();
		ArrayList<Chart> exp_chart = new ArrayList<>();
	try{
		ch = new Chart();
		 
		ch.setS_date(start_date.trim());
		ch.setE_date(end_date.trim());
		//ch.setBranch(branch.trim());
		exp_chart = controller.getOverallExpenseData(ch, exp_chart);
		//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();
	
		if(exp_chart!=null){
		return Response.status(Status.ACCEPTED).entity(exp_chart).build();	
	}
	}
	catch(Exception e){
		e.printStackTrace();
		logger.error(e);
	}
	return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}



@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getReceiptChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceiptData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> rec_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	rec_chart = controller.getReceiptData(ch, rec_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(rec_chart!=null){
	return Response.status(Status.ACCEPTED).entity(rec_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}

@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallReceipt")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallReceiptData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> rec_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	//ch.setBranch(branch.trim());
	rec_chart = controller.getOverallReceiptData(ch, rec_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(rec_chart!=null){
	return Response.status(Status.ACCEPTED).entity(rec_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}



@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getAdmissionChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getAdmissionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> adm_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	adm_chart = controller.getAdmissionData(ch, adm_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(adm_chart!=null){
		
	return Response.status(Status.ACCEPTED).entity(adm_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}


@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallAdmission")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallAdmissionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> adm_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	//ch.setBranch(branch.trim());
	adm_chart = controller.getOverallAdmissionData(ch, adm_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();
	if(adm_chart!=null){
		
	return Response.status(Status.ACCEPTED).entity(adm_chart).build();	
}
	
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}


@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getConversionChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getConversionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	int value = controller.getConversionData(ch);

	return Response.status(Status.ACCEPTED).entity(value).build();	
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}


@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallConversion")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallConversionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	//ch.setBranch(branch.trim());
	int value = controller.getOverallConversionData(ch);

	return Response.status(Status.ACCEPTED).entity(value).build();	
}
catch(Exception e){
	e.printStackTrace();
	logger.error(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}

@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getSalesCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getSalesCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			int value=controller.getSalesCard(ch);
			return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}


@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallSalesCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallSalesCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			//ch.setBranch(branch.trim());
			int value=controller.getOverallSalesCard(ch);
			return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}

@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getReceivedCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceivedCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			int value = controller.getReceivedCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}


@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallReceivedCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallReceivedCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			//ch.setBranch(branch.trim());
			int value = controller.getOverallReceivedCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}

@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getReceivableCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceivableCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			int value = controller.getReceivableCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}


@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallReceivableCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallReceivableCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			//ch.setBranch(branch.trim());
			int value = controller.getOverallReceivableCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}



@POST
@RolesAllowed("VIEW_DASHBOARD")
@JWTTokenNeeded
@Path("/getNetIncomeCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getNetIncomeCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			int value = controller.getNetIncomeCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}

@POST
@RolesAllowed("OVERALL_DASHBOARD")
@JWTTokenNeeded
@Path("/getOverallNetIncomeCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getOverallNetIncomeCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			//ch.setBranch(branch.trim());
			int value = controller.getOverallNetIncomeCard(ch);
				return Response.status(Status.ACCEPTED).entity(value).build();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}


}
