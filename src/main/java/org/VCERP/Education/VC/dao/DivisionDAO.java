package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Division;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class DivisionDAO {
	private static final Logger logger = LogManager.getLogger(DesignationDAO.class.getName());
	public Division addDivision(Division div){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			
			String query = "insert into division_master(`division`,`created_date`,`branch`)values(?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, div.getDivision());
			ps.setString(2, Util.currentDate());
			ps.setString(3, div.getBranch());
			ps.executeUpdate();
			
			
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return div;
		
	}
	public ArrayList<Division> FetchAllDivision(String branch){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		ArrayList<Division> divisionList = new ArrayList<>();
	   try{
		   con = Util.getDBConnection();
		   String query =  "select * from division_master where branch=?";
		   st = con.prepareStatement(query);
		   st.setString(1, branch);
		   rs = st.executeQuery();
		   while(rs.next()){
			   Division div = new Division();
			   div.setId(rs.getLong(1));
			   div.setDivision(rs.getString(2));
			   div.setCreated_date(rs.getString(3));
			   divisionList.add(div);
		   }
	   }
	   catch (Exception e) {
		   e.printStackTrace();
			logger.error(e);
	}
	   finally {
			Util.closeConnection(rs, st, con);
		}
		return divisionList;
		
	}
	/*public Division GetDivision(String id) {
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		Division division= new Division();
	   try{
		   con = Util.getDBConnection();
		   String query =  "select * from division_master where id=?";
		   st = con.prepareStatement(query);
		   st.setString(1, id);
		   rs = st.executeQuery();
		   while(rs.next()){
			   Division div = new Division();
			   div.setId(rs.getLong(1));
			   div.setDivision(rs.getString(2));
			   div.setCreated_date(rs.getString(3));
		   }
	   }
	   catch (Exception e) {
		   e.printStackTrace();
			logger.error(e);
	}
	   finally {
			Util.closeConnection(rs, st, con);
		}
		return division;
	}*/
	public void EditDivision(Division div) {
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			
			String query = "update division_master set division=? where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, div.getDivision());
			ps.setLong(2, div.getId());
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
	public void deleteDivision(String id) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from division_master where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}
}