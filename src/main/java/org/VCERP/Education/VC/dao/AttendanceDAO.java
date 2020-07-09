package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class AttendanceDAO {
	private static final Logger logger = LogManager.getLogger(AttendanceDAO.class.getName());
	public ArrayList<Attendance> getAttendanceList(Attendance at) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<Attendance> attendance=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,Rollno,student_name,fname,lname from admission where standard=? and division=? and acad_year=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, at.getStandard());
			ps.setString(2, at.getDivision());
			ps.setString(3, at.getAcad_year());
			ps.setString(4, at.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				at=new Attendance();
				at.setId(rs.getLong(1));
				at.setRollNo(rs.getString(2));
				at.setName(rs.getString(3)+" "+rs.getString(4)+" "+rs.getString(5));
				at.setCurrentDate(Util.currentDate());
				attendance.add(at);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return attendance;
	}

	public void studentAttendance(String standard,String division, String acad_year, String branch, ArrayList<String> rollno,
			ArrayList<String> attend) {
		Connection con=null;
		PreparedStatement ps=null;
		int index=0;
		String createColumnName="";/*"`"+rollno.indexOf(0)+"`";*/
		String createParameterList="?"; 
		try {
		con=Util.getDBConnection();
		for (int i=0;i<rollno.size();i++)
		{
		createColumnName+=",`"+rollno.get(i)+"`";
		createParameterList+=",?";
		}
		String query="insert into attendance(`date`,`acad_year`,`standard`,`division`"+createColumnName+",`branch`) values(?,?,?,"+createParameterList+",?)";
		ps=con.prepareStatement(query);
		ps.setString(index+=1, Util.currentDate());
		ps.setString(index+=1, acad_year);
		ps.setString(index+=1, standard);
		ps.setString(index+=1, division);
		for (int i=0;i<attend.size();i++)
		{
		ps.setString(index+=1, attend.get(i));
		}
		ps.setString(index+=1, branch);
		ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	public Attendance getAttendanceStat(Attendance attendance) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		PreparedStatement ps1=null;
		ResultSet rs1=null;
		try {
			con=Util.getDBConnection();
			String query="SELECT COUNT(`"+attendance.getRollNo()+"`) as totalCount FROM `attendance` where date BETWEEN ? AND ? AND acad_year=? and "
					+ "standard=? and division=? AND branch=? ";
			ps=con.prepareStatement(query);
			ps.setString(1, attendance.getFrom_date());
			ps.setString(2, attendance.getTo_date());
			ps.setString(3, attendance.getAcad_year());
			ps.setString(4, attendance.getStandard());
			ps.setString(5, attendance.getDivision());
			ps.setString(6, attendance.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				attendance.setTotalDays(rs.getInt("totalCount"));
			}
			
			String query2="SELECT COUNT(`"+attendance.getRollNo()+"`) as totalPresent FROM `attendance` where `"+attendance.getRollNo()+"`='P' "
					+ "AND `date` BETWEEN ? AND ? AND acad_year=? and "
					+ "standard=? and division=? AND `branch`=?";
			ps1=con.prepareStatement(query2);
			ps1.setString(1, attendance.getFrom_date());
			ps1.setString(2, attendance.getTo_date());
			ps1.setString(3, attendance.getAcad_year());
			ps1.setString(4, attendance.getStandard());
			ps1.setString(5, attendance.getDivision());
			ps1.setString(6, attendance.getBranch());
			rs1=ps1.executeQuery();
			while(rs1.next()){
			attendance.setTotalPresent(rs1.getInt("totalPresent"));
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return attendance;

	}

	public ArrayList<Attendance> studentAttendanceReport(Attendance attend) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		String rollno=attend.getRollNo();
		ArrayList<Attendance> attendance=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="SELECT `"+rollno+"`,`date` FROM `attendance` WHERE date BETWEEN ? AND ? AND `acad_year`=? and "
					+ "`standard`=? and `division`=? AND `branch`=? AND `"+rollno+"`='P'  OR `"+rollno+"`='A'";
			ps=con.prepareStatement(query);
			ps.setString(1, attend.getFrom_date());
			ps.setString(2, attend.getTo_date());
			ps.setString(3, attend.getAcad_year());
			ps.setString(4, attend.getStandard());	
			ps.setString(5, attend.getDivision());
			ps.setString(6, attend.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				attend=new Attendance();
				attend.setAttendance(rs.getString(1));
				attend.setCurrentDate(rs.getString(2));
				attendance.add(attend);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return attendance;

	}

	public void checkRollNoColumnExist(String rollno) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int count=0;
		String[] hyphenSeperated=Util.hyphenSeperatedString(rollno);
		try {
			con=Util.getDBConnection();
			String query="SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'attendance'";
			ps=con.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				count=rs.getInt(1);
			}
			
			count=count-6;
			if(Integer.parseInt(hyphenSeperated[1])>count){
				createAttendanceColumn(Integer.parseInt(hyphenSeperated[1]));
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
	}

	private void createAttendanceColumn(int rollno) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="ALTER TABLE `attendance`  ADD `"+rollno+"` VARCHAR(20) NULL ";
			ps=con.prepareStatement(query);
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

}
