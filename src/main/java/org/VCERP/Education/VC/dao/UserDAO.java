package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.model.LoginHistory;
import org.VCERP.Education.VC.utility.Util;

public class UserDAO {

	public User authenticateUser(String userid, String password) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		User user=null;
		try {
			con=Util.getDBConnection();
			String query="select * from user_db where username=? and password=password(?)";
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
			
		} catch (Exception e) {
			System.out.println(e);
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
			String query="insert into user_db(`name`,`username`,`password`,`emp_type`,`branch`,`role`,`created_date`) "
					+ "values(?,?,password(?),?,?,?,?)";
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
			System.out.println(e);
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
			String query="select * from user_db where branch=?";
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
			System.out.println(e);
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
			System.out.println(e);
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
			System.out.println(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		System.out.println(logg);
		return logg;
	}
}


