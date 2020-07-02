package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.dao.FeesPackageDAO;
import org.VCERP.Education.VC.model.FeesPackage;

public class FeesPackageController {

	public void addNewFeesPackage(FeesPackage pack) {
		FeesPackageDAO dao=new FeesPackageDAO();
		dao.addNewFeesPackage(pack);
	}

	public ArrayList<FeesPackage> getFeesPackage(String branch) {
		FeesPackageDAO dao=new FeesPackageDAO();
		return dao.getFeesPackage(branch);
	}

	public ArrayList<String> getBranchSpecificStandard(String branch) {
		FeesPackageDAO dao=new FeesPackageDAO();
		return dao.getBranchSpecificStandard(branch);
	}

	public ArrayList<String> loadBranch(String std) {
		FeesPackageDAO dao=new FeesPackageDAO();
		return dao.loadBranch(std);
	}
	public FeesPackage getFeesPackage(String fees_pack, String branch) {
		FeesPackageDAO dao=new FeesPackageDAO();
		return dao.getFeesPackage(fees_pack,branch);
	}

	public void EditFeesPackage(FeesPackage pack) {
		FeesPackageDAO dao=new FeesPackageDAO();
		dao.EditFeesPackage(pack);
	}

	public void deleteFeesPackage(String id) {
		FeesPackageDAO dao=new FeesPackageDAO();
		dao.deleteFeesPackage(id);
		}

}
