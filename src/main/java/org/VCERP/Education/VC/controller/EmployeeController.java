package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeDAO;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;

public class EmployeeController {

	public Employee addEmployee(Employee emp) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.addEmployee(emp);
	}

	public ArrayList<Employee> FetchAllEmployee(String branch) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.FetchAllEmployee(branch);
	}

	public ArrayList<Employee> FetchEmployeeReport(Employee employee, ArrayList<Employee> emp) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.FetchEmployeeReport(employee,emp);
	}

	public Employee getSepecificEmployeeDetails(Long id) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.getSepecificEmployeeDetails(id);
	}

	public void EditEmployee(Employee emp) {
		EmployeeDAO dao=new EmployeeDAO();
		dao.EditEmployee(emp);
	}

	public void deleteEmployee(String id) {
		EmployeeDAO dao=new EmployeeDAO();
		dao.deleteEmployee(id);
	}
}
