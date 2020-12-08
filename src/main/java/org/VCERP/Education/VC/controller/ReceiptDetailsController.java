package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.dao.ReceiptDetailsDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class ReceiptDetailsController {

	public void StudentDetails(ReceiptDetails receipt) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		dao.StudentDetails(receipt);
	}
	
	public ReceiptDetails ReceiptDetailsForm(ReceiptDetails details) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptDetailsForm(details);	
	}

	public Admission searchStudent(String enq_stud, String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.searchStudent(enq_stud,branch);
	}

	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.FetchAllReceiptDetails(branch);
		
	}

	public ReceiptDetails updateRemainingAmount(String id, String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.updateRemainingAmount(id,branch);
		
	}

	public long calculateTotalFeesPaid(String rollno, String name, String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.calculateTotalFeesPaid(rollno,name,branch);
	}

	public ArrayList<ReceiptDetails> getReceiptAdmissionData(String rollno, String receiptno) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.getReceiptAdmissionData(rollno,receiptno);
	}
	
	public ArrayList<ReceiptDetails> getStudReceiptList(String rno,String branch){
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.getStudReceiptList(rno,branch);
	}

	public void updateInstallment(String rollno, String due_date, String branch, long received_amt, long due_amt,String receiptno) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		dao.updateInstallment(rollno,due_date,branch,received_amt,due_amt,receiptno);
	}

	public ArrayList<ReceiptDetails> ReceiptReport(ReceiptDetails receipt, Admission admission,ArrayList<ReceiptDetails> receiptReportData) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptReport(receipt,admission,receiptReportData);
	}

	public ArrayList<Admission> InstallmentDueReport(Installment installment, Admission admission,
			ArrayList<Admission> installReportData) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.InstallmentDueReport(installment,admission,installReportData);
	}

	public String ReceiptIncrementedNumber() {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptIncrementedNumber();
	}

	public Installment getInstallmentForViewReceipt(String rno, String receiptno) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.getInstallmentForViewReceipt(rno,receiptno);
	}

	public void revertInstallment(String receiptDetails,String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		dao.getAllInstallment(receiptDetails,branch);
	}

}
