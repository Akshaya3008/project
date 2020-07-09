package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class FeesTypeDAO {
	private static final Logger logger = LogManager.getLogger(FeesTypeDAO.class.getName());
	public void addNewFeesType(FeesType type) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = Util.getDBConnection();
			String query = "insert into feestype(`created_date`,`feestype`,`branch`) values(?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, type.getCreatedDate());
			ps.setString(2, type.getFeesType());
			ps.setString(3, type.getBranch());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	public ArrayList<FeesType> getFeesType(String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		ArrayList<FeesType> type=new ArrayList<>();
		try {
			con = Util.getDBConnection();
			String query = "select * from feestype where branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				FeesType fees=new FeesType();
				fees.setId(rs.getLong(1));
				fees.setCreatedDate(rs.getString(2));
				fees.setFeesType(rs.getString(3));
				type.add(fees);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		return type;
	}

	public void EditFeesType(FeesType type) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = Util.getDBConnection();
			String query = "update feestype set feestype=? where id=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, type.getFeesType());
			ps.setLong(2, type.getId());
			ps.setString(3, type.getBranch());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	public void deleteFeesType(String id) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from feestype where id=?";
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
