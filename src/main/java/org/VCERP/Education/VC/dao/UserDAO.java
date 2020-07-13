package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.LoginHistory;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class UserDAO {
	private static final Logger logger = LogManager.getLogger(UserDAO.class.getName());
	public User authenticateUser(String userid, String password) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		User user=null;
		ArrayList<String> permission=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from user_db where username=? and password=password(?) and active='1'";
			st=con.prepareStatement(query);
			st.setString(1, userid);
			st.setString(2, password);
			rs=st.executeQuery();
			while(rs.next())
			{
				user=new User();
				user.setId(rs.getLong(1));
				user.setName(rs.getString(2));
				user.setUserid(rs.getString(3));
				user.setPassword("");
				user.setEmp_type(rs.getString(5));
				user.setBranch(rs.getString(6));
				user.setRole(rs.getString(7));			
				user.setCreated_date(rs.getString(8));
			}
			if(user!=null){
			permission=getUserPermission(user);
			user.setPermission(permission);
			}
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
			return user;
		}
	
	public User createEmployeeAccount(User user) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into user_db(`name`,`username`,`password`,`emp_type`,`branch`,`role`,`created_date`,`active`) "
					+ "values(?,?,password(?),?,?,?,?,'1')";
			ps=con.prepareStatement(query);
			ps.setString(1, user.getName());
			ps.setString(2, user.getUserid());
			ps.setString(3, user.getPassword());
			ps.setString(4, user.getEmp_type());
			ps.setString(5, user.getBranch());
			ps.setString(6, user.getRole());
			ps.setString(7, Util.currentDate());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return user;
	}

	public ArrayList<User> getAllAccount(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		User user=null;
		ArrayList<User> u=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from user_db where branch=? and active='1'";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				user=new User();
				user.setId(rs.getLong(1));
				user.setName(rs.getString(2));
				user.setUserid(rs.getString(3));
				user.setPassword("");
				user.setEmp_type(rs.getString(5));
				user.setBranch(rs.getString(6));
				user.setRole(rs.getString(7));			
				user.setCreated_date(rs.getString(8));
				u.add(user);
			}
			
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
			return u;
	}
	
	
	public void createLoginHistory(LoginHistory history){
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con=Util.getDBConnection();
			String query = "insert into login_history(`employee`,`branch`,`ip`,`timestamp`) values(?,?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1,history.getEmployee());
			ps.setString(2,history.getBranch());
			ps.setString(3,history.getIp());
			ps.setString(4,Util.DateTime());
			ps.executeUpdate();
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}
	
	public ArrayList<LoginHistory> getLoginHistoryList(){
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		LoginHistory history=null;
		ArrayList<LoginHistory> logg=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from login_history";
			st=con.prepareStatement(query);
			rs=st.executeQuery();
			while(rs.next()){
				history = new LoginHistory();
				history.setId(rs.getLong(1));
				history.setEmployee(rs.getString(2));
				history.setBranch(rs.getString(3));
				history.setIp(rs.getString(4));
				history.setTimestamp(rs.getString(5));
				logg.add(history);
			}
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return logg;
	}

	public void EditEmployeeAccount(User user) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con=Util.getDBConnection();
			String query = "update user_db set username=?,password=password(?),role=? where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1,user.getUserid());
			ps.setString(2,user.getPassword());
			ps.setString(3,user.getRole());
			ps.setLong(4,user.getId());
			ps.executeUpdate();
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public void DeactivateEmployeeAccount(Long id) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con=Util.getDBConnection();
			String query = "update user_db set active='0' where id=?";
			ps = con.prepareStatement(query);
			ps.setLong(1,id);
			ps.executeUpdate();
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public boolean checkAccountExist(User user) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		boolean status=false;
		try {
			con=Util.getDBConnection();
			String query = "select * from user_db where name=? and branch=? and active='1'";
			ps = con.prepareStatement(query);
			ps.setString(1,user.getName());
			ps.setString(2,user.getBranch());
			rs=ps.executeQuery();
			while(rs.next()){
				status=true;
			}
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return status;
	}

	public boolean checkUsernameExist(User user) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		boolean status=false;
		try {
			con=Util.getDBConnection();
			String query = "select * from user_db where username=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1,user.getUserid());
			ps.setString(2,user.getBranch());
			rs=ps.executeQuery();
			while(rs.next()){
				status=true;
			}
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return status;
	}

	public ArrayList<User> getAllRole(String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		User user=null;
		ArrayList<User> roles=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query = "select DISTINCT(`role`),created_date from role_permission where branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1,branch);
			rs=ps.executeQuery();
			while(rs.next()){
				user=new User();
				user.setRole(rs.getString(1));
				user.setCreated_date(rs.getString(2));
				roles.add(user);
			}
		}
		catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return roles;
	}
	private ArrayList<String> getUserPermission(User user){
   	 Connection con=null;
   	 PreparedStatement st=null;
   	 ResultSet rs=null;
   	 ArrayList<String> permisison=new ArrayList<>();
   	 try {
			con=Util.getDBConnection();
			String query="select permission from role_permission where role=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, user.getRole());
			st.setString(2, user.getBranch());
			rs=st.executeQuery();
			while(rs.next()){
				permisison.add(rs.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
   	 finally {
			Util.closeConnection(rs, st, con);
		}
   	 return permisison;
    }

	public ArrayList<Integer> getEmployeeStat(String username, String branch) {
		 Connection con=null;
	   	 PreparedStatement st1=null;
	   	 PreparedStatement st2=null;
	   	 PreparedStatement st3=null;
	   	 ResultSet rs1=null;
	   	 ResultSet rs2=null;
	   	 ResultSet rs3=null;
	   	 ArrayList<Integer> stat=new ArrayList<>();
	   	 try {
				con=Util.getDBConnection();
				String query1="select COUNT(`enq_taken`) from enquiry where enq_taken=? and branch=?";
				String query2="select COUNT(`enq_taken_by`) from admission where enq_taken_by=? and branch=?";
				String query3="select COUNT(`received_by`) from receipt_details where received_by=? and branch=?";
				st1=con.prepareStatement(query1);
				st1.setString(1, username);
				st1.setString(2, branch);
				rs1=st1.executeQuery();
				while(rs1.next()){
					stat.add(rs1.getInt(1));
				}
				st2=con.prepareStatement(query2);
				st2.setString(1, username);
				st2.setString(2, branch);
				rs2=st2.executeQuery();
				while(rs2.next()){
					stat.add(rs2.getInt(1));
				}
				st3=con.prepareStatement(query3);
				st3.setString(1, username);
				st3.setString(2, branch);
				rs3=st3.executeQuery();
				while(rs3.next()){
					stat.add(rs3.getInt(1));
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e);
			}
	   	 finally {
				Util.closeConnection(rs1, st1, con);
				Util.closeConnection(rs2, st2, con);
				Util.closeConnection(rs3, st3, con);
			}
	   	 return stat;
	 
	}
}


