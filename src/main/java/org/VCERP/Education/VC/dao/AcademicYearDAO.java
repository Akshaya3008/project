package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class AcademicYearDAO {
	
	private static final Logger logger = LogManager.getLogger(AcademicYearDAO.class.getName());
	public AcademicYear addAcademicYear(AcademicYear year){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "insert into academic_year_master(`aca_year`,`aca_start`,`aca_end`,`id_prefix`,`ID_Card`,"
					+ "`invoice_prefix`,`invoice`,`reg_prefix`,`reg`,`created_date`,`branch`)values(?,?,?,?,?,?,?,?,?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, year.getAca_year());
			ps.setString(2, year.getStart_date());
			ps.setString(3, year.getEnd_date());
			ps.setString(4, year.getId_prefix());
			ps.setString(5, year.getId_no());
			ps.setString(6, year.getInvoice_prefix());
			ps.setString(7, year.getInvoice());
			ps.setString(8, year.getReg_prefix());
			ps.setString(9, year.getRegistration());
			ps.setString(10, Util.currentDate());
			ps.setString(11,  year.getBranch());
			ps.executeUpdate();
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return year;
		
	}
	
	public ArrayList<AcademicYear> FetchAllAcademic(String branch){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		ArrayList<AcademicYear> academiclist = new ArrayList<>();
		try{
			con = Util.getDBConnection();
			String query = "select * from academic_year_master where branch=?";
			st = con.prepareStatement(query);
			st.setString(1, branch);
			rs = st.executeQuery();
			while(rs.next()){
				AcademicYear year = new AcademicYear();
				year.setId(rs.getLong(1));
				year.setAca_year(rs.getString(2));
				year.setStart_date(rs.getString(3));
				year.setEnd_date(rs.getString(4));
				year.setCreated_date(rs.getString(11));
				academiclist.add(year);		
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return academiclist;
	}
	
	public AcademicYear getCurrentAcademicYear(String branch){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		AcademicYear year= null;
		try{
			con = Util.getDBConnection();
			String query = "select * from academic_year_master where branch=?";
			st = con.prepareStatement(query);
			st.setString(1, branch);
			rs = st.executeQuery();
			while(rs.next()){
				year = new AcademicYear();
				year.setId(rs.getLong(1));
				year.setAca_year(rs.getString(2));
				year.setStart_date(rs.getString(3));
				year.setEnd_date(rs.getString(4));
				year.setId_prefix(rs.getString(5));
				year.setId_no(rs.getString(6));
				year.setInvoice_prefix(rs.getString(7));
				year.setInvoice(rs.getString(8));
				year.setReg_prefix(rs.getString(9));
				year.setRegistration(rs.getString(10));
				year.setCreated_date(rs.getString(11));
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return year;
	}

	public void updateAcademicDetails(String rollno, String invoice_no, String regno, String acad_year,
			String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] hyphenSeperatedRollno=Util.hyphenSeperatedString(rollno);
		String[] hyphenSeperatedInvoice=Util.hyphenSeperatedString(invoice_no);
		String[] hyphenSeperatedRegno=Util.hyphenSeperatedString(regno);
		try{
			con = Util.getDBConnection();
			String query = "update academic_year_master set ID_card=?,invoice=?,reg=? where aca_year=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setInt(1, Integer.parseInt(hyphenSeperatedRollno[1])+1);
			ps.setInt(2, Integer.parseInt(hyphenSeperatedInvoice[1])+1);
			ps.setInt(3, Integer.parseInt(hyphenSeperatedRegno[1])+1);
			ps.setString(4, acad_year);
			ps.setString(5, branch);
			ps.executeUpdate();
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public AcademicYear SpecificAcademicData(String id, String branch) {
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		AcademicYear year= null;
		try{
			con = Util.getDBConnection();
			String query = "select * from academic_year_master where id=? and branch=?";
			st = con.prepareStatement(query);
			st.setString(1, id);
			st.setString(2, branch);
			rs = st.executeQuery();
			while(rs.next()){
				year = new AcademicYear();
				year.setId(rs.getLong(1));
				year.setAca_year(rs.getString(2));
				year.setStart_date(rs.getString(3));
				year.setEnd_date(rs.getString(4));
				year.setId_prefix(rs.getString(5));
				year.setId_no(rs.getString(6));
				year.setInvoice_prefix(rs.getString(7));
				year.setInvoice(rs.getString(8));
				year.setReg_prefix(rs.getString(9));
				year.setRegistration(rs.getString(10));
				year.setCreated_date(rs.getString(11));
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return year;
	}

	public void editAcademicYear(AcademicYear year) {
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "update academic_year_master set aca_year=?,aca_start=?,aca_end=?,id_prefix=?,ID_Card=?,invoice_prefix=?,invoice=?"
					+ ",reg_prefix=?,reg=? where id=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, year.getAca_year());
			ps.setString(2, year.getStart_date());
			ps.setString(3, year.getEnd_date());
			ps.setString(4, year.getId_prefix());
			ps.setString(5, year.getId_no());
			ps.setString(6, year.getInvoice_prefix());
			ps.setString(7, year.getInvoice());
			ps.setString(8, year.getReg_prefix());
			ps.setString(9, year.getRegistration());
			ps.setLong(10, year.getId());
			ps.setString(11,  year.getBranch());
			ps.executeUpdate();
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public void DeleteAcadYear(String id, String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from academic_year_master where id=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.setString(2, branch);
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}
}