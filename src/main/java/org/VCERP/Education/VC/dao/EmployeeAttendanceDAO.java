package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class EmployeeAttendanceDAO {
	private static final Logger logger = LogManager.getLogger(Util.class.getName());
	public ArrayList<Employee> getEmployeeAttendanceList(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Employee em=null;
		ArrayList<Employee> employee=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,emp_name,emp_unq_code from employee where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
		//	ps.setString(2, courses);
			rs=ps.executeQuery();
			while(rs.next())
			{
				em=new Employee();
				em.setId(rs.getLong(1));
				em.setEmp_name(rs.getString(2));
				em.setEmp_unq_code(rs.getString(3));
				//at.setDate(Util.currentDate());
				employee.add(em);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return employee;
	}

	public void employeeAttendance(ArrayList<String> empcode, ArrayList<String> intime, ArrayList<String> outtime,
			ArrayList<String> attend,String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into empattendance(`emp_code`,`attendance`,`start_time`,`end_time`,`date`,`branch`)"
					+ "values(?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			for(int i=0;i<empcode.size();i++){
			ps.setString(1, empcode.get(i));
			ps.setString(2, attend.get(i));
			ps.setString(3, intime.get(i));
			ps.setString(4, outtime.get(i));
			ps.setString(5, Util.currentDate());
			ps.setString(6, branch);
			ps.executeUpdate();
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	
	}

	public Employee getEmpAttendanceStat(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		PreparedStatement ps1=null;
		ResultSet rs1=null;
		try {
			con=Util.getDBConnection();
			String query="select Count(DISTINCT`date`) as 'totalDays' from empattendance where date between ? and ? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, emp.getFrom_date());
			ps.setString(2, emp.getTo_date());
			ps.setString(3, emp.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				emp.setTotalDays(rs.getInt("totalDays"));
			}
			String query1="select Count(attendance) FROM empattendance WHERE emp_code=? AND attendance='P' and date BETWEEN ? AND ? and branch=?";
			ps1=con.prepareStatement(query1);
			ps1.setString(1, emp.getEmp_unq_code());
			ps1.setString(2, emp.getFrom_date());
			ps1.setString(3, emp.getTo_date());
			ps1.setString(4, emp.getBranch());
			rs1=ps1.executeQuery();
			while(rs1.next()){
				emp.setTotalPresent(rs1.getInt(1));
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
			Util.closeConnection(rs1, ps1, con);
		}
		return emp;
	}

	public ArrayList<Employee> getEmpAttendanceReport(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		String id=emp.getEmp_unq_code();
		ArrayList<Employee> employee=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="SELECT `attendance`,`start_time`,`end_time`,`date` FROM `empattendance` where `emp_code`=? "
					+ "AND date BETWEEN ? AND ? AND `branch`=?";
			ps=con.prepareStatement(query);
			ps.setString(1, id);
			ps.setString(2, emp.getFrom_date());
			ps.setString(3, emp.getTo_date());
			ps.setString(4, emp.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				emp=new Employee();
				emp.setEmp_unq_code(id);
				emp.setAttendance(rs.getString(1));
				emp.setStart_time(rs.getString(2));
				emp.setEnd_time(rs.getString(3));
				emp.setCreated_date(rs.getString(4));
				employee.add(emp);
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return employee;

	}
}