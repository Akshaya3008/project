package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;

public class EmployeeDAO {

	public Employee addEmployee(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into employee(`emp_type`,`branch`,`emp_name`,`emp_unq_code`,"
					+ "`email`,`address`,`contact`,`dob`,`join_date`,`design`,`created_date`)values(?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, emp.getEmp_type());
			ps.setString(2, emp.getBranch());
			ps.setString(3, emp.getEmp_name());
			ps.setString(4, emp.getEmp_unq_code());
			ps.setString(5, emp.getEmail());
			ps.setString(6, emp.getAddress());
			ps.setString(7, emp.getContact());
			ps.setString(8, emp.getDob());
			ps.setString(9, emp.getJoin_date());
			ps.setString(10, emp.getDesign());
			ps.setString(11, Util.currentDate());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return emp;
	}

	public ArrayList<Employee> FetchAllEmployee(String branch) {
			Connection con=null;
			PreparedStatement st=null;
			ResultSet rs=null;
			ArrayList<Employee> employee=new ArrayList<>();
			try {
				con=Util.getDBConnection();
				String query="select * from employee where branch=?";
				st=con.prepareStatement(query);
				st.setString(1, branch);
				rs=st.executeQuery();
				while(rs.next())
				{
					Employee emp=new Employee();
					emp.setId(rs.getLong(1));
					emp.setEmp_type(rs.getString(2));
					emp.setBranch(rs.getString(3));
					emp.setEmp_name(rs.getString(4));
					emp.setEmp_unq_code(rs.getString(5));
					emp.setEmail(rs.getString(6));
					emp.setAddress(rs.getString(7));
					emp.setContact(rs.getString(8));
					emp.setDob(rs.getString(9));
					emp.setJoin_date(rs.getString(10));
					emp.setDesign(rs.getString(11));
					emp.setCreated_date(rs.getString(12));
					employee.add(emp);
				}
			}catch(Exception e){
				e.printStackTrace();
				System.out.println(e);
			}
			finally {
				Util.closeConnection(rs, st, con);
			}
			return employee;
	}

	public ArrayList<Employee> FetchEmployeeReport(Employee employee, ArrayList<Employee> empData) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		String query="";
		try {
			con=Util.getDBConnection();
			if(employee.getEmp_name().isEmpty()){
			query="select * from employee where design=? and branch=?";
			}
			else{
				query="select * from employee where emp_name='"+employee.getEmp_name()+"' and design=? and branch=?";
			}
			st=con.prepareStatement(query);
			st.setString(1, employee.getDesign());
			st.setString(2, employee.getBranch());
			rs=st.executeQuery();
			while(rs.next())
			{
				Employee emp=new Employee();
				emp.setId(rs.getLong(1));
				emp.setEmp_type(rs.getString(2));
				emp.setBranch(rs.getString(3));
				emp.setEmp_name(rs.getString(4));
				emp.setEmp_unq_code(rs.getString(5));
				emp.setEmail(rs.getString(6));
				emp.setAddress(rs.getString(7));
				emp.setContact(rs.getString(8));
				emp.setDob(rs.getString(9));
				emp.setJoin_date(rs.getString(10));
				emp.setDesign(rs.getString(11));
				empData.add(emp);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return empData;
	}

	public Employee getSepecificEmployeeDetails(Long id) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		Employee emp=null;
		String query="";
		try {
			con=Util.getDBConnection();
			query="select * from employee where id=?";
			st=con.prepareStatement(query);
			st.setLong(1, id);
			rs=st.executeQuery();
			while(rs.next())
			{
				emp=new Employee();
				emp.setEmp_type(rs.getString(2));
				emp.setBranch(rs.getString(3));
				emp.setEmp_name(rs.getString(4));
				emp.setEmp_unq_code(rs.getString(5));
				emp.setEmail(rs.getString(6));
				emp.setAddress(rs.getString(7));
				emp.setContact(rs.getString(8));
				emp.setDob(rs.getString(9));
				emp.setJoin_date(rs.getString(10));
				emp.setDesign(rs.getString(11));
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return emp;
	}

	public void EditEmployee(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="update employee set emp_type=?,branch=?,emp_name=?,emp_unq_code=?,"
					+ "email=?,address=?,contact=?,dob=?,join_date=?,design=? where id=?";
			ps=con.prepareStatement(query);
			ps.setString(1, emp.getEmp_type());
			ps.setString(2, emp.getBranch());
			ps.setString(3, emp.getEmp_name());
			ps.setString(4, emp.getEmp_unq_code());
			ps.setString(5, emp.getEmail());
			ps.setString(6, emp.getAddress());
			ps.setString(7, emp.getContact());
			ps.setString(8, emp.getDob());
			ps.setString(9, emp.getJoin_date());
			ps.setString(10, emp.getDesign());
			ps.setLong(11, emp.getId());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public void deleteEmployee(String id) {
		
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from employee where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
