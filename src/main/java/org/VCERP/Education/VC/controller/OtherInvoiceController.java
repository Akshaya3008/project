package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.OtherInvoiceDao;
import org.VCERP.Education.VC.dao.ReceiptDetailsDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.OtherInvoice;
import org.VCERP.Education.VC.model.ReceiptDetails;
public class OtherInvoiceController {
	public Admission SearchStudent(String enq_stud, String branch) {
		OtherInvoiceDao dao=new OtherInvoiceDao();
		return dao.SearchStudent(enq_stud,branch);
	}
	public String InvoiceIncrementedNumber() {
		OtherInvoiceDao dao=new OtherInvoiceDao();
		return dao.InvoiceIncrementedNumber();
	}
	
	public OtherInvoice OtherInvoiceForm(OtherInvoice details) {
		OtherInvoiceDao dao=new OtherInvoiceDao();
		return dao.OtherInvoiceForm(details);	
	}
	
	public ArrayList<OtherInvoice> FetchAllInvoiceDetails(String branch) {
		OtherInvoiceDao dao=new OtherInvoiceDao();
		return dao.FetchAllInvoiceDetails(branch);
	}
	public void deleteInv(String invoiceDetails,String branch) {
		OtherInvoiceDao dao=new OtherInvoiceDao();
		dao.deleteInv(invoiceDetails,branch);
	}
}