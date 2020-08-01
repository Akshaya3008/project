package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeAttendanceDAO;
//import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Employee;

public class EmployeeAttendanceController{

	public ArrayList<Employee> getEmpAttendanceList(String branch) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmployeeAttendanceList(branch);
	}

	public void employeeAttendance(ArrayList<String> empcode, ArrayList<String> intime, ArrayList<String> outtime,
			ArrayList<String> attend,String branch, String attendanceDate) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		dao.employeeAttendance(empcode,intime,outtime,attend,attendanceDate,branch);
	}

	public Employee getEmpAttendanceStat(Employee emp) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmpAttendanceStat(emp);
	}

	public ArrayList<Employee> getEmpAttendanceReport(Employee emp) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmpAttendanceReport(emp);
	}

	public ArrayList<String> checkForAttendanceMark(String date, String branch) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.checkForAttendanceMark(date,branch);
	}

}