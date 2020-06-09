package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Attendance;

public class AttendanceController {

	public ArrayList<Attendance> getAttendanceList(Attendance attendance) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.getAttendanceList(attendance);
	}

	public void studentAttendance(String standard,String division, String acad_year,  String branch, ArrayList<String> rollno,
			ArrayList<String> attend) {
		AttendanceDAO dao=new AttendanceDAO();
		dao.studentAttendance(standard,division,acad_year,branch,rollno,attend);
		
	}

	public Attendance getAttendanceStat(Attendance attendance) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.getAttendanceStat(attendance);
	}

	public ArrayList<Attendance> studentAttendanceReport(Attendance attend) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.studentAttendanceReport(attend);
	}

}
