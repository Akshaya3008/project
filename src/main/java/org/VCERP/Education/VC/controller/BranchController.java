package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.BranchDAO;
import org.VCERP.Education.VC.model.Branch;

public class BranchController {

	public void addNewBranch(Branch branch) {
		BranchDAO dao=new BranchDAO();
		dao.addNewBranch(branch);
	}

	public Branch getBranchDetails(String input) {
		BranchDAO dao=new BranchDAO();
		return dao.getBranchDetails(input);
	}

	public ArrayList<Branch> getAllBranchDetails() {
		BranchDAO dao=new BranchDAO();
		return dao.getAllBranchDetails();
	}

	public void editBranch(Branch branch) {
		BranchDAO dao=new BranchDAO();
		dao.editBranch(branch);
	}

	public void editFromAllTable(String oldBranchName, String newBranchName) {
		BranchDAO dao=new BranchDAO();
		dao.editFromAllTable(oldBranchName,newBranchName);		
	}

}
