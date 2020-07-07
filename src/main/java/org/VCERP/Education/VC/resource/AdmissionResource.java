package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
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

import org.VCERP.Education.VC.controller.AcademicYearController;
import org.VCERP.Education.VC.controller.AdmissionController;
import org.VCERP.Education.VC.controller.AttendanceController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.controller.FeesPackageController;
import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.utility.Util;

@Path("Admission")
public class AdmissionResource {
	

	@PermitAll
	@POST
	@JWTTokenNeeded
	@Path("/StudentAdmission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response StudentAdmission(@FormParam("stud_details") String student_name,
			@FormParam("enq_taken_by") String enq_taken_by, @FormParam("adm_fees_pack") String adm_fees_pack,
			@FormParam("division") String division, @FormParam("status") String status, @FormParam("date") String date,
			@FormParam("Rollno") String Rollno, @FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no, @FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year, @FormParam("join_date") String join_date,
			@FormParam("personalDetails") String personalDetails, @FormParam("feestypeDetails") String feestypeDetails,
			@FormParam("installment") String installment, @FormParam("newAmt") String newAmt) {
		String[] name = Util.symbolSeperatedString(student_name);
		String[] f_pack = Util.symbolSeperatedString(adm_fees_pack);
		String[] personal = Util.colanSeperatedString(personalDetails);
		Admission admission = null;
		EnquiryController eqcontroller = null;
		AdmissionController controller = null;
		AcademicYearController acadcontroller = null;
		AttendanceController studcontroller = null;
		String branch=personal[17];
		try {
			admission = new Admission();
			//admission.setId(Integer.parseInt(name[0]));
			admission.setStudent_name(personal[15]);
			admission.setFname(personal[0]);
			admission.setLname(personal[1]);
			admission.setMname(personal[2]);
			admission.setUid(personal[3]);
			admission.setDob(personal[4]);
			admission.setGender(personal[5]);
			admission.setCaste(personal[6]);
			admission.setCategory(personal[7]);
			admission.setLanguage(personal[8]);
			admission.setContact(personal[16]);
			admission.setFather_cont(personal[9]);
			admission.setMother_cont(personal[10]);
			admission.setAddress(personal[11]);
			admission.setPin(personal[12]);
			admission.setEmail(personal[13]);
			admission.setW_app_no(personal[14]);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setDivision(division);
			admission.setAdm_fees_pack(f_pack[0]);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);
			admission.setEnq_no(Integer.parseInt(personal[18]));
			admission.setBranch(branch);
			String standard=getStandard(f_pack[0], branch);
			String[] hyphenSeperatedStd=Util.hyphenSeperatedString(standard);
			int i=hyphenSeperatedStd.length-1;
			admission.setStandard(hyphenSeperatedStd[i]);
			admission.setFeesDetails(feestypeDetails);

			String[] symbolSeperated = Util.symbolSeperatedString(newAmt);

			admission.setDisccount(Integer.parseInt(symbolSeperated[0]));
			admission.setFees(Integer.parseInt(symbolSeperated[1]));

			String[] commaSeperatedInstallment = Util.commaSeperatedString(installment);
			if (commaSeperatedInstallment.length > 1) {
				saveInstallment(commaSeperatedInstallment, branch,admission);
			}
			controller = new AdmissionController();
			controller.StudentAdmission(admission);

			studcontroller=new AttendanceController();
			studcontroller.addNewAttendanceColumn(Rollno);
			
			acadcontroller = new AcademicYearController();
			acadcontroller.updateAcademicDetails(Rollno, invoice_no, regno, acad_year, branch);

			eqcontroller = new EnquiryController();
			eqcontroller.Admission(Long.parseLong(name[0].trim()));

			return Util.generateResponse(Status.ACCEPTED, "Student Successfully Admitted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to completed the process.Please try again or contact with Administrator").build();
	}

	private String getStandard(String fees_pack, String branch) {
		FeesPackage pack = new FeesPackage();
		FeesPackageController controller = new FeesPackageController();
		pack = controller.getFeesPackage(fees_pack, branch);
		return pack.getStandard();
	}

	private void saveInstallment(String[] commaSeperated, String branch,Admission admission) {
		ArrayList<String> installDate = new ArrayList<>();
		ArrayList<String> fees_title = new ArrayList<>();
		ArrayList<Integer> amt = new ArrayList<>();
		String stud_name;
		for (int i = 1; i < commaSeperated.length; i++) {
			String a = commaSeperated[i];
			String[] symbolSeperated = Util.symbolSeperatedString(a);
			installDate.add(symbolSeperated[0]);
			fees_title.add(symbolSeperated[1]);
			amt.add(Integer.parseInt(symbolSeperated[2]));
		}
		AdmissionController controller = null;
		Installment installment = null;
		if(admission.getFname()==null && admission.getLname()==null){
			stud_name=admission.getStudent_name();
		}else{
			stud_name=admission.getStudent_name()+" "+admission.getFname()+" "+admission.getLname();
		}
		try {
			installment = new Installment();
			installment.setRollno(admission.getRollno());
			installment.setStud_name(stud_name);
			installment.setTotal_fees(admission.getFees());
			installment.setMonthly_pay(amt);
			installment.setDue_date(installDate);
			installment.setFees_title(fees_title);
			controller = new AdmissionController();
			controller.saveInstallment(installment, branch);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private void savePromoteInstallment(String[] commaSeperated, String branch,Admission admission) {
		ArrayList<String> installDate = new ArrayList<>();
		ArrayList<String> fees_title = new ArrayList<>();
		ArrayList<Integer> amt = new ArrayList<>();
		for (int i = 1; i < commaSeperated.length; i++) {
			String a = commaSeperated[i];
			String[] symbolSeperated = Util.symbolSeperatedString(a);
			installDate.add(symbolSeperated[0]);
			fees_title.add(symbolSeperated[1]);
			int newamt=Integer.parseInt(symbolSeperated[2])-Integer.parseInt(symbolSeperated[3]);
			amt.add(newamt);
		}
		AdmissionController controller = null;
		Installment installment = null;
		String stud_name=admission.getStudent_name()+" "+admission.getFname()+" "+admission.getLname();
		try {
			installment = new Installment();
			installment.setRollno(admission.getRollno());
			installment.setStud_name(stud_name);
			installment.setTotal_fees(admission.getFees());
			installment.setMonthly_pay(amt);
			installment.setDue_date(installDate);
			installment.setFees_title(fees_title);
			controller = new AdmissionController();
			controller.saveInstallment(installment, branch);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Path("/SearchStudent")
	@GET
	@JWTTokenNeeded
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchStudent(@QueryParam("id") String enq_stud, @QueryParam("branch") String branch) {
		Enquiry enquiry = new Enquiry();
		AdmissionController controller = new AdmissionController();
		FeesPackage pack = new FeesPackage();
		FeesPackageController feescontroller = new FeesPackageController();
		try{
		enquiry = controller.searchStudent(enq_stud, branch);
		String[] packname = Util.symbolSeperatedString(enquiry.getFees_pack());
		pack = feescontroller.getFeesPackage(packname[0], branch);
		enquiry.setFeesPack(pack);
		if (enquiry != null) {
			return Response.status(Status.ACCEPTED).entity(enquiry).build();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to get student data.").build();
	}

	@PermitAll
	@GET
	@JWTTokenNeeded
	@Path("/FetchAllAdmittedStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchAllAdmittedStudent(@QueryParam("branch") String branch) {
		ArrayList<Admission> admission = null;
		AdmissionController controller = null;
		try {
			admission = new ArrayList<>();
			controller = new AdmissionController();
			controller.fetchAllAdmittedStudent(admission, branch);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@GET
	@JWTTokenNeeded
	@Path("/getAutoIncrementedDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAutoIncrementedDetails(@QueryParam("branch") String branch) {

		try {
			AcademicYear acad = new AcademicYear();
			AcademicYearController controller = new AcademicYearController();
			acad = controller.getCurrentAcademicYear(branch);
			return Response.status(Status.ACCEPTED).entity(acad).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Unable to get academic year details.").build();
	}

	@Path("/getPromotionData")
	@POST
	@JWTTokenNeeded
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getPromotionData(@FormParam("acad_year") String acad_year, @FormParam("standard") String standard,
			@FormParam("division") String division, @FormParam("selectedStatus") String status,
			@FormParam("branch") String branch) {
		Admission admission = new Admission();
		ArrayList<Admission> promotion = new ArrayList<>();
		AdmissionController controller = new AdmissionController();
		admission.setAcad_year(acad_year);
		admission.setStandard(standard);
		admission.setDivision(division);
		admission.setStatus(status);
		admission.setBranch(branch);
		promotion = controller.getPromotionData(admission);
		if (promotion != null) {
			return Response.status(Status.ACCEPTED).entity(promotion).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@Path("/StudentPromotion")
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response StudentPromotion(@FormParam("fees") String fees, @FormParam("student_status") String status,
			@FormParam("acad_year") String acad_year, @FormParam("division") String division,
			@FormParam("admission_date") String admission_date, @FormParam("id") String id,
			@FormParam("user") String enq_taken, @FormParam("branch") String branch) {
		Admission enq = new Admission();
		AdmissionController admController=new AdmissionController();
		AdmissionDAO dao = new AdmissionDAO();
		
		AcademicYear year = new AcademicYear();
		AcademicYearController yearController = new AcademicYearController();
		
		FeesPackage pack = new FeesPackage();
		FeesPackageController controller = new FeesPackageController();
		try {
			
		String[] commaSeperatedId = Util.commaSeperatedString(id);
		for (int i = 0; i < commaSeperatedId.length; i++) {
			String[] symbolSeperatedFees = Util.symbolSeperatedString(fees);
			pack = controller.getFeesPackage(symbolSeperatedFees[0], branch);
			String feesdetails = pack.getFees_details();
			enq = dao.searchStudentFromAdmission(commaSeperatedId[i], branch);
			
			String personalDetails = enq.getFname() + ":" + enq.getLname() + ":" + enq.getMname() + ":" + enq.getUid()
					+ ":" + enq.getDob() + ":" + enq.getGender() + ":" + enq.getCaste() + ":" + enq.getCategory() + ":"
					+ enq.getLanguage() + ":" + enq.getFather_cont() + ":" + enq.getMother_cont() + ":"
					+ enq.getAddress() + ":" + enq.getPin() + ":" + enq.getEmail() + ":" + enq.getW_app_no() + ":"
					+ enq.getStudent_name() + ":" + enq.getContact()+ ":" + enq.getBranch()+ ":" + enq.getEnq_no();
			
			String stud_details = enq.getId() + "|" + enq.getStudent_name() + " " + enq.getFname() + " "
					+ enq.getLname() + "|" + enq.getContact() + "|" + enq.getStatus();
			
			year = yearController.getCurrentAcademicYear(branch);
			String studId = year.getId_prefix() + "-" + year.getId_no();
			String regno = year.getReg_prefix() + "-" + year.getRegistration();
			String invoice = year.getInvoice_prefix() + "-" + year.getInvoice();
			yearController.updateAcademicDetails(studId, invoice, regno, acad_year, branch);
			
			admController.updateOldAdmissionStatus(commaSeperatedId[i],branch);
			
			String installment = "installment details";
			int disc = 0;
			String[] commaSeperatedFeesDetails = Util.commaSeperatedString(feesdetails);
			for (int j = 0; j < commaSeperatedFeesDetails.length; j++) {
				String[] getdiscount = Util.symbolSeperatedString(commaSeperatedFeesDetails[j]);
				disc = disc + Integer.parseInt(getdiscount[2]);
			}
			String newamt = disc + "|" + symbolSeperatedFees[1];
			
			StudentAdmission(stud_details, enq_taken, fees, division, status, admission_date, studId, regno, invoice,
					admission_date, acad_year, admission_date, personalDetails, feesdetails, installment, newamt);
			}
			return Util.generateResponse(Status.ACCEPTED, "Student Successfully Promoted.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@GET
	@Path("/getAdmissionDetailsOfSpecificStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAdmissionDetailsOfSpecificStudent(@QueryParam("id") String id,
			@QueryParam("branch") String branch) {
		Admission admission = new Admission();
		AdmissionController controller = new AdmissionController();
		try {
			admission = controller.searchStudentFromAdmission(id, branch);
			if(admission!=null){
			Installment installment = controller.getInstallment(admission.getRollno(), branch);
				if(installment!=null){
					admission.setInstallment(installment);
				}
				return Response.status(Status.ACCEPTED).entity(admission).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@POST
	@JWTTokenNeeded
	@Path("/AdmissionReport")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response AdmissionReport(@FormParam("from_date") String from_date, @FormParam("to_date") String to_date,
			@FormParam("adm_taken_by_array") String adm_taken_by, @FormParam("package_array") String fees_package,
			@FormParam("division_array") String division, @FormParam("acad_year") String acad_year,
			@FormParam("standard_array") String standard, @FormParam("branch") String branch) {
		String[] commaSeperatedTaken = Util.commaSeperatedString(adm_taken_by);
		String[] commaSeperatedPackage = Util.commaSeperatedString(fees_package);
		String[] commaSeperatedStandard = Util.commaSeperatedString(standard);
		String[] commaSeperatedDivision = Util.commaSeperatedString(division);
		AdmissionController controller = new AdmissionController();
		ArrayList<Admission> admissionReportData=new ArrayList<>();
		try {
			for(int i=0;i<commaSeperatedTaken.length;i++){
				for(int j=0;j<commaSeperatedPackage.length;j++){
					for(int k=0;k<commaSeperatedStandard.length;k++){
						for(int l=0;l<commaSeperatedDivision.length;l++){
							String[] symbolSeperated=Util.symbolSeperatedString(commaSeperatedPackage[j]);
							Admission admission=new Admission();
							admission.setEnq_taken_by(commaSeperatedTaken[i]);
							admission.setAdm_fees_pack(symbolSeperated[0]);
							admission.setStandard(commaSeperatedStandard[k]);
							admission.setDivision(commaSeperatedDivision[l]);
							admission.setFrom_date(from_date);
							admission.setTo_date(to_date);
							admission.setAcad_year(acad_year);
							admission.setBranch(branch);
							admissionReportData=controller.AdmissionReport(admission,admissionReportData);
						}
					}
				}
			}
			if(admissionReportData!=null){
				return Response.status(Status.ACCEPTED).entity(admissionReportData).build();	
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	@PermitAll
	@POST
	@JWTTokenNeeded
	@Path("/EditStudentAdmission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditStudentAdmission(@FormParam("enq_taken_by") String enq_taken_by, 
			@FormParam("division") String division, @FormParam("status") String status, @FormParam("date") String date,
			@FormParam("Rollno") String Rollno, @FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no,@FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year, @FormParam("join_date") String join_date,
			@FormParam("branch") String branch,@FormParam("installment") String installment,
			@FormParam("originalInstallment") String originalInstall,@FormParam("newAmt") String newAmt,
			@FormParam("stud_details") String student_name) {
		Admission admission = null;
		AdmissionController controller = null;
		String[] name = Util.symbolSeperatedString(student_name);
		String[] symbolSeperated = Util.symbolSeperatedString(newAmt);
		
		try {
			admission = new Admission();
			admission.setStudent_name(name[1]);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setDivision(division);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);
			admission.setFees(Integer.parseInt(symbolSeperated[1]));
			admission.setBranch(branch);
			if(Integer.parseInt(originalInstall)==0){
				String[] commaSeperatedInstallment = Util.commaSeperatedString(installment);
				if (commaSeperatedInstallment.length > 1) {
					saveInstallment(commaSeperatedInstallment, branch,admission);
				}
			}
			controller = new AdmissionController();
			controller.EditStudentAdmission(admission);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Edited").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to completed the process.").build();
	}
	@PermitAll
	@POST
	@JWTTokenNeeded
	@Path("/PromoteStudent")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response PromoteStudent(@FormParam("stud_details") String student_name,
			@FormParam("enq_taken_by") String enq_taken_by, @FormParam("adm_fees_pack") String adm_fees_pack,
			@FormParam("division") String division, @FormParam("status") String status, @FormParam("date") String date,
			@FormParam("Rollno") String Rollno, @FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no, @FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year, @FormParam("join_date") String join_date,
			@FormParam("personalDetails") String personalDetails, 
			@FormParam("installment") String installment) {
		String[] colanSeperatedPersonalDetails=Util.colanSeperatedString(personalDetails);
		String[] pipeSeperatedFeesPack=Util.symbolSeperatedString(adm_fees_pack);
		Admission admission = null;
		AdmissionController controller = null;
		AcademicYearController acadcontroller = null;
		AttendanceController studcontroller = null;
		try {
			admission = new Admission();
			 admission.setStudent_name(colanSeperatedPersonalDetails[1]);
			admission.setLname(colanSeperatedPersonalDetails[2]);
			admission.setFname(colanSeperatedPersonalDetails[3]);
			admission.setMname(colanSeperatedPersonalDetails[4]);
			admission.setUid(colanSeperatedPersonalDetails[5]);
			admission.setDob(colanSeperatedPersonalDetails[6]);
			admission.setGender(colanSeperatedPersonalDetails[7]);
			admission.setCaste(colanSeperatedPersonalDetails[8]);
			admission.setCategory(colanSeperatedPersonalDetails[9]);
			admission.setLanguage(colanSeperatedPersonalDetails[10]);
			admission.setContact(colanSeperatedPersonalDetails[11]);
			admission.setFather_cont(colanSeperatedPersonalDetails[12]);
			admission.setMother_cont(colanSeperatedPersonalDetails[13]);
			admission.setAddress(colanSeperatedPersonalDetails[14]) ;
			admission.setPin(colanSeperatedPersonalDetails[15]);
			admission.setEmail(colanSeperatedPersonalDetails[16]);
			admission.setW_app_no(colanSeperatedPersonalDetails[17]);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setAdm_fees_pack(pipeSeperatedFeesPack[0]);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setDivision(division);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);
			admission.setFees(Integer.parseInt(colanSeperatedPersonalDetails[28].trim()));
			/*String[] hyphenSeperatedFeesDetails=Util.hyphenSeperatedString(colanSeperatedPersonalDetails[27]);*/
			admission.setFeesDetails(colanSeperatedPersonalDetails[38]);
			admission.setDisccount(Integer.parseInt(colanSeperatedPersonalDetails[30].trim()));
			admission.setPaid_fees(Integer.parseInt(colanSeperatedPersonalDetails[31].trim()));
			admission.setRemain_fees(Integer.parseInt(colanSeperatedPersonalDetails[32].trim()));
			admission.setBranch(colanSeperatedPersonalDetails[33]);
			admission.setEnq_no(Integer.parseInt(colanSeperatedPersonalDetails[29].trim()));
			
			String standard=getStandard(pipeSeperatedFeesPack[0], colanSeperatedPersonalDetails[33]);
			String currentStandard=colanSeperatedPersonalDetails[22];
			String[] hyphenSepereatedStandard=Util.hyphenSeperatedString(standard);
			if(hyphenSepereatedStandard.length>1){
			for(int i=0;i<hyphenSepereatedStandard.length;i++){
				if(hyphenSepereatedStandard[i].matches(currentStandard)){
					admission.setStandard(hyphenSepereatedStandard[i-1]);
					}
				}
			}else{
				admission.setStandard(hyphenSepereatedStandard[0]);
			}
			String[] commaSeperatedInstallment = Util.commaSeperatedString(installment);
			if (commaSeperatedInstallment.length > 1) {
				savePromoteInstallment(commaSeperatedInstallment, colanSeperatedPersonalDetails[33],admission);
			}
			
			controller = new AdmissionController();
			controller.PromoteStudentFromAdmission(admission);
			
			controller.updateOldAdmissionStatus(colanSeperatedPersonalDetails[0].trim(), colanSeperatedPersonalDetails[33]);
			
			studcontroller=new AttendanceController();
			studcontroller.addNewAttendanceColumn(Rollno);
			
			acadcontroller = new AcademicYearController();
			acadcontroller.updateAcademicDetails(Rollno, invoice_no, regno, acad_year, colanSeperatedPersonalDetails[33]);
			
			return Util.generateResponse(Status.ACCEPTED, "Student Successfully Promoted.").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to completed the process.").build();
	}

}
