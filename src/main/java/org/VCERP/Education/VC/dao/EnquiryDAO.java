package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
public class EnquiryDAO {
	private static final Logger logger = LogManager.getLogger(EnquiryDAO.class.getName());
	public Enquiry EnquiryData(Enquiry enquiry) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="insert into `enquiry`(`sname`,`lname`,`fname`,`mname`,`uid`,"
					+ "`dob`,`gender`,`caste`,`category`,`lang`,`stud_cont`,`father_cont`,"
					+ "`mother_cont`,`address`,`pin`,`email`,`w_app_no`,`enq_date`,`enq_no`,"
					+ "`enq_taken`,`fees_pack`,`lead_source`,`remark`,`status`,`branch`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'Non Admitted',?)";
			st=con.prepareStatement(query);
			st.setString(1, enquiry.getSname());
			st.setString(2, enquiry.getLname());
			st.setString(3, enquiry.getFname());
			st.setString(4, enquiry.getMname());
			st.setString(5, enquiry.getUid());
			st.setString(6, enquiry.getDob());
			st.setString(7, enquiry.getGender());
			st.setString(8, enquiry.getCaste());
			st.setString(9, enquiry.getCategory());
			st.setString(10, enquiry.getLang());
			st.setString(11, enquiry.getStud_cont());
			st.setString(12, enquiry.getFather_cont());
			st.setString(13, enquiry.getMother_cont());
			st.setString(14, enquiry.getAddress());
			st.setString(15, enquiry.getPin());
			st.setString(16, enquiry.getEmail());
			st.setString(17, enquiry.getW_app_no());
			st.setString(18, enquiry.getEnq_date());
			st.setString(19, enquiry.getEnq_no());
			st.setString(20, enquiry.getEnq_taken_by());
			st.setString(21, enquiry.getFees_pack());
			st.setString(22, enquiry.getLead_source());
			st.setString(23, enquiry.getRemark());
			st.setString(24, enquiry.getBranch());
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return enquiry;
	}

	public ArrayList<Enquiry> FetchAllEnquiryData(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Enquiry> enq=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from enquiry where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				Enquiry enquiry=new Enquiry();
				enquiry.setId(rs.getLong(1));
				enquiry.setSname(rs.getString(2));
				enquiry.setLname(rs.getString(3));
				enquiry.setFname(rs.getString(4));
				enquiry.setMname(rs.getString(5));
				enquiry.setUid(rs.getString(6));
				enquiry.setDob(rs.getString(7));
				enquiry.setGender(rs.getString(8));
				enquiry.setCaste(rs.getString(9));
				enquiry.setCategory(rs.getString(10));
				enquiry.setLang(rs.getString(11));
				enquiry.setStud_cont(rs.getString(12));
				enquiry.setFather_cont(rs.getString(13));
				enquiry.setMother_cont(rs.getString(14));
				enquiry.setAddress(rs.getString(15));
				enquiry.setPin(rs.getString(16));
				enquiry.setEmail(rs.getString(17));
				enquiry.setW_app_no(rs.getString(18));
				enquiry.setEnq_date(rs.getString(19));
				enquiry.setEnq_no(rs.getString(20));
				enquiry.setEnq_taken_by(rs.getString(21));
				enquiry.setFees_pack(rs.getString(22));
				enquiry.setLead_source(rs.getString(23));
				enquiry.setRemark(rs.getString(24));
				enquiry.setStatus(rs.getString(25));
				enq.add(enquiry);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return enq;
		
	}

/*	public void DeleteEnquiryData(String id) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="delete from enquiry where id=?";
			st=con.prepareStatement(query);
			st.setString(1, id);
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
	}
*/
	public void DeleteMultipleEnquiryData(Long id, String branch) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="delete from enquiry where id=? and branch=?";
			st=con.prepareStatement(query);
			st.setLong(1, id);
			st.setString(2, branch);
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	public void Admission(long id) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="update enquiry set status='Admitted' where id	=?";
			st=con.prepareStatement(query);
			st.setLong(1, id);
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	public int EditEnquiryData(Enquiry enquiry) {
		Connection con=null;
		PreparedStatement st=null;
		int count=0;
		try {
			con=Util.getDBConnection();
			String query="update enquiry set sname=?,lname=?,fname=?,mname=?,uid=?,"
					+ "dob=?,gender=?,caste=?,category=?,lang=?,stud_cont=?,father_cont=?,"
					+ "mother_cont=?,address=?,pin=?,email=?,w_app_no=?,"
					+ "fees_pack=?,lead_source=?,remark=? where enq_no=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, enquiry.getSname());
			st.setString(2, enquiry.getLname());
			st.setString(3, enquiry.getFname());
			st.setString(4, enquiry.getMname());
			st.setString(5, enquiry.getUid());
			st.setString(6, enquiry.getDob());
			st.setString(7, enquiry.getGender());
			st.setString(8, enquiry.getCaste());
			st.setString(9, enquiry.getCategory());
			st.setString(10, enquiry.getLang());
			st.setString(11, enquiry.getStud_cont());
			st.setString(12, enquiry.getFather_cont());
			st.setString(13, enquiry.getMother_cont());
			st.setString(14, enquiry.getAddress());
			st.setString(15, enquiry.getPin());
			st.setString(16, enquiry.getEmail());
			st.setString(17, enquiry.getW_app_no());
			st.setString(18, enquiry.getFees_pack());
			st.setString(19, enquiry.getLead_source());
			st.setString(20, enquiry.getRemark());
			st.setString(21, enquiry.getEnq_no());
			st.setString(22, enquiry.getBranch());
			count=st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return count;
	}

	public void EditAdmissionPersonalDetails(Enquiry enquiry) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="update admission set student_name=?,lname=?,fname=?,mname=?,uid=?,"
					+ "dob=?,gender=?,caste=?,category=?,language=?,contact=?,father_cont=?,"
					+ "mother_cont=?,address=?,pin=?,email=?,w_app_no=?"
					+ " where enq_no=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, enquiry.getSname());
			st.setString(2, enquiry.getLname());
			st.setString(3, enquiry.getFname());
			st.setString(4, enquiry.getMname());
			st.setString(5, enquiry.getUid());
			st.setString(6, enquiry.getDob());
			st.setString(7, enquiry.getGender());
			st.setString(8, enquiry.getCaste());
			st.setString(9, enquiry.getCategory());
			st.setString(10, enquiry.getLang());
			st.setString(11, enquiry.getStud_cont());
			st.setString(12, enquiry.getFather_cont());
			st.setString(13, enquiry.getMother_cont());
			st.setString(14, enquiry.getAddress());
			st.setString(15, enquiry.getPin());
			st.setString(16, enquiry.getEmail());
			st.setString(17, enquiry.getW_app_no());
			st.setString(18, enquiry.getEnq_no());
			st.setString(19, enquiry.getBranch());
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
	}

	public ArrayList<Enquiry> EnquiryReport(Enquiry enquiry, ArrayList<Enquiry> enqData) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		Enquiry enq=new Enquiry();
		try {
			con=Util.getDBConnection();
			String query="select * from enquiry where enq_date BETWEEN ? AND ? AND branch=? AND enq_taken=? AND status=? AND fees_pack=?";
			st=con.prepareStatement(query);
			st.setString(1, enquiry.getFrom_date());
			st.setString(2, enquiry.getTo_date());
			st.setString(3, enquiry.getBranch());
			st.setString(4, enquiry.getEnq_taken_by());
			st.setString(5, enquiry.getStatus());
			st.setString(6, enquiry.getFees_pack());
			rs=st.executeQuery();
			while(rs.next()){
				enq.setId(rs.getLong(1));
				enq.setSname(rs.getString(2));
				enq.setLname(rs.getString(3));
				enq.setFname(rs.getString(4));
				enq.setMname(rs.getString(5));
				enq.setUid(rs.getString(6));
				enq.setDob(rs.getString(7));
				enq.setGender(rs.getString(8));
				enq.setCaste(rs.getString(9));
				enq.setCategory(rs.getString(10));
				enq.setLang(rs.getString(11));
				enq.setStud_cont(rs.getString(12));
				enq.setFather_cont(rs.getString(13));
				enq.setMother_cont(rs.getString(14));
				enq.setAddress(rs.getString(15));
				enq.setPin(rs.getString(16));
				enq.setEmail(rs.getString(17));
				enq.setW_app_no(rs.getString(18));
				enq.setEnq_date(rs.getString(19));
				enq.setEnq_no(rs.getString(20));
				enq.setEnq_taken_by(rs.getString(21));
				enq.setFees_pack(rs.getString(22));
				enq.setLead_source(rs.getString(23));
				enq.setRemark(rs.getString(24));
				enq.setStatus(rs.getString(25));
				if(enq!=null){
					enqData.add(enq);	
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return enqData;
		
	}

	public int IncrementedEnqNo(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		int count=0;
		try {
			con=Util.getDBConnection();
			String query="select enq_no from enquiry where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next()){
				count=rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return count;

	}
}
