package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.TimeTableDAO;

import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.model.Employee;
public class TimeTableController{
	
	public TimeTable addTimeTable(TimeTable tt) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.addTimeTable(tt);
	}
	public ArrayList<TimeTable> FetchTimeTable(String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.FetchTimeTable(branch);
	}
	public ArrayList<String> FetchLecturer(String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.FetchLecturer(branch);
	}
	public TimeTable InsertTimeSlot(TimeTable ts) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.InsertTimeSlot(ts);
	}
	public ArrayList<String> loadTime(String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.loadTime(branch);
	}
	public ArrayList<TimeTable> getSpecificTimeTable(String created_date, String title, String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.getSpecificTimeTable(created_date,title,branch);
	}
	public void EditTimeTable(String old_title,String created_date,String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		dao.DeleteTimeTable(old_title,created_date,branch);
	}
	public void deleteTimeTable(String title,String created_date,String branch) {
		TimeTableDAO dao=new TimeTableDAO();
		dao.DeleteTimeTable(title,created_date,branch);
	}
	public ArrayList<TimeTable> TimeTableReport(TimeTable tt, ArrayList<TimeTable> time_table) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.TimeTableReport(tt,time_table);
	}
}