package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Standard;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class StandardDAO {
	private static final Logger logger = LogManager.getLogger(StandardDAO.class.getName());
	public ArrayList<Standard> getAllStandard(String branch) {
			Connection conn=null;
			PreparedStatement ps=null;
			ResultSet rs=null;
			ArrayList<Standard> std=new ArrayList<>();
			Standard standard=null;
			try {
				conn=Util.getDBConnection();
				String query="select * from standard_master where branch=?";
				ps=conn.prepareStatement(query);
				ps.setString(1, branch);
				rs=ps.executeQuery();
				while(rs.next())
				{
					standard=new Standard();
					standard.setId(rs.getLong(1));
					standard.setStandard(rs.getString(2));
					standard.setStd_fees(rs.getString(3));
					standard.setSubject(rs.getString(4));
					standard.setBranch(rs.getString(5));
					standard.setCreated_date(rs.getString(6));
					std.add(standard);
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e);
			}
			finally {
				Util.closeConnection(rs, ps, conn);
			}
		return std;
	}

	
	public void addStandard(Standard std) {
		Connection conn=null;
		PreparedStatement ps=null;
		try{
			conn=Util.getDBConnection();
			String query="insert into standard_master(`standard`,`standard_fees`,`subject`,`branch`,`created_date`)values(?,?,?,?,?)";
			ps=conn.prepareStatement(query);
			ps.setString(1, std.getStandard());
			ps.setString(2, std.getStd_fees());
			ps.setString(3, std.getSubject());
			ps.setString(4, std.getBranch());
			ps.setString(5, Util.currentDate());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, conn);
		}
	}


	public void deleteStandard(Standard standard) {
		Connection con = null;
		PreparedStatement ps = null;
		String id=""+standard.getId();
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from standard_master where id=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.setString(2, standard.getBranch());
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		
	}


	public void EditStandard(Standard std) {
		Connection conn=null;
		PreparedStatement ps=null;
		try{
			conn=Util.getDBConnection();
			String query="update standard_master set standard=?,standard_fees=?,subject=?,branch=? where id=? and branch=?";
			ps=conn.prepareStatement(query);
			ps.setString(1, std.getStandard());
			ps.setString(2, std.getStd_fees());
			ps.setString(3, std.getSubject());
			ps.setString(4, std.getBranch());
			ps.setLong(5,std.getId());
			ps.setString(6,std.getBranch());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, conn);
		}
	}

	
}
