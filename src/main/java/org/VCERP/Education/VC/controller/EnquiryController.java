package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EnquiryDAO;
import org.VCERP.Education.VC.model.Enquiry;

public class EnquiryController {

	public Enquiry EnquiryData(Enquiry enquiry) {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.EnquiryData(enquiry);		
	}

	public ArrayList<Enquiry> FetchAllEnquiryData() {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.FetchAllEnquiryData();
	}

	 public void DeleteEnquiryData(String id) {
		  EnquiryDAO dao=new EnquiryDAO();
		  dao.DeleteEnquiryData(id);
	}

	public void DeleteMultipleEnquiryData(Long id) {
		EnquiryDAO dao=new EnquiryDAO();
		dao.DeleteMultipleEnquiryData(id);
	}

	public void Admission(Long id) {
		EnquiryDAO dao=new EnquiryDAO();
		dao.Admission(id);	
	}

}
