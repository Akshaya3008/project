package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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

}
