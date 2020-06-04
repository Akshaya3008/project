package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Caste;
import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;

public class CasteDAO {
	public void addNewCaste(Caste caste) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = Util.getDBConnection();
			String query = "insert into caste(`created_date`,`caste`,`branch`) values(?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, caste.getCreated_Date());
			ps.setString(2, caste.getCaste());
			ps.setString(3, caste.getBranch());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public ArrayList<Caste> getCaste(String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		ArrayList<Caste> type=new ArrayList<>();
		try {
			con = Util.getDBConnection();
			String query = "select * from caste where branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				Caste caste=new Caste();
				caste.setId(rs.getLong(1));
				caste.setCreated_Date(rs.getString(2));
				caste.setCaste(rs.getString(3));
				type.add(caste);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return type;
	}

	public void EditCaste(Caste caste) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = Util.getDBConnection();
			String query = "update caste set caste=? where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, caste.getCaste());
			ps.setLong(2, caste.getId());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
