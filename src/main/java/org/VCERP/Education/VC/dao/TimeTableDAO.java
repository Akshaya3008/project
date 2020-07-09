package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;


import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class TimeTableDAO{
	private static final Logger logger = LogManager.getLogger(TimeTableDAO.class.getName());
	public TimeTable addTimeTable(TimeTable tt){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into time_table(`tt_title`,`aca_year`,`divi`,`subject`,`standard`,`lecturer`"
				+ ",`day`,`time`,`status`,`created_date`,`branch`)values(?,?,?,?,?,?,?,?,?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, tt.getTitle());
		ps.setString(2, tt.getAca_year());
		ps.setString(3, tt.getDivision());
		ps.setString(4, tt.getSubject());
		ps.setString(5, tt.getStd());
		ps.setString(6,tt.getLecturer());
		ps.setString(7, tt.getDay());
		ps.setString(8, tt.getTime_slot());
		ps.setString(9,tt.getStatus());
		ps.setString(10, Util.currentDate());
		ps.setString(11,tt.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return tt;
	}
	
	public ArrayList<TimeTable> FetchTimeTable(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<TimeTable> tt=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select DISTINCT `tt_title`,`created_date` from time_table where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				TimeTable ttable=new TimeTable();
				ttable.setTitle(rs.getString(1));
				ttable.setCreated_date(rs.getString(2));
				tt.add(ttable);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return tt;
	}
	public ArrayList<String> FetchLecturer(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<String> emp_des=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `emp_name` from employee where design=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, "lecturer");
			st.setString(2, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				emp_des.add(rs.getString(1));
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return emp_des;
	}
	public TimeTable InsertTimeSlot(TimeTable ts){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into time_slot(`slot`,`branch`)values(?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, ts.getTime_slot());
		ps.setString(2, ts.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return ts;
	}
	
	public ArrayList<String> loadTime(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<String> ts=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from time_slot where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				ts.add(rs.getString(2));
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return ts;
	}

	public ArrayList<TimeTable> getSpecificTimeTable(String created_date, String title, String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<TimeTable> tt=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select  `aca_year`,`standard`,`subject`,`divi`,`tt_title`,`day`,`time`,`lecturer`,`status`,`created_date` "
					+ "from time_table where created_date=? and tt_title=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, created_date);
			st.setString(2, title);
			st.setString(3, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				TimeTable ttable=new TimeTable();
				ttable.setAca_year(rs.getString(1));
				ttable.setStd(rs.getString(2));
				ttable.setSubject(rs.getString(3));
				ttable.setDivision(rs.getString(4));
				ttable.setTitle(rs.getString(5));
				ttable.setDay(rs.getString(6));
				ttable.setTime_slot(rs.getString(7));
				ttable.setLecturer(rs.getString(8));
				ttable.setStatus(rs.getString(9));
				ttable.setCreated_date(rs.getString(10));
				if(ttable!=null){
					tt.add(ttable);	
				}
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return tt;
	}

	public void DeleteTimeTable(TimeTable tt) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="delete from time_table where tt_title=? and created_date=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, tt.getTitle());
			st.setString(2, tt.getCreated_date());
			st.setString(3, tt.getBranch());
			st.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(null, st, con);
		}
	}

	public ArrayList<TimeTable> TimeTableReport(TimeTable tt, ArrayList<TimeTable> time_table) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		String query="";
		try {
			con=Util.getDBConnection();
			if(tt.getLecturer().isEmpty()){
			query="select time,day,lecturer,standard,divi,subject from time_table WHERE tt_title=? AND branch=?";
			}else{
			query="select time,day,lecturer,standard,divi,subject from time_table WHERE tt_title=? AND lecturer='"+tt.getLecturer()+"' AND branch=?";
			}
			st=con.prepareStatement(query);
			st.setString(1, tt.getTitle());
			st.setString(2, tt.getBranch());
			rs=st.executeQuery();
			while(rs.next())
			{
				TimeTable ttable=new TimeTable();
				ttable.setTime_slot(rs.getString(1));
				ttable.setDay(rs.getString(2));
				ttable.setLecturer(rs.getString(3));
				ttable.setStd(rs.getString(4));
				ttable.setDivision(rs.getString(5));
				ttable.setSubject(rs.getString(6));
				if(ttable!=null){
					time_table.add(ttable);	
				}
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return time_table;

	}

	
}