package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeDAO;
import org.VCERP.Education.VC.dao.UserDAO;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.model.LoginHistory;

public class UserController {

	public User authenticateUser(String userid, String password) {
		UserDAO dao=new UserDAO();
		return dao.authenticateUser(userid,password);
	}
	
	public User createEmployeeAccount(User user) {
		UserDAO dao=new UserDAO();
		return dao.createEmployeeAccount(user);
	}

	public ArrayList<User> getAllAccount(String branch) {
		UserDAO dao=new UserDAO();
		return dao.getAllAccount(branch);
	}

	public void createLoginHistory(LoginHistory history){
		UserDAO dao = new UserDAO();
		dao.createLoginHistory(history);
		
	}
	public ArrayList<LoginHistory> getLoginHistoryList() {
		UserDAO dao=new UserDAO();
		return dao.getLoginHistoryList();
	}

	public void EditEmployeeAccount(User user) {
		UserDAO dao=new UserDAO();
		dao.EditEmployeeAccount(user);
	}

	public void DeactivateEmployeeAccount(Long id) {
		UserDAO dao=new UserDAO();
		dao.DeactivateEmployeeAccount(id);
	}

	public boolean checkAccountExist(User user) {
		UserDAO dao=new UserDAO();
		return dao.checkAccountExist(user);
	}

	public boolean checkUsernameExist(User user) {
		UserDAO dao=new UserDAO();
		return dao.checkUsernameExist(user);
	}

	public ArrayList<User> getAllRole(String branch) {
		UserDAO dao=new UserDAO();
		return dao.getAllRole(branch);
	}

	public ArrayList<Integer> getEmployeeStat(String username, String branch) {
		UserDAO dao=new UserDAO();
		return dao.getEmployeeStat(username,branch);
	}
}
