package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class AdmissionController {

	public Admission StudentAdmission(Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.StudentAdmission(admission);
	}
	public ArrayList<Admission> fetchAllAdmittedStudent(ArrayList<Admission> admission, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.fetchAllAdmittedStudent(admission,branch);
	}

	public Enquiry searchStudent(String enq_stud,String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.searchStudent(enq_stud,branch);
		
	}
	public void updateTotalFeesPaid(String rollno, long fees_paid, long fees_remain, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.updateTotalFeesPaid(rollno,fees_paid,fees_remain,branch);
	}
	public Installment saveInstallment(Installment installment, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.saveInstallment(installment,branch);
	}
	public Admission searchStudentFromAdmission(String enq_stud, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.searchStudentFromAdmission(enq_stud,branch);
	}
	
	public ArrayList<Admission> getPromotionData(Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.getPromotionData(admission);
	}
	public Installment getInstallment(String rollno, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.getInstallment(rollno,branch);
	}
	public ArrayList<Admission> AdmissionReport(Admission admission, ArrayList<Admission> admissionReportData) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.AdmissionReport(admission,admissionReportData);
	}
	public void updateOldAdmissionStatus(String id, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.updateOldAdmissionStatus(id,branch);
	}
	public void EditStudentAdmission(Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.EditStudentAdmission(admission);
	}
	public void PromoteStudentFromAdmission(Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.PromoteStudentFromAdmission(admission);
	}
	public void revertAdmissionPayment(String receiptDetails, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.revertAdmissionPayment(receiptDetails,branch);
	}
	public void EditStudentInstallment(String[] commaSeperatedInstallment, Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.EditStudentInstallment(commaSeperatedInstallment,admission);
	}
}
