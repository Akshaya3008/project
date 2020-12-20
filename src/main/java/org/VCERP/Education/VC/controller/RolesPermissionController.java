package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.RolesPermissionDAO;
import org.VCERP.Education.VC.model.RolesPermission;

public class RolesPermissionController {

	public void saveRolesPermission(RolesPermission rolepermission) {
		RolesPermissionDAO dao=new RolesPermissionDAO();
		dao.saveRolesPermission(rolepermission);
		
	}

	public ArrayList<String> loadRolesPermission(String role, String branch) {
		RolesPermissionDAO dao=new RolesPermissionDAO();
		return dao.loadRolesPermission(role,branch);
	}

	public void deleteRolesPermission(String roles, String branch) {
		RolesPermissionDAO dao=new RolesPermissionDAO();
		dao.deleteRolesPermission(roles,branch);
	}

}
