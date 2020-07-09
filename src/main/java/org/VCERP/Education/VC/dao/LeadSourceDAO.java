package org.VCERP.Education.VC.dao;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.LeadSource;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LeadSourceDAO {
	private static final Logger logger = LogManager.getLogger(LeadSourceDAO.class.getName());
	public LeadSource addLeadSource(LeadSource lead){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "insert into lead_source(`source`,`created_date`) values(?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, lead.getSource());
			ps.setString(2, Util.currentDate());
			ps.executeUpdate();
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return lead;
	}
	
	public ArrayList<LeadSource> FetchAllSource(){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		LeadSource ls=null;
		ArrayList<LeadSource> sourceList = new ArrayList<LeadSource>();
		try{
			
			con = Util.getDBConnection();
			String query = "select * from lead_source";
			st = con.prepareStatement(query);
			rs = st.executeQuery();
			while(rs.next()){
			  ls= new LeadSource();
			  ls.setId(rs.getLong(1));
			  ls.setSource(rs.getString(2));
			  ls.setCreated_date(rs.getString(3));
			  sourceList.add(ls);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return sourceList;
	}

	public void EditLeadSource(LeadSource lead) {
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "update lead_source set source=? where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, lead.getSource());
			ps.setLong(2, lead.getId());
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

	public void deleteSource(String id) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from lead_source where id=?";
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