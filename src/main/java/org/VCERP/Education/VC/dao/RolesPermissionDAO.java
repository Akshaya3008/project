package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.RolesPermission;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RolesPermissionDAO {
	private static final Logger logger = LogManager.getLogger(RolesPermissionDAO.class.getName());
	public void saveRolesPermission(RolesPermission rolepermission) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="insert into role_permission(`role`,`permission`,`branch`,`created_date`) values(?,?,?,?)";
			st=con.prepareStatement(query);
			st.setString(1, rolepermission.getRole());
			st.setString(2, rolepermission.getPermission());
			st.setString(3, rolepermission.getBranch());
			st.setString(4, Util.currentDate());
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		
	}
	public ArrayList<String> loadRolesPermission(String role, String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<String> permission=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `permission` from role_permission where role=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, role);
			st.setString(2, branch);
			rs=st.executeQuery();
			while(rs.next()){
				permission.add(rs.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return permission;
	}
	public void deleteRolesPermission(String roles, String branch) {
		Connection con=null;
		PreparedStatement st=null;
		String[] role=Util.commaSeperatedString(roles);
		try {
			con=Util.getDBConnection();
			String query="delete from role_permission where role=? and branch=?";
			for(int i=0;i<role.length;i++){
			st=con.prepareStatement(query);
			st.setString(1, role[i]);
			st.setString(2, branch);
			st.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
	}

}
