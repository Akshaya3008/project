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


import org.VCERP.Education.VC.controller.OtherInvoiceController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.OtherInvoice;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("OtherInvoice")
public class OtherInvoiceResource{
	private static final Logger logger = LogManager.getLogger(ReceiptDetailsResource.class.getName());
	@Path("/SearchStudent")
	@GET
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response SearchStudent(@QueryParam("id") String adm_stud,@QueryParam("branch") String branch) {
		Admission admission=new Admission();
		OtherInvoiceController controller = new OtherInvoiceController();
		admission = controller.SearchStudent(adm_stud,branch);
		if(admission!=null) {
			return Response.status(Status.ACCEPTED).entity(admission).build();
		}
		else {
			return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
		}
	}
	@PermitAll
	@GET
	@JWTTokenNeeded
	@Path("/InvoiceIncrementedNumber")
	@Produces(MediaType.APPLICATION_JSON)
	public Response InvoiceIncrementedNumber() {
		String no="";
		long InvoiceNo=1;
		try {
			OtherInvoiceController controller=new OtherInvoiceController();
			no=controller.InvoiceIncrementedNumber();
			if(no!=""){
				InvoiceNo=Long.parseLong(no)+1;
				return Response.status(Status.ACCEPTED).entity(InvoiceNo).build();
				}
				else{
					return Response.status(Status.ACCEPTED).entity(InvoiceNo).build();
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e);
			}
			return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to get receipt no.").build();
		
		}
	
	@POST
	@JWTTokenNeeded
	@Path("/CreateOtherInvoice")
	//@RolesAllowed("ADD_NEW_OTHER_INVOICE")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response OtherInvoiceForm(@FormParam("stud_details") String stud_name,
			@FormParam("invoice_date") String invoice_date,@FormParam("invoice_no") String invoice_no,
			@FormParam("receive_amount") long receive_amount,@FormParam("pay_mode") String pay_mode
			,@FormParam("trans_status") String trans_status,@FormParam("trans_date") String trans_date
			,@FormParam("received_by") String received_by,@FormParam("received_in") String received_in,@FormParam("narration") String narration,@FormParam("cheque_no") String cheque_no
			,@FormParam("branch") String branch)
	{
		String[] stud_details=Util.symbolSeperatedString(stud_name);
		//String[] commaSeperatedInstallDetails=Util.commaSeperatedString(installDetails);
		OtherInvoice details=null;
		//AdmissionController adcontroller=null;
		OtherInvoiceController controller = null;
		try {
			details=new OtherInvoice();
			details.setStud_name(stud_details[1]);
			details.setRollno(stud_details[0].trim());
			/*details.setContact(stud_details[2]);*/
			details.setInvoice_date(invoice_date);
			details.setInvoice_no(invoice_no);
			details.setPay_mode(pay_mode);
			details.setTrans_status(trans_status);
			details.setTrans_date(trans_date);
			details.setReceived_by(received_by);
			details.setNarration(narration);
			details.setCheque_no(cheque_no);
			//details.setTotal_amt(Long.parseLong(stud_details[3].trim()));
			details.setReceive_amount(receive_amount);		
			details.setBranch(branch);
			controller=new OtherInvoiceController();
			
			//details.setAmount(fees_remain);
			controller.OtherInvoiceForm(details);
			//adcontroller=new AdmissionController();
			//adcontroller.updateTotalFeesPaid(details.getRollno(),received_amt,fees_remain,branch);
	
			return Util.generateResponse(Status.ACCEPTED, "Invoice Details Successfully Inserted.").build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to insert data.Please try again or contact with administrator").build();
	}
	
	@GET
	@JWTTokenNeeded
	@PermitAll
	//@RolesAllowed("VIEW_RECEIPT")
	@Path("/FetchAllInvoiceDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllReceiptDetails(@QueryParam("branch") String branch){
		ArrayList<OtherInvoice> invoice=null;
		OtherInvoiceController controller=null;
		try {
			invoice=new ArrayList<>();
			controller=new OtherInvoiceController();
			invoice=controller.FetchAllInvoiceDetails(branch);
			if(invoice!=null){
			return Response.status(Status.ACCEPTED).entity(invoice).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	@Path("/deleteInvoice")
	@POST
	@JWTTokenNeeded
	//@RolesAllowed("DELETE_OTHER_INVOICE")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteInvoice(@FormParam("invoiceDetails") String invoiceDetails,@FormParam("branch") String branch){
		try {
			OtherInvoiceController invcontroller=new OtherInvoiceController();
			invcontroller.deleteInv(invoiceDetails,branch);
			return Util.generateResponse(Status.ACCEPTED, "Invoice Successfully Deteleted.").build();	
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to complete task.Please try again or contact with administrator").build();
	}
	

	@GET
	@JWTTokenNeeded
	@Path("/FetchAllAdmittedStudent")
	@PermitAll
	//@RolesAllowed("VIEW_ADMISSION")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchAllStudent(@QueryParam("branch") String branch) {
		ArrayList<Admission> admission = null;
		OtherInvoiceController controller=null;
		try {
			admission = new ArrayList<>();
			controller = new OtherInvoiceController();
			controller.fetchAllAdmittedStudent(admission, branch);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	}
