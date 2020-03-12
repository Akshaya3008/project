package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;
public class EnquiryDAO {

	public Enquiry EnquiryData(Enquiry enquiry) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="insert into `enquiry`(`sname`,`lname`,`fname`,`mname`,`uid`,"
					+ "`dob`,`gender`,`caste`,`category`,`lang`,`stud_cont`,`father_cont`,"
					+ "`mother_cont`,`address`,`pin`,`email`,`w_app_no`,`enq_date`,`enq_no`,"
					+ "`enq_taken`,`fees_pack`,`lead_source`,`remark`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return enquiry;
	}

	public ArrayList<Enquiry> FetchAllEnquiryData() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Enquiry> enq=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from enquiry";
			st=con.prepareStatement(query);
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
				enq.add(enquiry);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return enq;
		
	}

}
